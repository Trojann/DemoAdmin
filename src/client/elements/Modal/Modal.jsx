import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Map} from 'immutable';

class Modal extends Component {

    static propTypes = {
        classSize: PropTypes.oneOf(['modal-xs', 'modal-sm', 'modal-lg', 'modal-full']),
        children: PropTypes.node,
    }

    static defaultProps = {
        classSize: 'modal-lg'
    }

    state = {
        isShow: false
    }

    constructor(props) {
        super(props);

        let attribute = Map();
        attribute = attribute.set('style', {display: 'none'});
        attribute = attribute.set('className', 'modal fade');
        this.state.attribute = attribute;
    }

    show() {
        let {attribute} = this.state;
        attribute = attribute.set('style', {display: 'block', paddingRight: '17px'});

        this.setState({attribute, isShow: true}, () => {
            setTimeout(() => {
                attribute = attribute.set('className', 'modal fade in');
                this.setState({attribute});
            }, 0);
        });
    }

    hide() {
        let {attribute} = this.state;
        attribute = attribute.set('className', 'modal fade');
        this.setState({attribute}, () => {
            setTimeout(() => {
                attribute = attribute.set('style', {display: 'none'});
                this.setState({attribute, isShow: false});
            }, 400);
        });
    }

    render() {
        let {attribute, isShow} = this.state;
        return (
            <div 
                {...attribute.toJS()}
            >
                <div className={`modal-dialog ${this.props.classSize || ''}`}>
                    <div className="modal-content">
                        {isShow ? this.props.children : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;