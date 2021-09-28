import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';


import Mutations from './Mutations';
import Queries from './Queries';

import {SchemaQuery} from '../../util';

/**
 * @ignore
 */
let RootQuery = new GraphQLObjectType({
    name: 'Query',      //Return this type of object
    fields: () => ({
        ...Queries
    })
});

/**
 * @ignore
 */
let RootMutation = new GraphQLObjectType({
    name: 'Mutation',      //Return this type of object
    fields: () => ({
        ...Mutations
    })
});


let schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default new SchemaQuery({schema});