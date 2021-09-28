import React from 'react';
import loadable from 'react-loadable';

const PasswordAsyncLoad = loadable({
    loader: () => import('./Password'),
    loading: () => {
        return (
            <div>
				Loading ...
            </div>
        );
    }
});

export default PasswordAsyncLoad;