import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {log} from 'utils';

import Pagination from 'react-bootstrap/lib/Pagination';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
    static propTypes = {
        onPageChange: PropTypes.func,
        data: PropTypes.array,
        children: PropTypes.node,
        count: PropTypes.number,
        page: PropTypes.number,
        sizePerPage: PropTypes.number
    }

    static defaultProps = {
        page: 1,
        count: 0,
        sizePerPage: 20
    }

    state = {
        page: this.props.page + 1
    }

    componentWillReceiveProps(nextProps) {
        let {page, data} = nextProps;
        let currentPage = this.state.page;

        let newPage = page + 1;
        if (newPage !== currentPage) {
            this.setState({
                page: newPage
            });
        }

        if (newPage > 1 && data.length ===0) {
            let cb = this.props.onPageChange || function() {};
            this.setState({page: 1});
            cb(0);
        }
    }

    /**
     * Lấy mô tả của tất cả các column
     * @return {[type]} [description]
     */
    getColumnsDescription({children}) {
        return React.Children.map(children, (column, i) => {
            if (column === null || column === undefined) {
                // Return null for empty objects
                return null;
            }

            const columnDescription = this.getColumnDescription(column);
            columnDescription.index = i;
            return columnDescription; 
        });
    }

    /**
     * Lấy mô tả của một column
     * @param  {Object} column
     * @return {Object}
     */
    getColumnDescription(column) {
        let columnDescription = {
            name: column.props.dataField,
            format: column.props.dataFormat,
            style: column.props.style || {}
        };

        return columnDescription;
    }

    _renderHeader() {
        return (
            <TableHeader>
                { this.props.children }
            </TableHeader>
        );
    }

    _renderBody() {
        let {data} = this.props;
        const columns = this.getColumnsDescription(this.props);

        return (
            <TableBody
                data={data}
                columns={columns}
            />
        );
    }

    @autobind
    handleSelect(eventKey) {
        log.trace('<Table> select page', eventKey);
        let cb = this.props.onPageChange || function() {};
        this.setState({page: eventKey});
        cb(eventKey - 1);
    }

    _renderPagination() {
        let {page} = this.state;
        let {data, count, sizePerPage} = this.props;

        if (count <= data.length) {
            return null;
        } 

        let items = Math.ceil(count/sizePerPage);

        let options = {
            first: true,
            last: true,
            prev: true,
            next: true
        };

        if (items <= 5) {
            options.first = false;
            options.last = false;
            options.prev = false;
            options.next = false;
        }

        return (
            <div
                style={{
                    float: 'right',
                    margin: '20px 0'
                }}
            >
                <Pagination
                    {...options}
                    ellipsis
                    boundaryLinks
                    items={items}
                    maxButtons={4}
                    activePage={page}
                    onSelect={this.handleSelect} 
                />
            </div>
        );
    }

    render() {
        return (
            <div className="dataTables_wrapper no-footer">
                <div className="datatable-scroll">
                    <table className="table datatable-show-all dataTable no-footer">
                        {this._renderHeader()}
                        {this._renderBody()}
                    </table>

                </div>
                {this._renderPagination()}
            </div>
        );
    }
}

export default Table;