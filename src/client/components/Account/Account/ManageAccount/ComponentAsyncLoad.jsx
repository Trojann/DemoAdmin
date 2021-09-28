import React from 'react';
import loadable from 'react-loadable';

const ComponentAsyncLoad = loadable({
    loader: () => import('./ManageAccount'),
    loading: () => {
        return (
            <div>
				Loading ...
            </div>
        );
    }
});

export default ComponentAsyncLoad;