import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faGraduationCap,
    faUserGraduate,
    faUserTie,
    faUserSecret
} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { isAuthenticated, user, type } = this.props.session;

        let auth, icon, username, drop;

        if (type === "student") {
            icon = <FontAwesomeIcon icon={faUserGraduate}/>;
            username = user.name;
        } else if (type === "instructor") {
            icon = <FontAwesomeIcon icon={faUserTie}/>;
            username = user.name;
        } else if (type === "admin") {
            username = user.name;
            icon = <FontAwesomeIcon icon={faUserSecret}/>;
        }

        if (!isAuthenticated) {
            auth = (
                <React.Fragment>
                    <NavItem>
                        <Link
                            to="/login"
                            activeClassName="active"
                            className="nav-link mx-2">
                            <FontAwesomeIcon icon={faSignInAlt}/>
                            &ensp;Sign In
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/register" className="nav-link mx-2">
                            <FontAwesomeIcon icon={faUserPlus}/>
                            &ensp;Sign Up
                        </Link>
                    </NavItem>
                </React.Fragment>
            );

            drop = "";

        } else if (isAuthenticated) {
            auth = (
                <React.Fragment>
                    <NavItem>
                        <Link to="/profile" className="nav-link mx-2">
                            <span className="text-success">{icon}&ensp;
                                {type.toUpperCase()}</span> | <span className="text-primary">{username}</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            to="#"
                            onClick={this.props.logout}
                            activeClassName="active"
                            className="nav-link mx-2">
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                            &ensp;Sign Out
                        </Link>
                    </NavItem>
                </React.Fragment>
            );

            drop = (<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>Assignments</DropdownItem>
                    <DropdownItem>Instructors</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>
                        <Link exact to="/admin" className="navbar-brand">
                            <FontAwesomeIcon
                                icon={faUserSecret}
                            />
                            &ensp;Admin
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>);

        }

        return (
            <Navbar color="light" light expand="md" className="navBar">
                <Link exact to="/" className="navbar-brand">
                    UniHub&ensp;
                    <FontAwesomeIcon
                        style={{ transform: "scale(-1, 1)", color: "rgba(0, 128, 0, 1)" }}
                        icon={faGraduationCap}
                    />
                </Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {auth}
                        {drop}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
