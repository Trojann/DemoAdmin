import React from 'react';
import {fromJS} from 'immutable';

import {log} from 'utils';
import * as api from 'api';

import ActionForm from 'elements/ActionForm';
import {TextInput, PasswordInput} from 'elements';

import Select from 'react-select';

class AccountActionForm extends ActionForm {

    validations = {
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            fullname: {
                required: true
            }
        },
        messages: {
            username: {
                required: 'Tên không thể để trống'
            },
            password: {
                required: 'Mật khẩu không thể để trống'
            },
            fullname: {
                required: 'Họ tên không thể để trống'
            }
        }
    }

    formatEditObject() {
        let {editObject} = this.props;

        editObject.password = '******';
        this.setState({
            objectData: fromJS(editObject)
        });
    }

    getData() {
        api.getListAccountGroup().then(({items}) => {
            this.setState({accountgroups: items});
        });
    }

    _renderPasswordInput() {
        let { objectData } = this.state;
        let password = objectData.get('password');
        console.log('password', password);
        return (
            <PasswordInput
                label="Mật khẩu:"
                onChange={(evt) => {
                    objectData = objectData.set('password', evt.target.value || '');
                    this.setState({objectData});
                    this.newPassword = true;
                }}
                value={password}
                name="password"
            />
        );
    }

    _renderActiveInput() {
        let { objectData } = this.state;
        let active = objectData.get('active');
        let checked = active ? 'checked' : '';

        return (
            <div className="form-group text-right">
                <label className="checkbox-inline" style={{ paddingRight: 10 }}>
                    <div
                        className="checker border-info-600 text-info-800"
                    >
                        <span className={checked}>
                            <input
                                onChange={() => {
                                    objectData = objectData.set('active', !active);
                                    this.setState({objectData});
                                }}
                                type="checkbox"
                                className="styled"
                                checked={active}
                            />
                        </span>
                    </div>
                    Hoạt động
                </label>
            </div>
        );
    }

    _renderAccountGroupSelect() {
        let { objectData, accountgroups } = this.state;
        let group = objectData.get('group');

        return (
            <div className="form-group">
                <label className="control-label col-lg-4">Nhóm tài khoản:</label>
                <div className="col-lg-8">
                    <Select
                        name="accountgroup"
                        placeholder="Chọn nhóm tài khoản"
                        options={accountgroups}
                        value={group}
                        labelKey="name"
                        valueKey="_id"
                        onChange={(select) => {
                            if (select) {
                                objectData = objectData.set('group', select._id);
                                this.setState({objectData});
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    _renderInputForm() {
        return (
            <fieldset className="content-group">
                <div className="row"> 
                    <div className="col-lg-6"> 
                        <TextInput
                            disabled={this.isEdit()}
                            label="Tên đăng nhập:"
                            {...this._bindTextInput('username')}
                        />
                        <TextInput
                            label="Họ tên:"
                            {...this._bindTextInput('fullname')}
                        />
                        <TextInput
                            label="Email:"
                            {...this._bindTextInput('email')}
                        />
                    </div>
                    <div className="col-lg-6"> 
                        {this._renderPasswordInput()}
                        {this._renderAccountGroupSelect()}
                        <TextInput
                            label="SĐT:"
                            {...this._bindTextInput('phonenumber')}
                        />
                        {this._renderActiveInput()}
                    </div>
                </div> 
            </fieldset>
        );
    }

    handleSubmit() {
       
        log.trace(`<${this.constructor.name}._editObject> edit account`);
        let { objectData } = this.state;

        if (!this.newPassword) {
            objectData = objectData.delete('password');
        }

        let work;
        if (this.isEdit()) {
            let _id = objectData.get('_id');
            work = api.editAccount(_id, objectData.toJS()).then(() => {
                this.alert({message: 'Sửa thông tài khoản thành công'});
            });
        } else {
            work = api.createAccount(objectData.toJS()).then(() => {
                this.alert({message: 'Tạo tài khoản thành công'});
            });
        }
        
        work.then(() => {
            this.props.onUpdate();
        }).catch(error => {
            this.setState({error}); 
        });
    }
}

export default AccountActionForm;