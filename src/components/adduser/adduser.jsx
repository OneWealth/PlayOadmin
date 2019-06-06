import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class AddUser extends Component {
    state = {
        username: null,
        password: null,
        confirmpassword: null,
        emailid: null,
        venueid: null
    };

    async componentDidMount() {
        await this.props.verifyvenue();
        let allvanues = [];
        for (var i = 0; i < allvanues; i++) {
            this.setState({ venueID: this.props.allvenues.vanues.items[i].venueID });
            this.setState({ name: this.props.allvenues.vanues.items[i].name });
            this.setState({ adderess: this.props.allvenues.vanues.items[i].adderess });
            this.setState({ contactNcr: this.props.allvenues.vanues.items[i].contactNbr });
        }
    }

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

    render() {
        return (
            <div className="row mg-top">
                <div className="col-md-7 offset-md-2">
                    <form className="frm" onSubmit={this.onSubmit}>
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
                                placeholder="enter username"
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
                                placeholder="enter password"
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
                                placeholder="confirm password"
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
                                placeholder="enter email"
                                value={this.state.emailid}
                                onChange={evt => {
                                    this.setState({ emailid: evt.target.value });
                                }}
                            />
                        </div>
                        <button type="submit" class="btn">
                            add
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
});
const mapDispatchToProps = dispatch => ({
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    playosuer: v => dispatch(actions.playosuer(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddUser)
);
