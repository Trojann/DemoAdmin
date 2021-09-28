import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {EVENT} from 'core';
import {log, signal} from 'utils';

class RemoteResourceForm extends Component {

    static propTypes = {
        history: PropTypes.object,
        info: PropTypes.object,
        classSize: PropTypes.string,
        onClose: PropTypes.func.isRequired
    }

    static defaultProps = {
        info: {
            headerTitle: 'Header title',
        },
        classSize: 'modal-lg'
    }

    state = {
        error: null
    }

    componentDidMount() {
        log.trace(`<${this.constructor.name}.componentDidMount> trigger modal open`);
        signal.trigger(EVENT.MODAL_OPEN);
    }

    componentWillUnmount() {
        log.trace(`<${this.constructor.name}.componentWillUnmount> trigger modal close`);
        signal.trigger(EVENT.MODAL_CLOSE);
    }

    @autobind
    close() {
        this.props.onClose();
    }

    _renderHeader() {
        let {info} = this.props;
        return (
            <div className="modal-header bg-info">
                <h6 className="modal-title">{info.headerTitle}</h6>
                <button type="button" className="close" data-dismiss="modal"
                    onClick={this.close}
                >×</button>
            </div>
        );
    }

    _renderInputForm() {
        return null;
    }

    _renderError() {
        let {error} = this.state;
        if (!error) {
            return null;
        }

        return (
            <div className="has-error">
                <span className="help-block">{error.message}</span>
            </div>
        );
    }

    _renderBody() {
        return (
            <div className="modal-body">
                {this._renderInputForm()}
                {this._renderError()}
            </div>
        );
    }

    @autobind
    onSave() {
        log.trace(`<${this.constructor.name}.onSave>`);
    }

    _renderFooter() {
        return (
            <div className="modal-footer">
                <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={this.onSave}
                >
                   Xác nhận
                </button>
                <button type="button" className="btn btn-link" data-dismiss="modal"
                    onClick={this.close}
                >Hủy</button>
            </div>
        );
    }

    render() { 
        return (
            <div 
                data-component="RemoteResourceForm"
                className="modal fade in"
                style={{
                    display: 'block',
                    paddingRight: '17px'
                }}
            >
                <div className={`modal-dialog ${this.props.classSize}`}>
                    <div className="modal-content">
                        {this._renderHeader()}
                        {this._renderBody()}
                        {this._renderFooter()}
                    </div>
                </div>
            </div>
        );
    }
}

export default RemoteResourceForm;