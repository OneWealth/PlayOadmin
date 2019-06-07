import React, { Component } from "react";
import "./profile.css";
import profile from "../../assests/profile.png";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "admin name",
            des:
                "Stay positive and happy. Work hard and don't give up hope. Be open to criticism and keep learning. Surround yourself with happy, warm and genuine people."
        };
    }


    // async  componentDidMount() {
    //     if (!localStorage.getItem("token")) {
    //         this.props.history.push({
    //             pathname: '/',
    //         });
    //     }

    // }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 profile">
                    <div className="row">
                        <div className="col-md-2">
                            <img
                                src={profile}
                                class="rounded-circle img-responsive"
                                alt="Admin"
                            />
                        </div>
                        <div className="col-md-7">
                            <h1> {this.state.name} </h1>
                            <p> {this.state.des}</p>
                        </div>
                        <div className="col-md-3">
                            <ul>
                                <li>
                                    <i class="fa fa-envelope" aria-hidden="true" />{" "}
                                    playo@plauo.com
                </li>
                                <li>
                                    <i class="fa fa-phone" aria-hidden="true" />
                                    1234567890
                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
