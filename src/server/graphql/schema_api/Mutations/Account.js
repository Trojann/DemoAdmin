import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import {
    GraphQLEmail
} from 'graphql-custom-types';

import GraphQLJSON from 'graphql-type-json';

import {AccountType} from '../../type';

import {
    ctr_account,
    ctr_acl
} from '../../../controller';

export default {
    createAccount: {
        type: AccountType,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
            fullname: {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: GraphQLEmail
            },
            phonenumber: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            }
        },
        @ctr_acl.requireLogined
        resolve (root, params) {
            return ctr_account.create(params);
        }
    },
    editAccount: {
        type: AccountType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: GraphQLString
            },
            fullname: {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: GraphQLEmail
            },
            phonenumber: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            },
            group: {
                type: GraphQLString
            },
            attributes: {
                type: GraphQLJSON
            }
        },
        @ctr_acl.requireLogined
        resolve (root, params) {
            return ctr_account.edit(params);
        }
    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        @ctr_acl.requireLogined
        resolve (root, params) {
            return ctr_account.delete(params);
        }
    },

};