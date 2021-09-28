import {ctr_account} from '../../../../controller';
import {ERROR} from '../../../../enum';

async function attachContext(req, res, next) {
    let {headers} = req;
    let token = headers['x-token-key'];
    req.__context = {};
    if (token) {
        try {
            let account = await ctr_account.checkLogined({token});
            req.__context = {
                account
            };
        } catch(e) {
            // ignore
        }
    }
    next();
}

async function checkLogined(req, res, next) {

    let isLogined = !!req.__context.account;
    if (!isLogined) {
        let error = ERROR.ACCOUNT_NOT_LOGIN;
        return res.status(404).set('Content-Type', 'application/json').send(JSON.stringify({error}, null, 2));
    }
    next();
}

export {
    attachContext,
    checkLogined
};