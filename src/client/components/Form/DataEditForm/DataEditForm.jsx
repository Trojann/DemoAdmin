import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import autobind from 'autobind-decorator';

import {EVENT} from 'core';
import {log, signal} from 'utils';

class DataEditForm extends Component {

    static propTypes = {
        history: PropTypes.object,
        info: PropTypes.object,
        jqueryValidateOpts: PropTypes.object,
        classSize: PropTypes.string,
        formId: PropTypes.string,
        _id: PropTypes.string.isRequired
    }

    static defaultProps = {
        info: {
            headerTitle: 'Header title',
            basePath: '/test',
            formId: 'form-edit-data',
            jqueryValidateOpts: {}
        },
        classSize: 'modal-lg'
    }

    state = {
        objectData: null,
        error: null
    }

    componentDidMount() {
        log.trace(`<${this.constructor.name}.componentDidMount> trigger modal open`);
        signal.trigger(EVENT.MODAL_OPEN);
        this._getInfo();
        this._initJQueryValidator();
    }

    componentWillUnmount() {
        log.trace(`<${this.constructor.name}.componentWillUnmount> trigger modal close`);
        signal.trigger(EVENT.MODAL_CLOSE);
    }

    _getInfo() {
        this.setState({
            objectData: {}
        });
    }

    _renderHeader() {
        let {info} = this.props;
        return (
            <div className="modal-header bg-info">
                <h6 className="modal-title">{info.headerTitle}</h6>
                <NavLink to={`${info.basePath}`} activeClassName="active">
                    <button type="button" className="close" data-dismiss="modal">×</button>
                </NavLink>
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

    handleSubmit() {
        
    }

    _initJQueryValidator() {
        $('#'+this.props.formId).validate({errorClass: 'text-danger text-size-small', ...this.props.jqueryValidateOpts});
    }

    _renderBody() {
        let {objectData} = this.state;

        if (!objectData) {
            return null;
        }

        return (
            <div className="modal-body">
                <div className="form-horizontal">
                    {this._renderInputForm()}
                    {this._renderError()}
                </div>
            </div>
        );
    }

    @autobind
    _editObject() {
        log.trace(`<${this.constructor.name}._editObject>`);
    }

    _renderFooter() {
        let {objectData} = this.state;

        if (!objectData) {
            return null;
        }

        let {info} = this.props;

        return (
            <div className="modal-footer">
                <button 
                    type="submit" 
                    className="btn btn-info"
                >
                   Lưu lại
                </button>
                <NavLink to={`${info.basePath}`} activeClassName="active">
                    <button type="button" className="btn btn-link" data-dismiss="modal">Hủy</button>
                </NavLink>
            </div>
        );
    }

    render() {
        return (
            <div 
                data-component="DataEditForm"
                className="modal fade in"
                style={{
                    display: 'block',
                    paddingRight: '17px'
                }}
            >
                <div className={`modal-dialog ${this.props.classSize}`}>
                    <div className="modal-content">
                        <form id={this.props.formId} onSubmit={this.handleSubmit}>
                            {this._renderHeader()}
                            {this._renderBody()}
                            {this._renderFooter()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataEditForm;