import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";
import { Button } from "react-bootstrap";

class AddUser extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      password: null,
      confirmpassword: null,
      emailid: null,
      venueid: null,
      userName: "",
      venueName: "",
      emailId: "",
      isLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
    await this.props.verifyvenue();
    let allvanues = [];
    for (var i = 0; i < allvanues; i++) {
      this.setState({ venueID: this.props.allvenues.vanues.items[i].venueID });
      this.setState({ name: this.props.allvenues.vanues.items[i].name });
      this.setState({
        adderess: this.props.allvenues.vanues.items[i].adderess
      });
      this.setState({
        contactNcr: this.props.allvenues.vanues.items[i].contactNbr
      });
    }
    //console.log(this.props.alluser.getuser.items);
    let allusers = [];
    for (var i = 0; i < allusers; i++) {}
  }
  getvenueuser = async evt => {
    evt.preventDefault();
    await this.props
      .getvenueuser({
        venueID: this.state.venueid
      })
      .then(() => {
        document.getElementById("apiresult").style.display = "inline-table";
      });
  };
  clearText = () => {
    this.setState({
      username: "",
      password: "",
      contact: "",
      email: ""
    });
  };
  onSubmit = async evt => {
    evt.preventDefault();
    this.setState({ isLoading: true }, () => {
      this.simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
    var pass = document.getElementById("password").value;
    var confPass = document.getElementById("contact").value;
    if (pass != confPass) {
      alert("Wrong confirm password !");
    } else {
      await this.props

        .playosuer({
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.emailid,
          VenueId: this.state.venueid
        })
        .then(() => {
          this.setState({
            username: "",
            password: "",
            emailid: "",
            confirmpassword: ""
          });
          this.clearText();
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("contact").value = "";
          document.getElementById("email").value = "";
          return;
        });
    }
  };

  show = async evt => {
    this.clearText();
    document.getElementById("addnew").style.display = "block";
    document.getElementById("apiresult").style.display = "none";
  };

  unshow = async evt => {
    document.getElementById("apiresult").style.display = "inline-table";
    document.getElementById("addnew").style.display = "none";
  };

  simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  handleClick() {}
  render() {
    const { isLoading } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2">
              <SideBar />
            </div>
            <div className="col-md-10 outputonclick">
              <div className="row">
                <div className="col-md-12  main-heading">
                  <h2>user</h2>
                  <p>List of all users in a Venue all across the world.</p>
                </div>

                <div className="col-md-12 add">
                  <a href="#" onClick={this.show}>
                    + add user
                  </a>
                </div>

                <div className="col-md-12">
                  <form onSubmit={this.getvenueuser}>
                    <div className="row venuetbl">
                      <div className="col-md-7">
                        <div className="row sl-3">
                          <select
                            className="col-md-12"
                            value={this.state.venueid}
                            onChange={evt => {
                              this.setState({ venueid: evt.target.value });
                            }}
                          >
                            <option selected>Choose Venue Name </option>
                            {this.props.allvenues.vanues.items &&
                              this.props.allvenues.vanues.items &&
                              this.props.allvenues.vanues.items.map(
                                (allvanues, index) => (
                                  <option value={allvanues.venueID}>
                                    {allvanues.name}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-5 text-right">
                        <button
                          class="btn btn-primary btn-block"
                          onClick={this.unshow}
                        >
                          Get Users
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-12">
                  <table
                    className="table  tbl"
                    id="apiresult"
                    style={{ display: "none" }}
                  >
                    <thead>
                      <tr>
                        <th>user name</th>
                        <th>venue name</th>
                        <th>email id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.alluser.getuser.items &&
                        this.props.alluser.getuser.items &&
                        this.props.alluser.getuser.items.map(
                          (allusers, index) => (
                            <tr>
                              <td>{allusers.userName}</td>
                              <td>{allusers.venueName}</td>
                              <td>{allusers.emailId}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>

                <div className="col-md-12">
                  <form
                    className="frm"
                    onSubmit={this.onSubmit}
                    style={{ display: "none" }}
                    id="addnew"
                  >
                    <h2>new user</h2>
                    <div className="row sl-3">
                      <label>venue Name</label>
                      <select
                        className="col-md-12"
                        value={this.state.venueid}
                        onChange={evt => {
                          this.setState({ venueid: evt.target.value });
                        }}
                        required
                      >
                        <option selected>Choose Venue Name </option>
                        {this.props.allvenues.vanues.items &&
                          this.props.allvenues.vanues.items &&
                          this.props.allvenues.vanues.items.map(
                            (allvanues, index) => (
                              <option value={allvanues.venueID}>
                                {allvanues.name}
                              </option>
                            )
                          )}
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
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">password</label>
                      <input
                        type="password"
                        className="form-control small"
                        id="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={evt => {
                          this.setState({ password: evt.target.value });
                        }}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="confirm password">confirm password</label>
                      <input
                        type="password"
                        id="contact"
                        className="form-control small"
                        placeholder="Confirm Password"
                        value={this.state.confirmpassword}
                        onChange={evt => {
                          this.setState({ confirmpassword: evt.target.value });
                        }}
                        onBlur={this.confirmPass}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">email id</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control small"
                        placeholder="Email"
                        value={this.state.emailid}
                        onChange={evt => {
                          this.setState({ emailid: evt.target.value });
                        }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      variant="primary"
                      disabled={isLoading}
                      // onClick={!isLoading ? this.handleClick : null}
                    >
                      {isLoading ? "Loading…" : "add"}
                    </button>

                    <button
                      class="btn"
                      style={{ float: "right" }}
                      onClick={this.unshow}
                    >
                      Cancel
                    </button>
                    <p>
                      {" "}
                      <label id="success" className="text-success" />
                    </p>
                    <p>
                      <label id="error" className="text-danger" />
                    </p>
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
