import React from 'react';
import autobind from 'autobind-decorator';
import _ from 'underscore';

import Table, {TableHeaderColumn} from 'elements/Table';
import ManageDataPage from 'elements/ManageDataPage';

import {log, signal} from 'utils';
import {EVENT} from 'core';
import * as api from 'api';

import AccountActionForm from '../AccountActionForm';

const style = {
    label50: {
        width: 50
    }
};

class ManageAccount extends ManageDataPage {

    ActionForm = AccountActionForm;

    _getData() {
        let self = this;
        api.getListAccount(this.filter).then(result => {
            self.setState({
                result
            });
        });

        api.getListAccountGroup().then(({items}) => {
            self.setState({accountgroups: items});
        });
    }

    _renderDeleInfo(account) {
        if (!account) {
            return null;
        }

        return {
            title: 'Xác nhận xóa tài khoản',
            text: `Tài khoản: ${account.username}`
        };
    }

    _onConfirmDelete(account) {
        log.trace('<ManageAccount._onConfirmDelete>:', account);

        let {_id} = account;
        let self = this;
        api.deleteAccount(_id).then(() => {
            signal.trigger(EVENT.ALERT, {message: 'Xóa tài khoản thành công'});
            self.setState({
                showConfirm: false,
                willDeleteObject: false
            });
            self._getData();
        }).catch(error => {
            self.setState({error}); 
        });
    }

    @autobind
    _formatAccountGroup(group) {
        let {accountgroups} = this.state;

        if (!accountgroups || accountgroups.length === 0) {
            return null;
        }

        let accountgroup = _.find(accountgroups, function(accountgroup) {
            return accountgroup._id === group;
        });

        if (!accountgroup) {
            return null;
        }

        return accountgroup.name;
    }

    _formatActive(active) {
        let state = active ? <span 
            className="label label-success" 
            style={style.label50}
        >
                Có
        </span> 
            : <span 
                className="label label-default" 
                style={style.label50}
            >
                Không
            </span>;

        return state;
    }

    _renderDataTable() {
        let {result} = this.state;
        return (
            <Table
                data={result.items}
                page={result.page}
                count={result.count}
                sizePerPage={result.size}
                onPageChange={this.onPageChange}
            >
                <TableHeaderColumn dataField='username'>Tên đăng nhập</TableHeaderColumn>
                <TableHeaderColumn dataField='group' dataFormat={this._formatAccountGroup}>Nhóm</TableHeaderColumn>
                <TableHeaderColumn dataField='fullname'>Họ tên</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>SĐT</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='active' dataFormat={this._formatActive}>Hoạt động</TableHeaderColumn>
                <TableHeaderColumn dataFormat={this._formatEditForm}>
                    <span 
                        className="label bg-teal pointer"
                        onClick={this.showCreateModal}
                    >
                        Tạo mới
                    </span>
                </TableHeaderColumn>
            </Table>
        );
    }

    render() {
        return (
            <div className="panel panel-flat">
                <div className="panel-body">
                    <fieldset className="content-group">
                        <legend className="text-bold">Danh sách tài khoản</legend>
                        {super.render()}
                    </fieldset>
                </div>
            </div>
        );  
    }
}

export default ManageAccount;