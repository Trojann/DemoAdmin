import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {AccountGroupType, ListAccountGroupType} from '../../type';

import {
    ctr_account_group,
    ctr_acl
} from '../../../controller';

export default {
    getListAccountGroup: {
        type: ListAccountGroupType,
        args: {
            page: {
                type: GraphQLInt,
                defaultValue: 0
            },
            size: {
                type: GraphQLInt,
                defaultValue: 20
            },
            name: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            }
        },
        @ctr_acl.requireLogined
        resolve (root, params) {
            return ctr_account_group.getList(params);
        }
    },
    getAccountGroupInfo: {
        type: AccountGroupType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        @ctr_acl.requireLogined
        resolve (root, {_id}) {
            return ctr_account_group.findById(_id);
        }
    }
};