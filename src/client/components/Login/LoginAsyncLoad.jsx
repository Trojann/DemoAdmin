import React from 'react';
import loadable from 'react-loadable';

const LoginAsyncLoad = loadable({
    loader: () => import('./Login'),
    loading: () => {
        return (
            <div>
				Loading ...
            </div>
        );
    }
});

export default LoginAsyncLoad;