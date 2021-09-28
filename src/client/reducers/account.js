import {ActionTypes} from '../core';

const initialState = {
    viewer: null,
    profile: {},
    tokenRestored: false
};

export default function(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.USER_GET_PROFILE_SUCCESS:
        return getProfileSuccess(state, action);
    case ActionTypes.USER_UPDATE_PROFILE_SUCCESS:
        return updateProfileSuccess(state, action);

    case ActionTypes.USER_LOGIN_SUCCESS:
        return loginSuccess(state, action);
    case ActionTypes.USER_LOGIN_FAILED:
        return loginFailed(state, action);
    case ActionTypes.USER_LOGOUT:
        return logout(state, action);

    case ActionTypes.SESSION_RESTORE_TOKEN:
        return restoreToken(state, action);
    }
    return state;
}

/**
 * @typedef {Object} Profile
 * @property {String} fullname
 * @property {string} phonenumber
 * @property {string} email
 */

/**
 * Cập nhật profile
 * @param  {Object} state  State ban đầu
 * @param  {Object} action
 * @param  {String} action.type
 * @param  {Profile} action.profile 
 * @return {Object}
 */
function getProfileSuccess(state, action) {
    const {profile} = action;
    return {
        ...state,
        profile
    };
}

/**
 * @typedef {Object} Profile
 * @property {String} fullname
 * @property {string} phonenumber
 * @property {string} email
 */

/**
 * Xử lý khi cập nhật profile thành công
 * @param  {Object} state  State ban đầu
 * @param  {Object} action
 * @param  {String} action.type
 * @param  {Profile} action.profile 
 * @return {Object}
 */
function updateProfileSuccess(state, action) {
    const {profile} = action;
    return {
        ...state,
        profile
    };
}

/**
 * @typedef {Object} Viewer
 * @property {String} username
 * @property {String} fullname
 * @property {string} sip
 * @property {string} token
 */

/**
 * Cập nhật viewer khi login thành công
 * @param  {Object} state  State ban đầu
 * @param  {Object} action
 * @param  {String} action.type
 * @param  {Viewer} action.viewer 
 * @return {Object}
 */
function loginSuccess(state, action) {
    const {viewer} = action;
    return {
        ...state,
        viewer,
        tokenRestored: true
    };
}

function loginFailed(state) {
    return {
        ...state
    };
}

/**
 * Xóa viewer khi logout
 * @param  {Object} state  State ban đầu
 * @return {Object}
 */
function logout(state) {
    return {
        ...state,
        viewer: null,
        tokenRestored: true
    };
}

/**
 * Cập nhật trạng thái restoreToken khi restore thành công
 * @param  {Object} state  State ban đầu
 * @return {Object}
 */
function restoreToken(state) {
    return {
        ...state,
        tokenRestored: true
    };
}