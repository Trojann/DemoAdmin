import React from 'react';
import loadable from 'react-loadable';

const ManageStorageAsyncLoad = loadable({
    loader: () => import('./ManageStorage'),
    loading: () => {
        return (
            <div>
				Loading ...
            </div>
        );
    }
});

export default ManageStorageAsyncLoad;