import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {EVENT} from '../../core';
import {log, signal} from '../../utils';

class Password extends Component {

 static propTypes = {
     updatePassword: PropTypes.func.isRequired
 }

 state = {
     error: null,
     success: null
 }

 componentDidMount() {
     signal.on(EVENT.USER_UPDATE_PASSWORD_FAILED, this._updatePasswordFailed);
     signal.on(EVENT.USER_UPDATE_PASSWORD_SUCCESS, this._updatePasswordSuccess);
 }

 componentWillUnmount() {
     signal.off(EVENT.USER_UPDATE_PASSWORD_FAILED, this._updatePasswordFailed);
     signal.off(EVENT.USER_UPDATE_PASSWORD_SUCCESS, this._updatePasswordSuccess);
 }

 @autobind
 _updatePasswordFailed(error) {
     log.info('<Password._updatePasswordFailed>');

     if (error.code !== -1) {
         this.oldPasswordInput.value = '';
     }
        
     this.newPasswordInput.value = '';
     this.repeatNewPasswordInput.value = '';
        
     this.setState({error, success: false});
 }

 @autobind
 _updatePasswordSuccess() {
     log.info('<Password._updatePasswordSuccess>');

     this.oldPasswordInput.value = '';
     this.newPasswordInput.value = '';
     this.repeatNewPasswordInput.value = '';
        
     this.setState({error: null, success: true});
 }

 _renderOldPasswordInput() {
     return (
         <div className="form-group">
             <label className="control-label col-lg-3">Mật khẩu cũ<span className="text-danger">*</span></label>
             <div className="col-lg-9">
                 <input 
                     ref={(input) => { this.oldPasswordInput = input;}}
                     type="password"
                     name="password" 
                     id="password" 
                     className="form-control" 
                     required="required"
                     aria-required="true"
                 />
             </div>
         </div>
     );
 }

 _renderNewPasswordInput() {
     return (
         <div className="form-group">
             <label className="control-label col-lg-3">Mật khẩu mới<span className="text-danger">*</span></label>
             <div className="col-lg-9">
                 <input 
                     ref={(input) => { this.newPasswordInput = input;}}
                     type="password"
                     name="password" 
                     id="password" 
                     className="form-control" 
                     required="required" 
                     placeholder="Mật khẩu gồm tối thiểu 6 ký tự" 
                     aria-required="true"
                 />
             </div>
         </div>
     );
 }

 _renderRepeatNewPasswordInput() {
     return (
         <div className="form-group">
             <label className="control-label col-lg-3">Nhập lại khẩu mới<span className="text-danger">*</span></label>
             <div className="col-lg-9">
                 <input 
                     ref={(input) => { this.repeatNewPasswordInput = input;}}
                     type="password"
                     name="password" 
                     id="password" 
                     className="form-control" 
                     required="required" 
                     placeholder="Xác nhận lại mật mới" 
                     aria-required="true"
                 />
             </div>
         </div>
     );
 }

 @autobind
 _submitHandler(evt) {
     evt.preventDefault();
     console.log('Đổi mật khẩu');

     let oldPassword = this.oldPasswordInput.value;
     let newPassword = this.newPasswordInput.value;
     let repeatNewPassword = this.repeatNewPasswordInput.value;

     if (newPassword !== repeatNewPassword) {
         let error = {
             code: -1,
             message: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
         };
         this._updatePasswordFailed(error);
         return;
     }

     if (newPassword.length < 6) {
         let error = {
             code: -1,
             message: 'Mật khẩu mới phải có ít nhất 6 ký tự',
         };
         this._updatePasswordFailed(error);
         return;
     }

     let {updatePassword} = this.props;
     updatePassword({
         oldPassword,
         newPassword
     });
 }

 _renderUpdateState() {
     let {error, success} = this.state;
     if (error) {
         return (
             <div className="has-error">
                 <span className="help-block">{error.message}</span>
             </div>
         );
     }

     if (success) {
         return (
             <div className="has-success">
                 <span className="help-block">Đổi mật khẩu thành công</span>
             </div>
         );
     }

     return null;
 }

 render() {
     return (
         <div className="panel panel-flat">
             <div className="panel-body">
                 <form 
                     className="form-horizontal form-validate-jquery"
                     noValidate="novalidate"
                     onSubmit={this._submitHandler}
                 >
                     <fieldset className="content-group">
                         <legend className="text-bold">Đổi mật khẩu</legend>
                         {this._renderOldPasswordInput()}
                         {this._renderNewPasswordInput()}
                         {this._renderRepeatNewPasswordInput()}
                         {this._renderUpdateState()}
                     </fieldset>
                     <div className="text-right">
                         <button 
                             className="btn btn-primary"
                         >
                                Xác nhận 
                             <i className="icon-arrow-right14 position-right"></i>
                         </button>
                     </div>
                 </form>
             </div>
         </div>
     );
        
 }
}

export default Password;