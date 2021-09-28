import {ActionTypes} from '../core';

const initialState = {
    windowHeight: 720
};

export default function(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SKIN_WINDOW_RESIZE:
        return handleWindowResize(state, action);
    }
    return state;
}

function handleWindowResize(state) {
    return {
        ...state,
        windowHeight: $(window).height()
    };
}