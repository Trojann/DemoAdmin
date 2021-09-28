import {ERROR} from '../enum';

import {AccountGroup} from '../model';

import CRUDController from './CRUDController';

class AccountGroupController extends CRUDController {
    model_ = AccountGroup;

    create(data) {
        if (data.menuItems) {
            data.menuItems = JSON.stringify(data.menuItems);
        }

        return super.create(data)
            .catch(e => {
                if (/duplicate/.test(e.message)) {
                    e = ERROR.ACCOUNT_GROUP_EXISTS;
                } 

                return Promise.reject(e);
            });
    }

    edit(data) {
        if (data.menuItems) {
            data.menuItems = JSON.stringify(data.menuItems);
        }

        return super.edit(data);
    }

    async getList({page = 0, size = 20, sort = {name: 'asc'}, name, active}) {
        let query = {

        };
        
        if (name) {
            query['name'] = new RegExp(name);
        }

        if (typeof active === 'boolean') {
            query['active'] = active;
        }

        let options = {
            sort
        };

        if (size > 0) {
            options.skip = page*size;
            options.limit = size;
        }

        let w1 = AccountGroup.count(query);
        let w2 = AccountGroup.find(query, null, options);

        let result = await Promise.all([w1, w2]);

        return {
            size,
            page,
            count: result[0],
            items: result[1]
        };
    }
}

export default new AccountGroupController();