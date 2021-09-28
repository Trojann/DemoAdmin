import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {configureStore} from './store';
import * as actions from './actions';

import App from './components/App';

const store = configureStore();

const outlet = document.getElementById('app');

store.dispatch(actions.windowResize());
store.dispatch(actions.restoreToken());

const Main = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    <Main/>,
    outlet
);