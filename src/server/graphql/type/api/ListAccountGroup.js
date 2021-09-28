import {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

import {AccountGroupType} from '../base';

const ListAccountGroupType = new GraphQLObjectType({
    name: 'ListAccountGroup',
    fields: () => ({
        count: {
            type: GraphQLFloat
        },
        page: {
            type: GraphQLFloat
        },
        size: {
            type: GraphQLFloat
        },
        items: {
            type: new GraphQLList(AccountGroupType)
        }
    })
});


export {ListAccountGroupType};