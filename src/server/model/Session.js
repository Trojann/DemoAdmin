import {Schema} from 'mongoose';
import {readonly} from 'core-decorators';
import BaseModel from './BaseModel';



class Session extends BaseModel {

    @readonly
    schema = {
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'account',
            required: true,
        },
        session: {
            type: String
        },
        expireAt: {
            type: Date
        }
    }

    @readonly
    name = 'session';

    _index() {
        let schema = this._schema();
        
        schema.index({
            expireAt: 1
        }, {
            expireAfterSeconds: 0
        });
    }
}

export default new Session();