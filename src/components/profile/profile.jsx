import React, { Component } from "react";
import "./profile.css";
import profile from "../../assests/profile.png";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Mukesh Sharma",
            emailid: "bhardwaj.mukesh91@gmail.com"
        };
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12 profile">
                    <div className="row">
                        <div className="col-md-2">
                            <img
                                src={profile}
                                className="rounded-circle img-responsive"
                                alt="Admin"
                            />
                        </div>
                        <div className="col-md-7">
                            <h1> Welcome Back <span>{this.state.username} </span></h1>
                            <p> {this.state.emailid}</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
