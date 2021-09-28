import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ManageStorageAsyncLoad from './ManageStorageAsyncLoad';

const mapStateToProps = (state, ownProps) => {
    let pathname =  ownProps.location.pathname;
    let filePath = pathname.replace('/storage', '');
    let paths = [];

    if (filePath) {
        let _paths = filePath.split('/');
        let basePath = '/storage';
        _paths.shift();
        _paths.map(path => {
            basePath += `/${path}`;
            paths.push({
                path: basePath,
                name: path
            });
        });
    }

    console.log(paths);
    return {
        filePath,
        paths
    };
};

export default withRouter(connect(mapStateToProps)(ManageStorageAsyncLoad));