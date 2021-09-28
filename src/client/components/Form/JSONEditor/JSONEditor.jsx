import React, {Component} from 'react';
import PropTypes from 'prop-types';
import jsoneditor from 'jsoneditor';

import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditor.css';

class JSONEditor extends Component {

    static propTypes = {
        defaultValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        options: PropTypes.object
    }

    componentDidMount() {
        let {defaultValue, options} = this.props;
        let container = this.wrapper;
        options = options || {mode: 'tree'};
        let editor = this.editor_ = new jsoneditor(container, options);

        if (defaultValue) {
            editor.set(defaultValue);
        }
    }

    value(value) {
        if (value) {
            this.editor_.set(value);
        } else {
            return this.editor_.get();
        }
    }

    render() {
        return (
            <div
                ref={(wrapper) => { this.wrapper = wrapper;}}
            >

            </div>
        );
    }
}

export default JSONEditor;