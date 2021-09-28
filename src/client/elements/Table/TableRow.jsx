import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableRow extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <tr>
                {this.props.children}
            </tr>
        ); 
    }
}

export default TableRow;