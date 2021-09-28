import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileAsyncLoad from './ProfileAsyncLoad';
import {updateProfile} from '../../actions';

const mapStateToProps = (state) => {
    let {account} = state;
    let {profile} = account;
    return {
        profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: bindActionCreators(updateProfile, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileAsyncLoad));