import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableHeaderColumn extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    }

    render() {
        let {style} = this.props;
        style = style || {};
        return (
            <th 
                className="sorting_disabled"
                style={style}
            >
                { this.props.children }
            </th>
        ); 
    }
}

export default TableHeaderColumn;