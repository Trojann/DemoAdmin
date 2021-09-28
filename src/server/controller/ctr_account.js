import jwt from 'jsonwebtoken';
import {ERROR} from '../enum';

import {Account} from '../model';

import CRUDController from './CRUDController';

import ctr_account_group from './ctr_account_group';

const secret = 'dasfwerffew';
class AccountController extends CRUDController {
    model_ = Account;

    async login({username, password}) {
        let inst_account = await Account.findOne({
            username
        });

        if (!inst_account) {
            throw ERROR.ACCOUNT_NOT_EXISTS;
        }

        if (!inst_account || !Account.checkPassword(password, inst_account.password)) {
            throw ERROR.ACCOUNT_LOGIN_INVALID;
        }

        if (!inst_account.active) {
            throw ERROR.ACCOUNT_IS_BLOCK;
        }

        let account = inst_account.toObject();
        delete account.password;
        let token = jwt.sign(account, secret, { expiresIn : 3*60*60*24 });

        let inst_group = await ctr_account_group.findByIdWithActive(account.group);
        let group =  inst_group ? inst_group.toObject() : {};
        account.menuItems = group.menuItems ?  JSON.parse(group.menuItems) : [];
        
        return {
            ...account,
            token
        };
    }

    async loginWithToken({token}) {
        let account;
        try {
            account = jwt.verify(token, secret);
        } catch(err) { 
            throw ERROR.ACCOUNT_NOT_LOGIN;
        }

        let {_id} = account;
        let inst_account = await Account.findById(_id);

        if (!inst_account) {
            throw ERROR.ACCOUNT_NOT_LOGIN;
        }

        account = inst_account.toObject();
        delete account.password;
        // Tạo token mới
        token = jwt.sign(account, secret, { expiresIn : 3*60*60*24 });

        let inst_group = await ctr_account_group.findByIdWithActive(account.group);
        let group =  inst_group ? inst_group.toObject() : {};
        account.menuItems = group.menuItems ?  JSON.parse(group.menuItems) : [];
        
        return {
            ...account,
            token
        };
    }

    async checkLogined({token}) {
        let account;
        try {
            account = jwt.verify(token, secret);
        } catch(err) { 
            throw ERROR.LOGIN_NOT_LOGIN;
        }

        let {_id} = account;
        account = await this.findById({_id});

        if (account && account.deleted) {
            throw ERROR.ACCOUNT_REMOVED;
        }

        return account;
    }

    async updatePassword({_id, oldPassword, newPassword}) {
        let inst_account = await Account.findById(_id);
        let {password} = inst_account.toObject();

        if (!Account.checkPassword(oldPassword, password)) {
            throw ERROR.ACCOUNT_OLD_PASSWORD_INCORRECT;
        }

        inst_account.password = Account.encryptPassword(newPassword);
        await inst_account.save();
        return true;
    }
    
    async edit(data) {
        let {password} = data;

        if (password) {
            if (password.length < 6) {
                throw ERROR.ACCOUNT_PASSWORD_INVALID;
            }

            data.password = Account.encryptPassword(password);
        }

        return super.edit(data).catch((error) => {
            if (error.code === ERROR.OBJECT_NOT_EXISTS.code) {
                throw ERROR.ACCOUNT_NOT_EXISTS;
            }
        });
    }

    create(data) {
        return super.create(data)
            .catch(e => {
                if (/duplicate/.test(e.message)) {
                    e = ERROR.ACCOUNT_EXISTS;
                } 

                return Promise.reject(e);
            });
    }

    async checkAccountAvaiable({username}) {
        let inst_account = await Account.findOne({username});

        if (inst_account) {
            throw ERROR.ACCOUNT_EXISTS;
        }

        return true;
    }

    async getList({page = 0, size = 20, sort = {username: 'asc'}, username, fullname, email, phonenumber}) {
        let query = {

        };
        
        if (username) {
            query['username'] = new RegExp(username);
        }

        if (fullname) {
            query['fullname'] = new RegExp(fullname);
        }

        if (email) {
            query['email'] = new RegExp(email);
        }

        if (phonenumber) {
            query['phonenumber'] = new RegExp(phonenumber);
        }

        let options = {
            sort
        };

        if (size > 0) {
            options.skip = page*size;
            options.limit = size;
        }

        let w1 = Account.count(query);
        let w2 = Account.find(query, null, options);

        let result = await Promise.all([w1, w2]);

        return {
            size,
            page,
            count: result[0],
            items: result[1]
        };
    }
}

export default new AccountController();