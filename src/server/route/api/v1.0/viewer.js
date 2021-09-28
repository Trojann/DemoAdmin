import express from 'express';
import {route, log} from '../../../util';

import schemaApi from '../../../graphql/schema_api';

const router = express.Router();

/**
 * Xử lý 
 * class ViewerApi
 */
class ViewerApi {

    /**
     * @api {post} /v1.0/api/login Đăng nhập
     * @apiVersion 1.0.0
     * @apiName Login
     * @apiGroup Viewer
     * 
     * @apiDescription Đăng nhập với username và password
     *
     * @apiParam {String} username
     * @apiParam {String} password
     * 
     * @apiSuccess {Object} auth JSON object có chứa login token
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id: "5a68299aa061533ca4af1be7",
     *       "username": "Vu Xuan Thu",
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTY4Mjk5YWEwNjE1MzNjYTRhZjFiZTciLCJ1cGRhdGVkQXQiOiIyMDE4LTAxLTI0VDA2OjM3OjE0LjU4NFoiLCJjcmVhdGVkQXQiOiIyMDE4LTAxLTI0VDA2OjM3OjE0LjU4NFoiLCJ1c2VybmFtZSI6InR1YW5sZHQiLCJmdWxsbmFtZSI6IlRoYW5oIFR14bqlbiIsIl9fdiI6MCwiZGVsZXRlZCI6ZmFsc2UsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNTE3NTM5OTM1LCJleHAiOjE1MTc3OTkxMzV9.PwSUEmLDYtnXoc2uTB-IJX5-X-z7xiT-6R2RP2-UJkg"
     *     }
     */
    
    @route.post('/login')
    _login({body, query}) {
        log.trace('<AccountApi._login>', {body, query});

        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            username,
            token
        }`;

        return schemaApi.mutation.login({
            params: body,
            response
        });
    }

    /**
     * @api {post} /v1.0/api/login-with-token Đăng nhập với token
     * @apiVersion 1.0.0
     * @apiName LoginWithToken
     * @apiGroup Viewer
     * 
     * @apiDescription Đăng nhập với token
     * @apiParam {String} token
     * 
     * @apiSuccess {Object} auth JSON object có chứa login token
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id: "5a68299aa061533ca4af1be7",
     *       "username": "thuvx",
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTY4Mjk5YWEwNjE1MzNjYTRhZjFiZTciLCJ1cGRhdGVkQXQiOiIyMDE4LTAxLTI0VDA2OjM3OjE0LjU4NFoiLCJjcmVhdGVkQXQiOiIyMDE4LTAxLTI0VDA2OjM3OjE0LjU4NFoiLCJ1c2VybmFtZSI6InR1YW5sZHQiLCJmdWxsbmFtZSI6IlRoYW5oIFR14bqlbiIsIl9fdiI6MCwiZGVsZXRlZCI6ZmFsc2UsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNTE3NTM5OTM1LCJleHAiOjE1MTc3OTkxMzV9.PwSUEmLDYtnXoc2uTB-IJX5-X-z7xiT-6R2RP2-UJkg"
     *     }
     */
    @route.post('/login-with-token')
    _loginWithToken({headers, query, body}) {
        let token = body.token || headers['x-token-key'];
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            username,
            token
        }`;

        return schemaApi.mutation.loginWithToken({
            params: {
                token
            },
            response
        });
    }

    /**
     * @api {get} /v1.0/api/profile Viewer profile
     * @apiVersion 1.0.0
     * @apiName GetViewerProfile
     * @apiGroup Viewer
     * 
     * @apiDescription Lấy thông tin profile của viewer đã login
     * 
     * @apiSuccess {Object} profie JSON object có chứa thông tin profile
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id: "5a68299aa061533ca4af1be7",
     *       "username": "thuvx",
     *       "fullname": "Vu Xuan Thu"
     *     }
     *
     * @apiUse LoginToken
     */
    @route.get('/profile')
    _getProfile({query}) {
        let response = query.fields ? `{${query.fields}}` : `{
            _id,
            username,
            fullname,
            phonenumber,

        }`;
        return schemaApi.query.profile({
            response
        });
    }
}

const viewerApi = new ViewerApi();

route.register(
    {
        router,
        target: viewerApi
    }

);

export default router;