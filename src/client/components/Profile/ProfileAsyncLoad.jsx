import React from 'react';
import loadable from 'react-loadable';

const ProfileAsyncLoad = loadable({
    loader: () => import('./Profile'),
    loading: () => {
        return (
            <div>
				Loading ...
            </div>
        );
    }
});

export default ProfileAsyncLoad;