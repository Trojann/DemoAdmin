import {request} from '../utils';

export function getListAccountGroup(params = {}) {
    return request({
        method: 'GET',
        url:'/v1.0/api/group',
        params
    });
}

export function getAccountGroupInfo(_id) {
    return request({
        method: 'POST',
        url: `/v1.0/api/group/${_id}`
    });
}

export function createAccountGroup(data) {
    return request({
        method: 'POST',
        url: '/v1.0/api/group',
        data
    });
}

export function editAccountGroup(_id, data) {
    return request({
        method: 'PUT',
        url: `/v1.0/api/group/${_id}`,
        data
    });
}

export function deleteAccountGroup(_id) {
    return request({
        method: 'DELETE',
        url: `/v1.0/api/group/${_id}`
    });
}