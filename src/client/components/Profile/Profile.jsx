import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {EVENT} from '../../core';
import {log, signal} from '../../utils';

class Profile extends Component {

    static propTypes = {
        updateProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    }

    state = {
        error: null,
        editing: false // State chỉ trạng thái đang edit info hay ko
    }

    componentDidMount() {
        signal.on(EVENT.USER_UPDATE_PROFILE_FAILED, this._updateProfileFailed);
        signal.on(EVENT.USER_UPDATE_PROFILE_SUCCESS, this._updateProfileSuccess);
    }

    componentWillUnmount() {
        signal.off(EVENT.USER_UPDATE_PROFILE_FAILED, this._updateProfileFailed);
        signal.off(EVENT.USER_UPDATE_PROFILE_SUCCESS, this._updateProfileSuccess);
    }

    @autobind
    _updateProfileFailed(error) {
        log.info('<Profile._updateProfileFailed>');
        this.setState({error});
    }

    @autobind
    _updateProfileSuccess() {
        this.setState({error: null, editing: false});
    }

    _renderFullNameInput() {
        let {profile} = this.props;
        let {fullname} = profile;
        return (
            <div className="form-group">
                <label className="control-label col-lg-3">Họ tên<span className="text-danger">*</span></label>
                <div className="col-lg-9">
                    <input 
                        defaultValue={fullname}
                        ref={(input) => { this.fullnameInput = input;}}
                        type="text"
                        name="fullname"
                        className="form-control" 
                        required="required" 
                        aria-required="true"
                    />
                </div>
            </div>
        );
    }

    _renderPhoneInput() {
        let {profile} = this.props;
        let {phonenumber} = profile;
        return (
            <div className="form-group">
                <label className="control-label col-lg-3">Số điện thoại</label>
                <div className="col-lg-9">
                    <input 
                        ref={(input) => { this.phoneInput = input;}}
                        defaultValue={phonenumber}
                        type="text"
                        name="fullname"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }

    _renderEmailInput() {
        let {profile} = this.props;
        let {email} = profile;
        return (
            <div className="form-group">
                <label className="control-label col-lg-3">Email</label>
                <div className="col-lg-9">
                    <input 
                        ref={(input) => { this.emailInput = input;}}
                        defaultValue={email}
                        type="text"
                        name="fullname"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }

 @autobind
    _submitHandler(evt) {
        evt.preventDefault();
        console.log('Cập nhật profile');

        let fullname = this.fullnameInput.value;
        let phonenumber = this.phoneInput.value;
        let email = this.emailInput.value;

        let {updateProfile} = this.props;
        updateProfile({
            fullname,
            phonenumber,
            email
        });
    }

 _renderUpdateState() {
     let {error} = this.state;
     if (error) {
         return (
             <div className="has-error">
                 <span className="help-block">{error.message}</span>
             </div>
         );
     }

     return null;
 }

 _renderProfileEditForm() {
     let {editing} = this.state;
     if (!editing) {
         return null;
     }

     return (
         <form 
             className="form-horizontal form-validate-jquery"
             noValidate="novalidate"
             onSubmit={this._submitHandler}
         >
             <fieldset className="content-group">
                 {this._renderFullNameInput()}
                 {this._renderPhoneInput()}
                 {this._renderEmailInput()}
                 {this._renderUpdateState()}
             </fieldset>
             <div className="text-right">
                 <button 
                     className="btn btn-primary"
                     type="submit"
                 >
                        Lưu Lại
                     <i className="icon-arrow-right14 position-right"></i>
                 </button>
                 <button 
                     className="btn btn-default"
                     type="reset"
                     style={{
                         marginLeft: 5
                     }}
                     onClick={this._changeEditState.bind(this, false)}
                 >
                        Hủy
                     <i className="icon-cross2 position-right"></i>
                 </button>
             </div>
         </form>
     );
 }

 _changeEditState(editing) {
     this.setState({
         editing
     });
 }

 _renderProfileInfo() {
     let {editing} = this.state;
     if (editing) {
         return null;
     }

     let {profile} = this.props;
     let {
         fullname,
         phonenumber,
         email
     } = profile;

     return (
         <div>
             <div className="row">
                 <div className="col-sm-6"> 
                     <div className="form-group mt-5">
                         <label className="text-semibold">Họ tên:</label>
                         <span className="pull-right-sm">{fullname}</span>
                     </div>
                     <div className="form-group">
                         <label className="text-semibold">Số điện thoại:</label>
                         <span className="pull-right-sm">{phonenumber}</span>
                     </div>
                     <div className="form-group">
                         <label className="text-semibold">Email:</label>
                         <span className="pull-right-sm"><a>{email}</a></span>
                     </div>
                 </div>
             </div>
             <div className="text-right">
                 <button 
                     onClick={this._changeEditState.bind(this, true)}
                     className="btn bg-success-400"
                 >
                        Chỉnh sửa
                 </button>
             </div>
         </div>
     );
 }

 render() {
     return (
         <div className="panel panel-flat">
             <div className="panel-body">
                 <fieldset className="content-group">
                     <legend className="text-bold">Thông tin cá nhân</legend>
                     {this._renderProfileInfo()}
                     {this._renderProfileEditForm()}
                 </fieldset>
             </div>
         </div>
     );
        
 }
}

export default Profile;