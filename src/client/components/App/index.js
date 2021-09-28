import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import App from './App';
import {windowResize, resetError} from '../../actions';

const mapStateToProps = (state) => {

    const {
        account,
        error
    } = state;

    let {viewer, tokenRestored} = account;

    return {
        viewer,
        tokenRestored,
        error: error.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        windowResize: bindActionCreators(windowResize, dispatch),
        resetError: bindActionCreators(resetError, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));