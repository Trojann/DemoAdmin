import _ from 'lodash';
import config from '../config';

//==============================================
import mongoose from 'mongoose';
mongoose.connect(config.mongo.url);

import Account from './Account';
import AccountGroup from './AccountGroup';
import Session from './Session';

const models = {
    Account,
    AccountGroup,
    Session
};

_.forEach(models, function(Model) {
    Model.define();
});

export {
    mongoose,
    Account,
    AccountGroup,
    Session
};
