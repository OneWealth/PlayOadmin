import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import {Row, Col} from 'react-bootstrap';

class SideBar extends Component {
    constructor() {
        super();
        this.state = {};
    }

    logout = async () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    render() {
        return (
            <Row>
                <Col md={12} className="sidebar">       
                   
                    <ul>
                        <li>
                            <NavLink exact={true} activeClassName='is-active' to="/revenue">Home</NavLink>
                        </li>                       
                        <li>
                            <NavLink activeClassName='is-active' to="/venue">Venue</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/adduser">User</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/product">Product</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/package">Package</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/holidays">Holidays</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/rfid">RFID</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/wallet">Wallet</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/payment">Payment</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to="/reportgeneration">Report</NavLink>
                        </li>
                        <li>
                            <NavLink to="" onClick={this.logout}>logout</NavLink>
                        </li>
                    </ul>
                </Col>
            </Row>
        );
    }
}

export default SideBar;
