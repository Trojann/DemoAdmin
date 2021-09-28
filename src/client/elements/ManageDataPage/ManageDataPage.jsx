import React, {Component} from 'react';
import SweetAlert from 'sweetalert-react';
import ActionModal from '../ActionModal';

import {log} from 'utils';

const style = {
    label50: {
        width: 50
    }
};

class ManageDataPage extends Component {

    state = {
        showConfirm: false,
        willDeleteObject: null,
        result: {
            count: 0,
            page: 0,
            size: 15,
            items: []
        }
    }

    filter = {
        page: 0,
        size: 15
    }

    constructor(props) {
        super(props);
        this._onPageChange = this._onPageChange.bind(this);
        this._formatEditForm = this._formatEditForm.bind(this);
        this._requireConfirm = this._requireConfirm.bind(this);
        this._onConfirmDelete = this._onConfirmDelete.bind(this);
        this._onCancelDelete = this._onCancelDelete.bind(this);
        this._getData = this._getData.bind(this);
        this.showActionModal = this.showActionModal.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
    }

    componentWillMount() {
        this._getData();
    }

    _renderEditButton(value, rowData) {
        return (
            <span 
                className="label bg-info pointer" 
                style={style.label50}
                onClick={() => {
                    log.trace('editObject', rowData);
                    this.showActionModal(rowData);
                }}
            >
               Sửa
            </span>
        );
    }

    _renderDeleteButton(value, rowData) {
        return (
            <span 
                className="label bg-danger pointer"  
                style={{...style.label50, marginLeft: 5}}
                onClick={this._requireConfirm.bind(this, rowData)}
            >
               Xóa
            </span>
        );
    }

    showCreateModal() {
        this.showActionModal();
    }

    showActionModal(editObject = null) {
        this.setState({editObject}, () => {
            if (!this.actionModal) {
                throw new Error('ActionModal không tồn tại');
            }

            this.actionModal.show();
        });
    }

    _formatEditForm(value, rowData) {
        return (
            <div>
                {this._renderEditButton(value, rowData)}
                {this._renderDeleteButton(value, rowData)}
            </div>
        );
    }

    _requireConfirm(object) {
        this.setState({
            showConfirm: true,
            willDeleteObject: object
        });
    }

    _onConfirmDelete() {
        
    }

    _onCancelDelete() {
        this.setState({
            showConfirm: false,
            willDeleteObject: null
        });
    }

    _renderDataTable() {
        return null;
    }

    _renderDeleInfo() {
        return {
            title: 'title',
            text: 'text'
        };
    }

    _renderConfirmDeleteObject() {
        let {showConfirm, willDeleteObject} = this.state;
        let info = this._renderDeleInfo(willDeleteObject);

        if (!info) {
            info = {
                title: '',
                text: ''
            };
        }
        
        return (
            <SweetAlert
                type="warning"
                showConfirmButton={true}
                showCancelButton={true}
                show={showConfirm}
                confirmButtonText="Xác nhận"
                confirmButtonColor="red"

                cancelButtonText="Hủy"
                title={info.title}
                text={info.text}
                onConfirm={this._onConfirmDelete.bind(this, willDeleteObject)}
                onCancel={this._onCancelDelete}
            />
        );
    }

    _onPageChange(page) {
        this.filter = {
            ...this.filter,
            page
        };
        this._getData();
    }

    _getData() {

    }

    _renderActionModal() {
        let ActionForm = this.ActionForm;
        let {editObject} = this.state;

        if (!ActionForm) {
            return null;
        }

        return (
            <ActionModal
                ref={(c)=> {this.actionModal = c;}}
            >
                <ActionForm
                    onUpdate={() => {
                        this._getData();
                        this.actionModal.hide();
                    }} 
                    onCancel={() => {
                        this.actionModal.hide();
                    }}
                    editObject={editObject} 
                />
            </ActionModal>
        );
    }

    render() {
        
        return (
            <div>
                {this._renderDataTable()}
                {this._renderConfirmDeleteObject()}
                {this._renderActionModal()}
            </div>
        );
    }
}

export default ManageDataPage;