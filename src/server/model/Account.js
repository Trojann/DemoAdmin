import {Schema} from 'mongoose';
import {readonly} from 'core-decorators';
import BaseModel from './BaseModel';
import bcrypt from 'bcryptjs';

class Account extends BaseModel {
    @readonly

    schema = {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        phonenumber: {
            type: String
        },
        email: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'account_group' 
        },
        attributes: {
            type: Object,
            default: {}
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'account'
        }
    }

    @readonly
    name = 'account';

    _index() {
        let schema = this._schema();
        schema.index({
            username: 'text',
            fullname: 'text',
            phonenumber: 'text',
            email: 'text'
        });

        schema.index({
            username: 1,
            deletedAt: 1
        }, {
            unique: true,
            sparse: true
        });
    }

    checkPassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    defineHooks() {
        const self = this;
        this._schema().pre('save', function(next) {
            if (this.isNew) {
                this.password = self.encryptPassword(this.password);
            }
            next();
        });
    }
}

export default new Account();