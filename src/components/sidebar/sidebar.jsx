import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

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
      <div className="row">
        <div className="col-md-12 sidebar">
          <ul>
            <li>
              <Link to="/revenue">Home</Link>
            </li>
            <li>
              <Link to="/adduser">User</Link>
            </li>
            <li>
              <Link to="/venue">Venue</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/package">Package</Link>
            </li>
            <li>
              <Link to="/rfid">RFID</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
            <li>
              <Link to="/reportgeneration">Report</Link>
            </li>
            <li>
              <Link onClick={this.logout}>logout</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
