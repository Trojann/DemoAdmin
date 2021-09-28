import express from 'express';
import {route, log} from '../../../util';

import schemaApi from '../../../graphql/schema_api';

const router = express.Router();

/**
 * Xử lý 
 * class AccountGroupApi
 */
class AccountGroupApi {

    @route.get('/group')
    _getListAccountGroup({query}) {
        log.trace('<AccountGroupApi._getListAccountGroup>', {query});

        let response = query.fields ? `{${query.fields}}` : `{
            count,
            page,
            size,
            items {
                _id,
                name,
                description,
                menuItems,
                active,
                createdBy,
                createdAt
            }
        }`;

        return schemaApi.query.getListAccountGroup({
            params: query,
            response
        });
    }

    @route.post('/group/:_id')
    _getAccountGroupInfo({query, params}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            name,
            description,
            menuItems,
            active,
            createdBy,
            createdAt
        }`;

        return schemaApi.query.getAccountGroupInfo({
            params,
            response
        });
    }

    @route.post('/group')
    _createAccountGroup({body, query}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            name,
            menuItems,
            active,
            createdBy,
            createdAt           
        }`;

        return schemaApi.mutation.createAccountGroup({
            params: body,
            response
        });
    }

    @route.put('/group/:_id')
    _editAccountGroup({body, query, params}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            name,
            menuItems,
            active,
            createdBy,
            createdAt   
        }`;

        return schemaApi.mutation.editAccountGroup({
            params: {
                ...body,
                ...params
            },
            response
        });
    }

    @route.delete('/group/:_id')
    _deleteAccountGroup({params}) {
        return schemaApi.mutation.deleteAccountGroup({
            params
        });
    }
}

const accountGroupApi = new AccountGroupApi();

route.register(
    {
        router,
        target: accountGroupApi
    }

);

export default router;