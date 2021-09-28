import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import './login.css';

import {EVENT} from '../../core';
import {log, signal} from '../../utils';

class Login extends Component {

    static propTypes = {
        windowHeight: PropTypes.number.isRequired,
        history: PropTypes.object,
        login: PropTypes.func.isRequired
    }

    state = {
        error: null
    }

    componentDidMount() {
        signal.on(EVENT.USER_LOGIN_FAILED, this._loginFailed);
    }

    componentWillUnmount() {
        signal.off(EVENT.USER_LOGIN_FAILED, this._loginFailed);
    }

    @autobind
    _loginFailed(error) {
        log.info('<Login._loginFailed>', arguments);

        if (error.code !== -1) {
            this.passwordInput.value = '';
        }
        
        this.setState({error});
    }

    @autobind
    _onLogin() {
        let {login} = this.props;
        let username = this.usernameInput.value;
        let password = this.passwordInput.value;

        log.info('<Login._onLogin>', {username, password});
        
        login({
            username,
            password
        });
    }

    @autobind
    _submitHandler(evt) {
        evt.preventDefault();
    }

    render() {
        let {windowHeight} = this.props;
        let {error} = this.state;
        return (
            <div 
                data-component="Login"
                className="navbar-top login-container pace-done"
            >
                <div className="page-container" style={{minHeight: windowHeight - 50}}>
                    <div className="page-content">
                        <div className="content-wrapper">
                            <form 
                                className="login-form"
                                onSubmit={this._submitHandler}
                            >
                                <div className="panel panel-body">
                                    <div className="text-center">
                                        <div className="icon-object border-slate-300 text-slate-300"><i className="icon-reading"></i>
                                        </div>
                                        <h5 className="content-group">Đăng nhập hệ thống<small className="display-block">Nhập tài khoản của bạn dưới đây </small></h5>
                                    </div>

                                    <div className={`form-group has-feedback has-feedback-left${error ? ' has-error' : ''}`}>
                                        <input 
                                            type="text" className="form-control" placeholder="Tên đăng nhập"
                                            ref={(input) => { this.usernameInput = input;}}
                                        />
                                        <div className="form-control-feedback">
                                            <i className="icon-user text-muted"></i>
                                        </div>
                                    </div>

                                    <div className={`form-group has-feedback has-feedback-left${error ? ' has-error' : ''}`}>
                                        <input 
                                            type="password" className="form-control" placeholder="Mật khẩu"
                                            ref={(input) => { this.passwordInput = input;}}
                                        />
                                        <div className="form-control-feedback">
                                            <i className="icon-lock2 text-muted"></i>
                                        </div>
                                        {
                                            error ? <span className="help-block">{error.message}</span> : null
                                        }
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="btn bg-pink-400 btn-block"
                                            onClick={this._onLogin}
                                        >
                                            Đăng nhập 
                                            <i className="icon-circle-right2 position-right"></i>
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <a href="login_password_recover.html">Quên mật khẩu?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;