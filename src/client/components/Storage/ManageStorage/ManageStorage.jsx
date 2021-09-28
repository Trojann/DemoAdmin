import React from 'react';
import PropTypes from 'prop-types';
import {NavLink } from 'react-router-dom';
import autobind from 'autobind-decorator';
import {log, signal} from 'utils';
import {EVENT} from 'core';
import * as api from 'api';

import Table, {TableHeaderColumn} from 'elements/Table';
import {ManageDataPage} from 'components/Form';

import UploadFile from '../UploadFile';
import MakeDir from '../MakeDir';

class ManageSipAccount extends ManageDataPage {

    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object.isRequired,
        filePath: PropTypes.string.isRequired,
        paths: PropTypes.array.isRequired
    }

    static defaultProps = {
        type: 'storage'
    }

    state = {
        action: null,
        pathSelects: [],
        data: [
        ]
    }

    componentDidMount() {
        signal.on(EVENT.RELOAD_FILE_STAT, this._getPathStat);
        this._getPathStat();
    }

    componentWillUnmount() {
        signal.off(EVENT.RELOAD_FILE_STAT, this._getPathStat);
    }

    componentWillReceiveProps(nextProps) {
        let {filePath} = nextProps;
        if (filePath !== this.props.filePath) {
            this._getPathStat(filePath);
        }
    }

    @autobind
    _getPathStat(filePath) {
        let self = this;

        if (typeof filePath === 'undefined') {
            filePath = this.props.filePath;
        }
        
        api.getPathStat(filePath)
            .then(stats => {
                self.setState({
                    data: stats,
                    pathSelects: []
                });
            })
            .catch((error) => {
                log.error('resquest list file error', error);
                self.setState({
                    data: [],
                    pathSelects: []
                });
            });
    }

    _renderDeleInfo(sipAccount) {
        if (!sipAccount) {
            return null;
        }

        return {
            title: 'Xác nhận xóa tài khoản SIP',
            text: `Tên tài khoản: ${sipAccount.name}`
        };
    }

    _onConfirmDelete(sipAccount) {
        log.trace('<ManageSipAccount._onConfirmDelete>:', sipAccount);

        let {name} = sipAccount;
        let self = this;
        api.deleteSipWithName(name).then(() => {
            signal.trigger(EVENT.ALERT, {message: 'Xóa tài khoản sip thành công'});
            self.setState({
                showConfirm: false,
                willDeleteObject: false
            });
            self._getListSip();
        }).catch(error => {
            self.setState({error}); 
        });
    }

    @autobind
    _handleChangeChk(filePath) {
        let {pathSelects} = this.state;

        let index = pathSelects.indexOf(filePath);
        if (index === -1) {
            pathSelects.push(filePath);
        } else {
            pathSelects.splice(index, 1);
        }

        this.setState({
            pathSelects: [...pathSelects]
        });
    }

    @autobind
    _formatSelect(any, rowData) {
        let {filePath} = this.props;
        let {pathSelects} = this.state;
        let {name} = rowData;

        let realPath = `${filePath}/${name}`;

        let checked = '';
        if (pathSelects.indexOf(realPath) !== -1) {
            checked = 'checked';
        }

        return (
            <div className="checker border-primary-600 text-primary-800">
                <span className={checked}>
                    <input 
                        onChange={this._handleChangeChk.bind(null, `${filePath}/${name}`)}
                        type="checkbox" 
                        className="control-warning" 
                        checked={checked}
                    />
                </span>
            </div>
        );
    }

    @autobind
    _formatType(folder, rowData) {
        let className = folder ? 'icon-folder' : 'icon-file-empty2';
        let {pathname} = this.props.location;
        let {name} = rowData;

        if (folder) {
            return (
                <NavLink to={`${pathname}/${name}`} activeClassName="active"><i className={className}>{` ${name}`}</i></NavLink>
            );
        }
        
        return (
            <NavLink to={`${rowData.path}`} target="_blank"><i className={className}>{` ${name}`}</i></NavLink>
        );
    }

    _formatTime(mtime) {
        var d = new Date(mtime);
        return d.toLocaleString();
    }

    @autobind
    _deleteFile() {
        let {pathSelects} = this.state;

        if (pathSelects.length === 0) {
            return;
        }

        let self = this;
        api.deleteMultiFolder(pathSelects)
            .then(() => {
                self._getPathStat();
            }).catch(() => {
                self._getPathStat();
            });
    }

    @autobind
    _uploadFile() {
        this.setState({
            action: 'upload'
        });
    }

    @autobind
    _mkdir() {
        this.setState({
            action: 'mkdir'
        });
    }

    _renderDataTable() {
        let {data} = this.state;
        return (
            <Table
                data={data}
            >
                <TableHeaderColumn dataFormat={this._formatSelect}>Chọn</TableHeaderColumn>
                <TableHeaderColumn dataField='folder' dataFormat={this._formatType}>Tên</TableHeaderColumn>
                <TableHeaderColumn dataField='size'>Dung lượng</TableHeaderColumn>
                <TableHeaderColumn dataField='mtime' dataFormat={this._formatTime}>Chỉnh sửa lần cuối</TableHeaderColumn>
            </Table>
        );
    }

    _renderTool() {
        let {pathSelects} = this.state;
        return (
            <div style={{border: 'none', marginTop: 10}}>
                <ul className="breadcrumb-elements">
                    <li>
                        {pathSelects.length ? 
                            <button 
                                type="button" className="btn btn-danger btn-xxs position-left"
                                onClick={this._deleteFile}
                            >
                                <i className="icon-cross position-left"></i>
                                Xóa
                            </button> : null
                        }
                        <button 
                            type="button" className="btn btn-success btn-xxs position-left"
                            onClick={this._uploadFile}
                        >
                            <i className="icon-cloud-upload position-left"></i>
                            Tải lên
                        </button>
                        <button 
                            type="button" className="btn btn-info btn-xxs"
                            onClick={this._mkdir}
                        >
                            <i className="icon-folder-plus position-left"></i>
                            Tạo thư mục
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    _renderPaths() {
        let {paths} = this.props;

        return paths.map(({path, name}) => {
            return (
                <li key={path}>
                    <NavLink to={path}>{name}</NavLink>
                </li>
            );
        });
    }

    _renderBreadCrumb() {
        return (
            <div className="breadcrumb-line breadcrumb-line-component">
                <ul className="breadcrumb breadcrumb-caret">
                    <li>
                        <NavLink to="/storage"><i className="icon-home2 position-left"></i>Home</NavLink>
                    </li>
                    {this._renderPaths()}
                </ul>
            </div>
        );
    }

    /**
     * Show model tùy theo action
     * @return {Component}
     */
    _renderActionModel() {
        let {action} = this.state;

        if (!action) {
            return null;
        }

        let self = this;
        let {filePath} =  this.props;
        function resetAction() {
            self.setState({action: null});
        }

        switch(action) {
        case 'upload':
            return (
                <UploadFile onClose={resetAction} basePath={filePath}/>
            );
        case 'mkdir':
            return (
                <MakeDir onClose={resetAction} basePath={filePath}/>
            );
        }
    }

    render() {
        return (
            <div className="panel panel-flat">
                <div className="panel-body">
                    <fieldset className="content-group">
                        <legend className="text-bold">Quản lý file</legend>
                        {this._renderBreadCrumb()}
                        {this._renderTool()}
                        {super.render()}
                    </fieldset>
                </div>
                {this._renderActionModel()}
            </div>
        );  
    }
}

export default ManageSipAccount;