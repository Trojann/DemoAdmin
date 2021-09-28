import {
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {AccountAuthType} from '../../type';

import {
    ctr_account
} from '../../../controller';

export default {
    login: {
        desciption: 'Login với username và password',
        type: AccountAuthType,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve (root, params) {
            return ctr_account.login(params);
        }
    },
    loginWithToken: {
        desciption: 'Login với token',
        type: AccountAuthType,
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve (root, params) {
            return ctr_account.loginWithToken(params);
        }
    }
};