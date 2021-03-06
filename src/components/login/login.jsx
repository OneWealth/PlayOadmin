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
            date: "",
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    handleClick() {

    }
    onSubmit = evt => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        if (this.state.username === "") {
            document.getElementById("usernamerror").innerHTML = "Username Required";
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
                    this.props.history.push("/revenue");
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
        const { isLoading } = this.state;
        return (
            <div className="row">
                <div className="col-md-12 admin">
                    <div className="row main">
                        <div
                            className="col-md-4 adminlogin"
                            style={{ paddingBottom: "50px" }}
                        >
                            <div className="row">
                                <div className="col-md-12 logo">
                                    <h1>PlayO Admin</h1>
                                </div>
                                <div
                                    className="col-md-12 logheading"
                                    style={{ marginTop: "20px" }}
                                >
                                    <p>Enter your Username and password to access admin panel.</p>
                                </div>
                                <div className="col-md-12">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group col-md-12">
                                            <label>Enter UserName</label>
                                            <input
                                                type="text"
                                                value={this.state.username}
                                                onChange={evt => {
                                                    this.setState({ username: evt.target.value });
                                                }}
                                                placeholder="Enter UserName"
                                                className="form-control"
                                                id="username"
                                            />
                                            <label className="text-danger" id="usernamerror" />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter Password"
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
                                        </div>
                                        <p id="emailerror" className="text-danger" />
                                        <button className="btn btn-block col-md-3" type="submit"
                                            disabled={isLoading}
                                        >

                                            {isLoading ? "Loading…" : "login"}
                                        </button>
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
