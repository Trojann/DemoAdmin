import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {

    const {
        account
    } = state;

    let {viewer} = account;

    return {
        viewer
    };
};

export default withRouter(connect(mapStateToProps)(Home));