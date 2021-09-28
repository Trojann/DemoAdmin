import {ActionTypes} from 'core';
import {List} from 'immutable';

const initialState = {
    accountgroups: List()  // Toàn bộ các nhóm tài khoản trong hệ thống
};

export default function(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ACCOUNT_GROUP_GET_LIST_SUCCESS:
        return handleListAccountGroup(state, action);
    }
    return state;
}

/**
 * Xử lý khi get tất cả account group thành công
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function handleListAccountGroup(state, action) {
    let {accountgroups} = action;

    accountgroups =  List(accountgroups);
    return {
        ...state,
        accountgroups
    };
}