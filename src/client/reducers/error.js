import {ActionTypes} from '../core';

const initialState = {
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.USER_LOGIN_FAILED:
        // not handle
        break;
    case ActionTypes.SKIN_RESET_ERROR:
        return resetError(state, action);
    }
    return state;
}

/*function handleError(state, action) {
    const {error} = action;
    return {
        ...state,
        error
    };
}*/

function resetError(state) {
    return {
        ...state,
        error: null
    };
}