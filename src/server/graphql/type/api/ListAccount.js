import {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

import {AccountType} from '../base';

const ListAccountType = new GraphQLObjectType({
    name: 'ListAccount',
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
            type: new GraphQLList(AccountType)
        }
    })
});


export {ListAccountType};