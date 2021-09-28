import {request} from '../utils';

export function login({username, password} = {}) {
    return Promise.resolve().then(() => {
        let message;

        if (!username && !password) {
            message = 'Thiếu tên đăng nhập và mật khẩu';
        } else if (!username) {
            message = 'Thiếu tên đăng nhập';
        } else if (!password) {
            message = 'Thiếu mật khẩu';
        } else {
            return;
        }

        return Promise.reject({
            code: -1,
            message
        });
    }).then(() => {
        return request({
            method: 'POST',
            url:'/v1.0/api/login',
            data: {
                username,
                password
            }
        });
    });  
}

export function loginWithToken() {
    return request({
        method: 'POST',
        url:'/v1.0/api/login-with-token'
    });
}

export function getViewerProfile() {
    return request({
        method: 'GET',
        url:'/v1.0/api/profile'
    });
}