import {request} from '../utils';

export function getListAccount(params = {}) {
    return request({
        method: 'GET',
        url:'/v1.0/api/account',
        params
    });
}

export function getAccountInfo(_id) {
    return request({
        method: 'GET',
        url: `/v1.0/api/account/${_id}`
    });
}

export function createAccount(data) {
    return request({
        method: 'POST',
        url: '/v1.0/api/account',
        data
    });
}

export function editAccount(_id, data) {
    return request({
        method: 'PUT',
        url: `/v1.0/api/account/${_id}`,
        data
    });
}

export function deleteAccount(_id) {
    return request({
        method: 'DELETE',
        url: `/v1.0/api/account/${_id}`
    });
}