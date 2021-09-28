import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} from 'graphql';

import {
    AccountType, 
    ProfileType,
    ListAccountType
} from '../../type';
import {log} from '../../../util';

import {
    ctr_account,
    ctr_acl
} from '../../../controller';

export default {
    profile: {
        type: ProfileType,
        args: {
        },
        @ctr_acl.requireLogined
        resolve (root, params, {account}) {
            log.trace('<query> profile', account);
            let {_id} = account;
            return ctr_account.findById(_id);
        }
    },
    accountInfo: {
        type: AccountType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        @ctr_acl.requireLogined
        resolve (root, {_id}) {
            return ctr_account.findById(_id);
        }
    },
    listAccount: {
        type: ListAccountType,
        args: {
            page: {
                type: GraphQLInt,
                defaultValue: 0
            },
            size: {
                type: GraphQLInt,
                defaultValue: 20
            },
            username: {
                type: GraphQLString
            },
            fullname: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            phonenumber: {
                type: GraphQLString
            }

        },
        @ctr_acl.requireLogined
        resolve (root, params) {
            return ctr_account.getList(params);
        }
    }
};