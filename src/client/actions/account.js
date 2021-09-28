import localStorage from 'store';
import io from 'socket.io-client';
import {ActionTypes, EVENT} from '../core';
import * as api from '../api';
import {request, signal, updateTokenKey} from '../utils';

export function restoreToken() {
    return (dispatch) => {
        let viewer = localStorage.get('viewer');

        if (!viewer) {
            dispatch({
                type: ActionTypes.SESSION_RESTORE_TOKEN
            });
        } else {
            // Kiểm tra viewer thực sự login chưa hay fake
            api.loginWithToken().then((result) => {
                localStorage.set('viewer', result);
                updateTokenKey(result.token);
                dispatch({
                    type: ActionTypes.USER_LOGIN_SUCCESS,
                    viewer: result
                });
                dispatch(connectSocket(result));
                dispatch(getViewerProfile());
            }).catch(() => {
                dispatch(logout());
            });
        }
    };
}

export function getViewerProfile() {
    return (dispatch) => {   
        api.getViewerProfile().then((profile) => {
            dispatch({
                type: ActionTypes.USER_GET_PROFILE_SUCCESS,
                profile
            });
        });
    };
}

function connectSocket(viewer) {
    return (dispatch) => {
        let socket = io({
            query: {
                token: viewer.token
            }
        });

        socket.on('connect', () => {
            dispatch({
                socket,
                type: ActionTypes.SOCKET_CONNECT_SUCCESS
            });
        });

        // listen event được gửi xuống cho user dưa trên kênh riêng của mình
        let {_id} = viewer;
        socket.on(`session:${_id}`, function (message) {
            let {action} = message;
            switch(action) {
            case 'update-inbound-status':
                // Action cập nhật inbound status 
                signal.emit(EVENT.INBOUND_STATUS, message.data);
                signal.emit(EVENT.RELOAD_LIST_INBOUND_HISTORY);
                break;
            case 'update-busy-state':
                // Action cập nhật busy state
                signal.emit(EVENT.BUSY_STATE, message.busy);
                break;
            }
        });

        socket.on('publish', function (message) {
            let {action} = message;
            switch(action) {
            case 'reload-pending-outbound':
                // Action cập nhật inbound status
                signal.emit(EVENT.RELOAD_LIST_CALL);
                break;
            }
        });
    };
}

export function login(data) {
    return (dispatch) => {
        api.login(data).then((result) => {
            localStorage.set('viewer', result);
            updateTokenKey(result.token);
            dispatch({
                type: ActionTypes.USER_LOGIN_SUCCESS,
                viewer: result
            });
            dispatch(connectSocket(result));
            dispatch(getViewerProfile());
        }).catch(error => {
            dispatch({
                type: ActionTypes.USER_LOGIN_FAILED,
                error
            });
            signal.trigger(EVENT.USER_LOGIN_FAILED, error);
        });
    };
}

export function logout() {
    return (dispatch) => {
        localStorage.remove('viewer');
        dispatch({
            type: ActionTypes.USER_LOGOUT
        });
    };
}

export function updatePassword(data) {
    return (dispatch) => {
        request({
            method: 'POST',
            url:'/v1.0/api/password',
            data
        }).then(() => {
            dispatch({
                type: ActionTypes.USER_UPDATE_PASSWORD_SUCCESS,
            });
            signal.trigger(EVENT.USER_UPDATE_PASSWORD_SUCCESS);
        }).catch(error => {
            dispatch({
                type: ActionTypes.USER_UPDATE_PASSWORD_FAILED,
                error
            });
            signal.trigger(EVENT.USER_UPDATE_PASSWORD_FAILED, error);
        });
    };
}

export function updateProfile(data) {
    return (dispatch) => {
        request({
            method: 'POST',
            url:'/v1.0/api/profile',
            data
        }).then((result) => {
            dispatch({
                type: ActionTypes.USER_UPDATE_PROFILE_SUCCESS,
                profile: result
            });
            signal.trigger(EVENT.USER_UPDATE_PROFILE_SUCCESS);
        }).catch(error => {
            dispatch({
                type: ActionTypes.USER_UPDATE_PROFILE_FAILED,
                error
            });
            signal.trigger(EVENT.USER_UPDATE_PROFILE_FAILED, error);
        });
    };
}