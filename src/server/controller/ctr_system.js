import {Account} from '../model';

class SystemController {
    constructor() {
        Account.findOrCreate({
            username: 'admin',
            password: 'admin',
            fullname: 'admin'
        });
    }
}

export default new SystemController();