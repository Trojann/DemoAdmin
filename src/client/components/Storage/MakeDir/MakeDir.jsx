import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import {log, signal} from 'utils';
import {EVENT} from 'core';
import * as api from 'api';

import {RemoteResourceForm} from 'components/Form';

class MakeDir extends RemoteResourceForm {

    static propTypes = {
        history: PropTypes.object,
        info: PropTypes.object,
        classSize: PropTypes.string,
        onClose: PropTypes.func.isRequired,
        basePath: PropTypes.string.isRequired
    }
    
    static defaultProps = {
        info: {
            headerTitle: 'Tạo thư mục mới',
        },
        classSize: ''
    }

    _renderInputForm() {
        return (
            <form 
                className="form-horizontal form-validate-jquery"
                noValidate="novalidate"
            >
                <fieldset className="content-group">
                    <div className="row"> 
                        {this._renderFolderNameInput()}
                    </div> 
                </fieldset>
            </form>
        );
    }

    _renderFolderNameInput() {
        return (
            <div className="form-group" style={{marginTop: 20}}>
                <label className="control-label col-lg-2">Tên thư mục:</label>
                <div className="col-lg-6">
                    <input 
                        ref={(input) => { this.folderNameInput = input;}}
                        type="text"
                        name="folder-name"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }

    @autobind
    onSave() {
        let {basePath} = this.props;
        let folderName = this.folderNameInput.value;
        log.trace(`<${this.constructor.name}.onSave>`);
        
        if (!folderName) {
            this.setState({
                error: {
                    code: -1,
                    message: 'Chưa nhập tên folder'
                }
            });
        }

        let self = this;
        api.createFolder(`${basePath}/${folderName}`)
            .then(() => {
                signal.trigger(EVENT.ALERT, {message: 'Tạo thư mục thành công'});
                signal.trigger(EVENT.RELOAD_FILE_STAT);
                self.close();
            }).catch(error=> {
                self.setState({error});
            });
    }
}

export default MakeDir;