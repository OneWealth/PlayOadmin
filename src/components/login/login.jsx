import React, { Component } from "react";

import "./login.css";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class AdminLogin extends Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            password: "",
            RequestedAt: "",
            date: ""
        };
    }

    onSubmit = evt => {
        evt.preventDefault();
        if (this.state.username === "") {
            document.getElementById("usernamerror").innerHTML = "Email Required";
            document.getElementById("username").style.borderColor = "red";
        } else if (this.state.password === "") {
            document.getElementById("usernamerror").innerHTML = "";
            document.getElementById("passworderror").innerHTML = "Password Required";
            document.getElementById("password").style.borderColor = "red";
        } else {
            document.getElementById("usernamerror").innerHTML = "";
            document.getElementById("passworderror").innerHTML = "";
            this.props
                .verifyadmin({
                    username: this.state.username,
                    password: this.state.password,
                    RequestedAt: this.state.RequestedAt
                })
                .then(() => {
                    this.props.history.push("/profile");

                    return;
                });
            return;
        }
    };

    componentDidMount() {
        var today = new Date();
        var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        document.getElementById("RequestedAt").value = date;
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12 admin">
                    <div className="circle" />
                    <div className="row">
                        <div className="col-md-4 adminlogin">
                            <div className="row">
                                <div className="col-md-12 logo">
                                    <h1>playo admin</h1>
                                </div>
                                <div className="col-md-12 logheading">
                                    <h4>sign in</h4>
                                    <p>
                                        Enter your email address and password to access admin panel.
                  </p>
                                </div>
                                <div className="col-md-12">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group col-md-12">
                                            <label>email id</label>
                                            <input
                                                type="email"
                                                value={this.state.username}
                                                onChange={evt => {
                                                    this.setState({ username: evt.target.value });
                                                }}
                                                placeholder="Enter Username"
                                                className="form-control"
                                                id="username"
                                            />
                                            <label className="text-danger" id="usernamerror" />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>password</label>
                                            <input
                                                type="password"
                                                placeholder="enter password"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={evt => {
                                                    this.setState({ password: evt.target.value });
                                                }}
                                                id="password"
                                            />
                                            <label className="text-danger" id="passworderror" />
                                        </div>
                                        <div className="form-group  datehide">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.RequestedAt}
                                                onChange={evt => {
                                                    this.setState({ RequestedAt: evt.target.value });
                                                }}
                                                id="RequestedAt"
                                                disabled
                                            />

                                            {/* <label className="text-danger" id="passworderror"></label> */}
                                        </div>
                                        <p id="emailerror" className="text-danger" />
                                        <button className="btn btn-block col-md-3" type="submit">
                                            login
                    </button>

                                        <div className="col-md-12 forgot">
                                            <a href="#">forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    verifyadmin: v => dispatch(actions.verifyadmin(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdminLogin)
);
