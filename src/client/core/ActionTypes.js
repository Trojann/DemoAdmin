const ActionTypes = {
    // socket action
    SOCKET_CONNECT_SUCCESS: 'SOCKET_CONNECT_SUCCESS',
    // Các action liên quan tới session
    SESSION_RESTORE_TOKEN: 'SESSION_RESTORE_TOKEN',
    
    // Các action liên quan tới skin của giao diện
    SKIN_WINDOW_RESIZE: 'SKIN_WINDOW_RESIZE',
    SKIN_RESET_ERROR: 'SKIN_RESET_ERROR',
    GET_LIST_CITIES_SUCCESS: 'GET_LIST_CITIES_SUCCESS',


    /******************************************************/
    /********* Các action liên quan tới gọi api ***********/
    /******************************************************/
    ACCOUNT_GROUP_GET_LIST_SUCCESS: 'ACCOUNT_GROUP_GET_LIST_SUCCESS',
    
    // Các action liên quan tới user
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_LOGOUT: 'USER_LOGOUT',

    USER_UPDATE_PASSWORD_SUCCESS: 'USER_UPDATE_PASSWORD_SUCCESS',
    USER_UPDATE_PASSWORD_FAILED: 'USER_UPDATE_PASSWORD_FAILED',

    USER_GET_PROFILE_SUCCESS: 'USER_GET_PROFILE_SUCCESS',

    USER_UPDATE_PROFILE_SUCCESS: 'USER_UPDATE_PROFILE_SUCCESS',
    USER_UPDATE_PROFILE_FAILED: 'USER_UPDATE_PROFILE_FAILED',

    // CÁc action liên quan tới account
    ACCOUNT_GET_LIST_SUCCESS: 'ACCOUNT_GET_LIST_SUCCESS',
    ACCOUNT_GET_LIST_FAILED: 'ACCOUNT_GET_LIST_FAILED',

    SIP_GET_LIST_SUCCESS: 'SIP_GET_LIST_SUCCESS',
    SIP_GET_LIST_AVAIABLE_SUCCESS: 'SIP_GET_LIST_AVAIABLE_SUCCESS',
};

export default ActionTypes;