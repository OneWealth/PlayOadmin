import React, { Component } from "react";
import { Tab, Tabs, Col, Nav, Row } from "react-bootstrap";
import "./menu.css";
class Menu extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">add user</Nav.Link>
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
              <Nav.Link eventKey="sixth">Downloads</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="seventh">logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Menu;
