import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PassWordInput extends Component {
    static propTypes = {
        autoComplete: PropTypes.string,
        labelSize: PropTypes.number,
        inputSize: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired
    }

    static defaultProps = {
        autoComplete: 'new-password',
        labelSize: 4,
        inputSize: 8,
        value: '',
        disabled: false
    }

    render() {
        let {labelSize, inputSize, autoComplete} = this.props;
        return (
            <div className="form-group">
                <label className={`control-label col-lg-${labelSize}`}>{this.props.label}</label>
                <div className={`col-lg-${inputSize}`}>
                    <input
                        className="form-control"
                        type="password"
                        name={this.props.name}
                        value={this.props.value || ''}
                        onChange={this.props.onChange}
                        disabled={this.props.disabled}
                        autoComplete={autoComplete}
                    />
                </div>
            </div>
        );
    }
}

export default PassWordInput;