import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

import {
    GraphQLDateTime
} from 'graphql-custom-types';

import GraphQLJSON from 'graphql-type-json';

//import {MenuItemType} from './MenuItem';

const AccountGroupType = new GraphQLObjectType({
    name: 'AccountGroup',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        menuItems: {
            type: GraphQLJSON,
            resolve({menuItems}) {
                if (!menuItems) {
                    return [];
                }

                try {
                    menuItems = JSON.parse(menuItems);
                    return menuItems;
                } catch(e) {
                    return [];
                }
            }
        },
        active: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        createdBy: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createdAt: {
            type: GraphQLDateTime
        },
        updatedAt: {
            type: GraphQLDateTime
        }
    })
});

export {AccountGroupType};