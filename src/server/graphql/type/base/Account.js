import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import {
    GraphQLDateTime
} from 'graphql-custom-types';

import GraphQLJSON from 'graphql-type-json';

const AccountAuthType = new GraphQLObjectType({
    desciption: 'Thông tin trả về khi user login thành công',
    name: 'AccountAuth',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

const AccountType = new GraphQLObjectType({
    name: 'Account',
    desciption: 'Thông tin cơ bản của một account',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: GraphQLString,
            resolve({password = 'password'}) {
                return password.replace(/./g, '*');
            }
        },
        fullname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phonenumber: {
            type: GraphQLString
        },
        email: {
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
        },
        createdAt: {
            type: GraphQLDateTime
        },
        updatedAt: {
            type: GraphQLDateTime
        }
    })
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    desciption: 'Profile của một account',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: GraphQLString,
            resolve({password = 'password'}) {
                return password.replace(/./g, '*');
            }
        },
        fullname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phonenumber: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLDateTime
        },
        updatedAt: {
            type: GraphQLDateTime
        }
    })
});

export {AccountAuthType, AccountType, ProfileType};