import {ActionTypes} from '../core';
import {request} from '../utils';

export function getListAccount(params) {
    return (dispatch) => {
            
        request({
            method: 'GET',
            url:'/v1.0/api/account',
            params
        }).then((data) => {
            dispatch({
                type: ActionTypes.ACCOUNT_GET_LIST_SUCCESS,
                data
            });
        }).catch(() => {
            
        });
    };
}