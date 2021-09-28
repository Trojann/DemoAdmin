import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableColumn extends Component {
    static propTypes = {
        row: PropTypes.any,
        fieldValue: PropTypes.any,
        format: PropTypes.any
    }

    render() {

        let {fieldValue, format} = this.props;

        let ele = format ? format(fieldValue) : fieldValue;
        return (
            <td>
                {ele}
            </td>
        ); 
    }
}

export default TableColumn;