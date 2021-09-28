import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Switch, Route, Redirect } from 'react-router-dom';

import './app.css';
import {log} from '../../utils';

import Home from '../Home';
import Login from '../Login';

class App extends Component {

    static propTypes = {
        history: PropTypes.object,
        viewer: PropTypes.object,
        error: PropTypes.object,
        tokenRestored: PropTypes.bool.isRequired,
        windowResize: PropTypes.func.isRequired,
        resetError: PropTypes.func.isRequired
    }

    componentDidMount() {
        let {windowResize} = this.props;
        $(window).on('resize', function() {
            setTimeout(function() {    
                windowResize();
            }, 100);
        }).resize();
    }

    componentWillUnmount() {
        $(window).off('resize');
    }

    @autobind
    _closeError(evt) {
        evt.preventDefault();
        let {resetError} = this.props;
        resetError();
    }

    _renderError() {
        let {error} = this.props;

        if (!error) {
            return null;
        }

        return (
            <div className="alert bg-danger-400">
                <button 
                    type="button" className="close"
                    onClick={this._closeError}
                >
                    <span>×</span>
                    <span className="sr-only">
                        Close
                    </span>
                </button>
                <span className="text-semibold">
                    {error.message}
                </span>
            </div>
        );
    }

    render() {
        let {viewer, tokenRestored} = this.props;

        log.info('<App.render>', viewer);

        if (!tokenRestored) {
            return null;
        }
        
        return (
            <div data-component="App">
                {this._renderError()}
                <Switch>
                    <Route exact path='/login' render={() => (
                        !viewer ? (
                            <Login/>
                        ) : (
                            <Redirect to="/"/>
                        )
                    )}/>
                    <Route path="/" render={() => (
                        viewer ? (
                            <Home/>
                        ) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                </Switch>
            </div>
        );
    }
}

export default App;