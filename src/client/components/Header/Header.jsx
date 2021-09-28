import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink } from 'react-router-dom';

class Header extends Component {

    static propTypes = {
        history: PropTypes.object,
        logout: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        viewer: PropTypes.object.isRequired
    }

    _renderManageSystemMenu() {
        return (
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">Quản trị hệ thống <span className="caret"></span></a>
                <ul className="dropdown-menu dropdown-menu-left width-250">
                    <li><NavLink to="/group" activeClassName="active"><i className="icon-collaboration"></i>Quản lý nhóm tài khoản</NavLink></li>
                    <li><NavLink to="/account" activeClassName="active"><i className="icon-users"></i>Quản lý tài khoản</NavLink></li>
                </ul>
            </li>
        );
    }

    /*_renderNavBarMenu() {
        return (
            <ul className="nav navbar-nav navbar-nav-material">
                {this.props.viewer.menuItems.map(function(item,key){
                    return (
                        <li key={key} className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">{item.name} <span className="caret"></span></a>
                            <ul className="dropdown-menu dropdown-menu-left width-250">
                                {
                                    item.items.map(function(subItem,subKey){
                                        return(<li key={subKey}><NavLink to={subItem.path} activeClassName="active">{subItem.name}</NavLink></li>);
                                    })
                                }
                            </ul>
                        </li>
                    );
                })}
            </ul>
        );
    }*/

    _renderNavBarMenu() {
        return (
            <ul className="nav navbar-nav navbar-nav-material">
                {this._renderManageSystemMenu()}
            </ul>
        );
    }

    _renderAccountMenu() {
        let {viewer} = this.props;
        return (
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">{viewer.username}<span className="caret"></span></a>
                <ul className="dropdown-menu dropdown-menu-right">
                    <li><NavLink to="/profile" activeClassName="active"><i className="icon-user-plus"></i>Sửa thông tin liên hệ</NavLink></li>
                    <li><NavLink to="/password" activeClassName="active"><i className="icon-user-lock"></i>Đổi mật khẩu</NavLink></li>
                    <li
                        onClick={this.props.logout}
                    >
                        <a><i className="icon-switch2"></i> Đăng xuất</a>
                    </li>
                </ul>
            </li>
        );
    }

    _renderNavBarRightMenu() {
        return (
            <ul className="nav navbar-nav navbar-nav-material navbar-right">
                {this._renderAccountMenu()}
            </ul>
        );
    }

    render() {
        return (
            <div 
                data-component="Header"
                className="page-header page-header-inverse"
            >
                <div className="navbar navbar-inverse navbar-transparent">
                    <div className="navbar-collapse">
                        {this._renderNavBarMenu()}
                        {this._renderNavBarRightMenu()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;