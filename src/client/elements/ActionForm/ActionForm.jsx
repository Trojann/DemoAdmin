import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import {fromJS} from 'immutable';
import Alert from 'react-s-alert';
import {log} from 'utils';

let formIndex = 0;

class ActionForm extends Component {

    formId_ = formIndex++;

    static propTypes = {
        editObject: PropTypes.object,
        onCancel: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        let {editObject} = this.props;

        this.isEdit_ = !!editObject;
    }

    isEdit() {
        return this.isEdit_;
    }

    componentWillMount() {
        log.trace('componentWillMount');
        this._formatEditObject();
        this.getData();
    }

    _formatEditObject() {
        if (!this.isEdit()) {
            this.setState({
                objectData: fromJS({})
            });
        } else if (typeof this.formatEditObject === 'function') {
            this.setState({
                objectData: fromJS({})
            });
            this.formatEditObject();
        } else {
            let {editObject} = this.props;
            self.setState({
                objectData: fromJS(editObject)
            });
        }  
    }

    getData() {
        return null;
    }

    componentDidMount() {
        if (!this.validations) {
            return;
        }
        
        $(`#${this.formId_}`).validate({errorClass: 'text-danger text-size-small', ...this.validations});
    }

    showNotice({type, message}) {
        let title = '';

        switch(type) {
        case 'error': 
            title = 'Lỗi';
            break;
        case 'success':
            title = 'Thành công';
            break;
        }
        return swal(title, message, type);
    }

    alert({type = 'success', message}) {
        let alertMethod = Alert[type] || function() {};
        alertMethod(`${message}`, {
            position: 'bottom-right',
            effect: 'slide',
            beep: false,
            timeout: 5000,
            offset: 100,
        });
    }

    handleSubmit() {
        
    }

    _bindTextInput(key) {
        let { objectData } = this.state;
        return {
            name: key,
            value: objectData.get(key),
            onChange: (evt) => {
                objectData = objectData.set(key, evt.target.value || null);
                this.setState({objectData});
            }
        };
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

    renderHeader() {
        return null;
    }

    renderBody() {
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

    renderFooter() {
        let {objectData} = this.state;

        if (!objectData) {
            return null;
        }

        return (
            <div className="modal-footer">
                <button 
                    type="submit" 
                    className="btn btn-info"
                >
                   Lưu lại
                </button>
                <button 
                    type="button" 
                    className="btn btn-link" 
                    data-dismiss="modal"
                    onClick={()=> {
                        this.props.onCancel();
                    }}
                >
                    Hủy
                </button>
            </div>
        );
    }

    render() {
        return (
            <form id={this.formId_} onSubmit={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                this.handleSubmit(e);
            }}>
                {this.renderBody() }
                {this.renderFooter()}
            </form>
        );
    }
}

export default ActionForm;