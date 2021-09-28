import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';

import {logout} from '../../actions';

const mapStateToProps = (state) => {

    const {
        account
    } = state;

    let {viewer, profile} = account;

    return {
        viewer,
        profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: bindActionCreators(logout, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));