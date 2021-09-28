import _ from 'lodash';
import {graphql} from 'graphql';

import { introspectionQuery} from 'graphql/utilities';

import Error from './Error';
import ns from './ns';
import * as log from './log'; 

export default class SchemaQuery {
    constructor(options) {
        if (!options) {
            throw new Error('requires options.');
        }

        if (!options.schema) {
            throw new Error(
                'options must contain a schema.'
            );
        }

        this.options_ = options;
        this._init(...arguments);
    }

    options() {
        return this.options_;
    }

    async _init(options, callback) {
        this.mutation = {};
        this.query = {};

        callback = callback || function() {};
        let {schema} = this.options_;
        
        let schemaJson = await (graphql(schema, introspectionQuery));

        if (schemaJson.errors) {
            throw new Error(schemaJson.errors[0]);
        }

        let mutation = _.find(schemaJson.data.__schema.types, function(type) {
            return type.name === 'Mutation';
        });

        let genMethod = this._genMethod;

        if (mutation && mutation.fields && mutation.fields.length) {
            _.forEach(mutation.fields, genMethod.bind(this, 'mutation'));
        }

        let query = _.find(schemaJson.data.__schema.types, function(type) {
            return type.name === 'Query';
        });

        if (query && query.fields && query.fields.length) {
            _.forEach(query.fields, genMethod.bind(this, 'query'));
        }

        callback.call(this);
    }

    _genMethod(type, {name, args}) {
        let self = this;
        self[type][name] = function ({rootValue, params, response, context}) {
            const query =  type + self._genQuery({name, args, params, response});

            return self._excuteGraphql(query, rootValue, params, context)
                .then(result => {
                    return self._formatResult(result);
                });
        };
    }

    _formatResult({errors, data}) {
        return new Promise((resolve, reject) => {
            if (errors && errors.length) {
                let error = errors[0];

                if (error instanceof Error) {
                    reject(error);
                    return;
                } else if (error.originalError instanceof Error) {
                    reject(error.originalError);
                    return;
                } else {
                    reject(error);
                }
                
                return;
            }

            resolve(data.response);
        });
    }

    _genQuery({name, args, params, response, response_name = 'response'}) {
        let self = this;
        response = response ?  response : '';

        let _vars = [];
        let _kinds = [];

        _.map(args, function(arg) {
            let {name, type} = arg;
            
            if (params && name in params) {
                _vars.push(`${name}: $${name}`);
                _kinds.push(`$${name}: ${self._genType(type)}`);
            }
        });

        let stringVars = _vars.length ? `(${_vars.join(', ')})` : '';
        let stringKinds = _kinds.length ? `(${_kinds.join(', ')})` : '';
        const query = `
            ${stringKinds}{${response_name}: ${name}${stringVars}${response}}
        `;

        return query;
    }

    _genType(type) {
        switch (type.kind) {
        case 'INPUT_OBJECT':
        case 'ENUM':
        case 'SCALAR':
            return type.name;
        case 'LIST':
            return '[%!]'.replace('%', this._genType(type.ofType));
        case 'NON_NULL':
            return '%!'.replace('%',  this._genType(type.ofType));
        }
    }

    /**
     * excute graphql
     * note: context có thể truyền từ ngoài vào hoặc lấy qua cls
     * @param  {[type]} query     [description]
     * @param  {[type]} rootValue [description]
     * @param  {[type]} params    [description]
     * @param  {[type]} context   [description]
     * @return {[type]}           [description]
     */
    _excuteGraphql (query, rootValue, params, context) {
        let {schema} = this.options_;
        context = context || ns.get('context');
        log.debug('<_excuteGraphql>', {query, context, params});
        return graphql(schema, query, rootValue, context, params, null);
    }
}