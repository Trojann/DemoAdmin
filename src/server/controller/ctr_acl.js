import {ERROR} from '../enum';

class ACLController {
    requireLogined(target, key, descriptor) {
        return {
            ...descriptor,
            value() {
                let _args = arguments;
                let context = _args[2];

                console.log('context', context);
                if (!context || !context.account) {
                    console.log('<ACLController.requireLogined> not login');
                    return Promise.reject(ERROR.ACCOUNT_NOT_LOGIN);
                }

                return descriptor.value.apply(this, _args);
            }
        };
    }
}

export default new ACLController();