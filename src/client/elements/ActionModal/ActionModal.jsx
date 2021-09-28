import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

class ActionModal extends Component {

    static propTypes = {
        classSize: PropTypes.oneOf(['modal-xs', 'modal-sm', 'modal-lg', 'modal-full']),
        children: PropTypes.node,
    }

    static defaultProps = {
        classSize: 'modal-lg'
    }

    renderHeader() {
        return null;
    }

    show() {
        this.modal_.show();
    }

    hide() {
        this.modal_.hide();
    }

    render() {
        let {classSize} = this.props;
        return (
            <Modal classSize={classSize} ref={(c) => {this.modal_ = c;}}>
                <div className="modal-header bg-info">
                    <button 
                        type="button" 
                        className="close" 
                        aria-label="Close"
                        onClick={()=> {
                            this.modal_.hide();
                        }}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                    {this.renderHeader()}
                </div>
                {this.props.children }
            </Modal>
        );
    }
}

export default ActionModal;