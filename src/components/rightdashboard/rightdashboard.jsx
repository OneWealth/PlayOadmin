import React, { Component } from "react";
import Revenue from "../revenue/revenue";
import "./rightdashboard.css";
class RightDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
  }
  render() {
    return (
      <div className="row mainbox">
        <div className="col-md-11">
          {/* <Profile /> */}
          <Revenue />
        </div>
      </div>
    );
  }
}

export default RightDashboard;
