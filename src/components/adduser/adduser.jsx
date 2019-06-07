import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class AddUser extends Component {
    constructor(props) {
        super();
        this.state = {
            username: null,
            password: null,
            confirmpassword: null,
            emailid: null,
            venueid: null,
            userName: "",
            venueName: "",
            emailId: "",
        };
    }

    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        console.log(this.props.alluser.getuser.items)
        let allusers = [];
        for (var i = 0; i < allusers; i++) {

        }
    }


    getvenueuser = async (evt) => {
        evt.preventDefault();
        await this.props.getvenueuser({
            venueID: this.state.venueid,
        }).then(() => {

            document.getElementById("apiresult").style.display = "inline-table"
        });
    };


    onSubmit = async (evt) => {
        evt.preventDefault();
        await this.props.playosuer({
            Username: this.state.username,
            Password: this.state.password,
            Email: this.state.emailid,
            VenueId: this.state.venueid
        }).then(() => {
            this.state.username = "";
            this.state.password = "";
            this.state.emailid = "";
            this.state.confirmpassword = "";
            // this.props.history.push("");
            return;
        });
    };

    show = async (evt) => {
        document.getElementById("addnew").style.display = "block";
        document.getElementById("apiresult").style.display = "none";
    };

    unshow = async (evt) => {
        document.getElementById("apiresult").style.display = "inline-table";
        document.getElementById("addnew").style.display = "none";
    };


    render() {
        return (
            <div className="row mg-top">
                <div className="col-md-12 main-heading">
                    <h2>user</h2>
                </div>


                <div className="col-md-7 offset-md-2">
                    <div className="col-md-12 add">
                        <a href="#" onClick={this.show}>+ add user</a>
                    </div>
                    <form onSubmit={this.getvenueuser}>
                        <div className="row venuetbl">
                            <div className="col-md-7">
                                <div className="row sl-3">
                                    <select className="col-md-12" value={this.state.venueid}
                                        onChange={evt => {
                                            this.setState({ venueid: evt.target.value });
                                        }}>
                                        <option selected>Choose Venue Name </option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            <option value={allvanues.venueID} >{allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-5 text-right">
                                <button class="btn btn-primary btn-block" >
                                    Get Users
                                </button>
                            </div>
                        </div>
                    </form>

                    <table className="table  tbl" id="apiresult" style={{ display: "none" }}>
                        <thead>
                            <tr>
                                <th>user name</th>
                                <th>venue name</th>
                                <th>email id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.alluser.getuser.items && this.props.alluser.getuser.items && this.props.alluser.getuser.items.map((allusers, index) => (
                                <tr>
                                    <td>{allusers.userName}</td>
                                    <td>{allusers.venueName}</td>
                                    <td>{allusers.emailId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <form className="frm" onSubmit={this.onSubmit} style={{ display: "none" }} id="addnew">
                        <h2>new user</h2>
                        <div className="row sl-3">
                            <label>venue Name</label>
                            <select className="col-md-12" value={this.state.venueid}
                                onChange={evt => {
                                    this.setState({ venueid: evt.target.value });
                                }}>
                                <option selected>Choose Venue Name </option>
                                {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                    <option value={allvanues.venueID}>{allvanues.name}</option>
                                ))}
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="username">username</label>
                            <input
                                type="text"
                                class="form-control"
                                id="username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={evt => {
                                    this.setState({ username: evt.target.value });
                                }}
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={evt => {
                                    this.setState({ password: evt.target.value });
                                }}
                            />
                        </div>
                        <div class="form-group">
                            <label for="confirm password">confirm password</label>
                            <input
                                type="password"
                                id="contact"
                                class="form-control"
                                placeholder="Confirm Password"
                                value={this.state.confirmpassword}
                                onChange={evt => {
                                    this.setState({ confirmpassword: evt.target.value });
                                }}
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">email id</label>
                            <input
                                type="email"
                                id="contact"
                                class="form-control"
                                placeholder="Email"
                                value={this.state.emailid}
                                onChange={evt => {
                                    this.setState({ emailid: evt.target.value });
                                }}
                            />
                        </div>
                        <button type="submit" class="btn">
                            add
                        </button>
                        <button class="btn" style={{ float: "right" }} onClick={this.unshow} >
                            Cancel
                        </button>
                        <label id="success" className="text-success"></label>
                        <label id="error" className="text-danger"></label>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    allvenues: state.venue,
    alluser: state.venue
});
const mapDispatchToProps = dispatch => ({
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    playosuer: v => dispatch(actions.playosuer(v)),
    getvenueuser: v => dispatch(actions.getvenueuser(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddUser)
);
