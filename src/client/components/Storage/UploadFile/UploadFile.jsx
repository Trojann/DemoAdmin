import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import {signal} from 'utils';
import {EVENT} from 'core';
import * as api from 'api';

import {RemoteResourceForm} from 'components/Form';

class UploadFile extends RemoteResourceForm {

    static propTypes = {
        history: PropTypes.object,
        info: PropTypes.object,
        classSize: PropTypes.string,
        onClose: PropTypes.func.isRequired,
        basePath: PropTypes.string.isRequired
    }
    
    static defaultProps = {
        info: {
            headerTitle: 'Upload file',
        },
        classSize: ''
    }

    @autobind
    onDrop(files) {
        let {basePath} = this.props;
        let file = files[0];
        let self = this;
        api.uploadFile(basePath, file)
            .then(() => {
                signal.trigger(EVENT.ALERT, {message: 'Upload file thành công'});
                signal.trigger(EVENT.RELOAD_FILE_STAT);
                self.close();
            }).catch(() => {
                signal.trigger(EVENT.ALERT, {message: 'Upload file thất bại', type: 'error'});
                signal.trigger(EVENT.RELOAD_FILE_STAT);
            });
    }

    _renderInputForm() {
        return (
            <form 
                className="form-horizontal form-validate-jquery"
                noValidate="novalidate"
            >
                <fieldset className="content-group">
                    <div className="row"> 
                        <section>
                            <div className="dropzone dz-clickable">
                                <Dropzone onDrop={this.onDrop.bind(this)} style={{}}>
                                    <div className="dz-default dz-message"><span>Thả file để upload <span>hoặc CLICK để chọn file</span></span></div>
                                </Dropzone>
                            </div>
                        </section>
                    </div> 
                </fieldset>
            </form>
        );
    }

    _renderFooter() {
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-link" data-dismiss="modal"
                    onClick={this.close}
                >Đóng</button>
            </div>
        );
    }
}

export default UploadFile;