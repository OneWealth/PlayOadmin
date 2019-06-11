import React, { Component } from "react";
import { Tab, Tabs, Col, Nav, Row } from "react-bootstrap";
import "./menu.css";
class Menu extends Component {
    constructor(props) {
        super(props);
    }

    logout = async () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12 menu">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">user</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">venue</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="forth">Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fifth">Packages</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="seventh">Mode of Payment</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="eight">RFID</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sixth">Reports</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="ninth" onClick={this.logout}>
                                logout
                        </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Menu;
