import React, { Component } from "react";
import Profile from "../profile/profile";
import "./rightdashboard.css";
class RightDashboard extends Component {
    state = {};
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Profile />
                    {/* <Revenue /> */}
                </div>
            </div>
        );
    }
}

export default RightDashboard;
