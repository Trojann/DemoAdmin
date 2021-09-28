import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ComponentAsyncLoad from './ComponentAsyncLoad';

export default withRouter(connect()(ComponentAsyncLoad));