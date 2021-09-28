import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
    static propTypes = {
        labelSize: PropTypes.number,
        inputSize: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired
    }

    static defaultProps = {
        labelSize: 4,
        inputSize: 8,
        value: '',
        disabled: false
    }

    render() {
        let {labelSize, inputSize} = this.props;
        return (
            <div className="form-group">
                <label className={`control-label col-lg-${labelSize}`}>{this.props.label}</label>
                <div className={`col-lg-${inputSize}`}>
                    <input
                        className="form-control"
                        type="text"
                        name={this.props.name}
                        value={this.props.value || ''}
                        onChange={this.props.onChange}
                        disabled={this.props.disabled}
                    />
                </div>
            </div>
        );
    }
}

export default TextInput;