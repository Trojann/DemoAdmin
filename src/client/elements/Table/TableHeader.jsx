import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <thead>
                <tr role="row">
                    {this.props.children}
                </tr>
            </thead>
        ); 
    }
}

export default TableHeader;