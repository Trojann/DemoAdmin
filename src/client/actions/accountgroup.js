import {ActionTypes} from 'core';
import * as api from '../api';

export function getListAccountGroup() {
    return (dispatch) => {
        api.getListAccountGroup({size: 200})
            .then(({items}) => {
                dispatch({
                    accountgroups: items,
                    type: ActionTypes.ACCOUNT_GROUP_GET_LIST_SUCCESS,
                });
            });
    };
}