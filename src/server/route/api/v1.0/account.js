import express from 'express';
import {route} from '../../../util';

import schemaApi from '../../../graphql/schema_api';

const router = express.Router();

/**
 * Xử lý 
 * class AccountApi
 */
class AccountApi {

    /**
     * @api {get} /v1.0/api/account/:_id Thông tin tài khoản
     * @apiVersion 1.0.0
     * @apiName AccountInfo
     * @apiGroup Account
     * 
     * @apiDescription Lấy thông tin tài khoản dựa trên _id
     * 
     * @apiSuccess {Object} account JSON object của account
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "5a68299aa061533ca4af1be7"
     *       "username: "thuvx",
     *       "password": "******",
     *       "fullname": "Vu Xuan Thu",
     *       "phonenumber": "0966890829",
     *       "email": "vxthu.hanu@gmail.com",
     *       "active": true,
     *       "group": "admin",
     *       "attributes": {}
     *     }
     *
     * @apiUse LoginToken
     */
    @route.get('/account/:_id')
    _getAccountInfo({query, params}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            username,
            password,
            fullname,
            phonenumber,
            email,
            active,
            group,
            attributes
        }`;

        return schemaApi.query.accountInfo({
            params,
            response
        });
    }

    /**
     * @api {post} /v1.0/api/account Tạo tài khoản
     * @apiVersion 1.0.0
     * @apiName CreateAccount
     * @apiGroup Account
     * 
     * @apiDescription Tạo tài khoản
     *
     * @apiParam {String} username
     * @apiParam {String} password
     * @apiParam {String} fullname
     * @apiParam {String} [email]
     * @apiParam {String} [phonenumber]
     * @apiParam {Boolean} [active=true]
     * 
     * @apiSuccess {Object} account JSON object của account
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username: "thuvx",
     *       "fullname": "Vu Xuan Thu",
     *       "email": "vxthu.hanu@gmail.com",
     *       "phonenumber": "0966890829",
     *       "active": true
     *     }
     *
     * @apiUse LoginToken
     */
    @route.post('/account')
    _createAccount({body, query}) {
        let response = query.fields ? `{${query.fields}}` : `{
            username,
            fullname,
            email,
            phonenumber,
            active
        }`;

        return schemaApi.mutation.createAccount({
            params: body,
            response
        });
    }

    /**
     * @api {get} /v1.0/api/account Danh sách tài khoản
     * @apiVersion 1.0.0
     * @apiName getListAccount
     * @apiGroup Account
     * 
     * @apiDescription Lấy danh sách tài khoản trong hệ thống
     *
     * @apiParam {Number} [page=0]
     * @apiParam {Number} [size=20]
     * @apiParam {String} [username]
     * @apiParam {String} [fullname]
     * @apiParam {String} [email]
     * @apiParam {String} [phonenumber]
     * 
     * @apiSuccess {Object[]} account Mảng chứa các account
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *         {
     *             "_id": "fr2398vuejdnij",
     *             "username: "thuvx",
     *             "fullname": "Vu Xuan Thu",
     *             "phonenumber": "0966890829",
     *             "email": "vxthu.hanu@gmail.com",
     *             "active": true
     *       }
     *     ]
     *
     * @apiUse LoginToken
     */
    @route.get('/account')
    _getListAccount({query}) {
        let response = query.fields ? `{${query.fields}}` : `{
            page,
            size,
            count,
            items {
                _id,
                username,
                fullname,
                phonenumber,
                email,
                active,
                group
            }
        }`;

        return schemaApi.query.listAccount({
            params: query,
            response
        });
    }


    /**
     * @api {put} /v1.0/api/account/:_id Sửa tài khoản
     * @apiVersion 1.0.0
     * @apiName EditAccount
     * @apiGroup Account
     * 
     * @apiDescription Sửa thông tin tài khoản dựa trên _id
     *
     * @apiParam {String} [password]
     * @apiParam {String} fullname
     * @apiParam {String} [email]
     * @apiParam {String} [phonenumber]
     * @apiParam {Boolean} [active]
     * @apiParam {String} [group]
     * @apiParam {Object} [attributes]
     * 
     * @apiSuccess {Object} account JSON object của account
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "5a68299aa061533ca4af1be7"
     *       "username: "thuvx",
     *       "fullname": "Vu Xuan Thu",
     *       "phonenumber": "0966890829",
     *       "email": "vxthu.hanu@gmail.com",
     *       "active": true,
     *       "group": "admin",
     *       "attributes": {}
     *     }
     *
     * @apiUse LoginToken
     */
    @route.put('/account/:_id')
    _editAccount({body, query, params}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            username,
            fullname,
            phonenumber,
            email,
            active,
            group,
            attributes
        }`;

        return schemaApi.mutation.editAccount({
            params: {
                ...body,
                ...params
            },
            response
        });
    }

    /**
     * @api {delete} /v1.0/api/account/:_id Xóa tài khoản
     * @apiVersion 1.0.0
     * @apiName DeleteAccount
     * @apiGroup Account
     * 
     * @apiDescription Xóa tài khoản dựa trên _id
     * 
     * @apiSuccess {Boolean} success JSON object báo xóa tài khoản thành công
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true
     *     }
     *
     * @apiUse LoginToken
     */
    @route.delete('/account/:_id')
    async _deleteAccount({params}) {
        await schemaApi.mutation.deleteAccount({
            params
        });

        return {
            success: true
        };
    }
}

const accountApi = new AccountApi();

route.register(
    {
        router,
        target: accountApi
    }

);

export default router;