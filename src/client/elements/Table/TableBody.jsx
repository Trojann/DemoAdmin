import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TableColumn from './TableColumn';
import TableRow from './TableRow';

class TableBody extends Component {
    static propTypes = {
        data: PropTypes.array,
        columns: PropTypes.array
    }

    _renderTableColum(rowData, column, key) {
        let name = column.name || '';
        let names = name.split('.');

        let fieldValue = rowData;
        while(names.length) {
            let _name = names.shift();
            fieldValue = fieldValue[_name];
        }

        const format = column.format ? function(value) {
            return column.format(value, rowData);
        } : false;

        return (
            <TableColumn
                key={key}
                row={rowData}
                fieldValue={fieldValue}
                format={ column.format ? format : false }
            />
        );
    }

    _renderTableRows() {
        let self = this;
        let {data, columns} = this.props;

        let tableRows = data.map((rowData, r) => {
            const tableColumns = columns.map(function(column, i) {
                return self._renderTableColum(rowData, column, i);
            });

            return (
                <TableRow
                    key={r}
                >
                    {tableColumns}
                </TableRow>
            );
        });

        return tableRows;
    }

    render() {
        return (
            <tbody>
                {this._renderTableRows()}
            </tbody>
        ); 
    }
}

export default TableBody;