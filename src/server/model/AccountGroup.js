import {Schema} from 'mongoose';
import {readonly} from 'core-decorators';
import BaseModel from './BaseModel';

class AccountGroup extends BaseModel {
    @readonly

    schema = {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        menuItems: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'account'
        }
    }

    @readonly
    name = 'account_group';

    _index() {
        let schema = this._schema();
        schema.index({
            name: 'text'
        });

        schema.index({
            name: 1,
            deletedAt: 1
        }, {
            unique: true,
            sparse: true
        });
    }
}

export default new AccountGroup();