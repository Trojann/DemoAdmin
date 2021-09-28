import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PasswordAsyncLoad from './PasswordAsyncLoad';
import {updatePassword} from '../../actions';

const mapStateToProps = () => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: bindActionCreators(updatePassword, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordAsyncLoad));