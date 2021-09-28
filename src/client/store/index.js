import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let createStoreWithMiddleware;
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

export function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}