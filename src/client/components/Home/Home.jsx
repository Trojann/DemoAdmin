import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import autobind from 'autobind-decorator';

import {EVENT} from 'core';
import {log, signal} from 'utils';

import Alert from '../Alert';
import Header from '../Header';
import Password from '../Password';
import Profile from '../Profile';
import {
    ManageAccount
} from '../Account';
import ManageStorage from '../Storage';

class Home extends Component {

    static propTypes = {
        history: PropTypes.object
    }

    state = {
        isModalOpen: false
    }

    componentDidMount() {
        signal.on(EVENT.MODAL_OPEN, this._handleModalOpen);
        signal.on(EVENT.MODAL_CLOSE, this._handleModalClose);
    }

    componentWillUnmount() {
        signal.off(EVENT.MODAL_OPEN, this._handleModalOpen);
        signal.off(EVENT.MODAL_CLOSE, this._handleModalClose);
    }

    @autobind
    _handleModalOpen() {
        log.trace('<Home._handleModalOpen>');
        this.setState({
            isModalOpen: true
        });
    }

    @autobind
    _handleModalClose() {
        log.trace('<Home._handleModalClose>');
        this.setState({
            isModalOpen: false
        });
    }

    _renderModelBackDrop() {
        let {isModalOpen} = this.state;

        if (isModalOpen) {
            return (
                <div className="modal-backdrop fade in">
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div data-component="Home">
                <Header/>
                <div className="page-container" style={{paddingRight: 50, paddingLeft: 50}}>
                    <div className="page-content">
                        <div className="content-wrapper">
                            <Switch>
                                <Route path="/profile" component={Profile}/>
                                <Route path="/password" component={Password}/>
                                <Route path="/account" component={ManageAccount}/>
                                <Route strict path="/storage" component={ManageStorage}/>
                            </Switch>
                        </div>
                    </div>
                </div>
                <Alert/>
                {this._renderModelBackDrop()}   
            </div>
        );
    }
}

export default Home;