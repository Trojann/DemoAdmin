import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import Alert from 'react-s-alert';

import {EVENT} from 'core';
import {signal} from 'utils';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './alert.css';

class CallCenterAlert extends Component {

    state = {
        alert: false,
        contentTemplate: null
    }

    componentDidMount() {
        signal.on(EVENT.ALERT, this._handleAlert);
    }

    componentWillUnmount () {
        signal.off(EVENT.ALERT, this._handleAlert);
    }

    @autobind
    _handleAlert({type = 'success', message}) {
        let alertMethod = Alert[type] || function() {};
        alertMethod(`${message}`, {
            position: 'bottom-right',
            effect: 'slide',
            beep: false,
            timeout: 5000,
            offset: 100,
        });

        this.setState({contentTemplate: null});
    }



    render() {
        return (
            <Alert stack={{limit: 1, spacing: 50}} timeout={3000}/>
        );
    }

}

export default CallCenterAlert;