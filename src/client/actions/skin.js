import {ActionTypes} from '../core';

export function windowResize() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SKIN_WINDOW_RESIZE
        });
    };
}

export function resetError() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SKIN_RESET_ERROR
        });
    };
}