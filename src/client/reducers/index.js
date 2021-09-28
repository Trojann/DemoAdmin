import {combineReducers} from 'redux';

import account from './account';
import accountgroup from './accountgroup';
import error from './error';
import skin from './skin';

export default combineReducers({
    account,
    accountgroup,
    error,
    skin
});