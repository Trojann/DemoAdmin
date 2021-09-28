import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import * as api from 'api';

import {EVENT} from 'core';
import {signal} from 'utils';

let style = {
    unchecked: {
        bg: {
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(223, 223, 223)',
            boxShadow: 'rgb(223, 223, 223) 0px 0px 0px 0px inset',
            transition: 'border 0.4s, box-shadow 0.4s',
            position: 'relative',
            left: '10px'
        },
        circle: {
            left: 0,
            transition: 'background-color 0.4s , left 0.2s'
        }
    },
    checked: {
        bg: {
            backgroundColor: 'rgb(0, 188, 212)',
            borderColor: 'rgb(0, 188, 212)',
            boxShadow: 'rgb(0, 188, 212) 0px 0px 0px 12px inset',
            transition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
            position: 'relative',
            left: '10px'
        },
        circle: {
            left: 22,
            transition: 'background-color 0.4s, left 0.2s',
            backgroundColor: ' rgb(255, 255, 255)',
        }
    }
};

class Busy extends Component {

    static propTypes = {
        busy: PropTypes.bool.isRequired
    }

    state = {
        busy: this.props.busy
    }

    componentDidMount() {
        signal.on(EVENT.BUSY_STATE, this._updateBusyState);
    }

    componentWillUnmount () {
        signal.off(EVENT.BUSY_STATE, this._updateBusyState);
    }

    @autobind
    _updateBusyState(busy) {
        this.setState({
            busy
        });
    }

    @autobind
    _changeBusyState() {
        let self = this;
        let {busy} = this.state;

        api.updateBusyState(!busy).then(() => {
            self.setState({
                busy: !busy
            });
        });
    }

    render() {
        let notBusy = !this.state.busy;
        return (
            <span 
                className="checkbox-switchery"
            >
                Nhận gọi vào
                <input 
                    type="checkbox" 
                    className="switchery" 
                    checked={notBusy} 
                    style={{display: 'none'}} 
                />
                <span 
                    className="switchery switchery-default" 
                    style={notBusy ? style.checked.bg: style.unchecked.bg}
                    onClick={this._changeBusyState}
                >
                    <small 
                        style={notBusy ? style.checked.circle: style.unchecked.circle}
                    ></small>
                </span>
            </span>
        );
    }
}

export default Busy;