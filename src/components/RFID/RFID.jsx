import React, { Component } from "react";
import "./RFID.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class RFID extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            RFIDCd: "",
            friendlyRFID: "",
            VenueID: "",
        };
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        await this.props.rfid();
        let rfid = [];
        for (var i = 0; i < rfid; i++) {

        }
    }


    RFID = async (evt) => {
        evt.preventDefault();
        await this.props.rfid({
        }).then(() => {
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10 main-heading">
                    <h2>RFID</h2>
                </div>
                <div className="col-md-10 ">
                    <div className="row">
                        <div className="col-md-12 add">
                            <a href="#" onClick={this.addnew}>
                                + add RFID
                           </a>
                        </div>
                        <div className="col-md-12 venuetbl venuestbl" id="apiresult">
                            <table className="table tbl">
                                <thead>
                                    <tr>
                                        <th>VenueID</th>
                                        <th>RfidCd</th>
                                        <th>FriendlyRFID</th>
                                        <th>Venue Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.Rfid.rfid.items && this.props.Rfid.rfid.items && this.props.Rfid.rfid.items.map((paymentmode) => {
                                        return (
                                            <tr>
                                                <td> {paymentmode.venueID}</td>
                                                <td> {paymentmode.rfidCd}</td>
                                                <td> {paymentmode.friendlyRFID}</td>
                                                <td> {paymentmode.venueName}</td>
                                                <td>
                                                    <a href="#" title="Update/Edit">
                                                        <i class="fa fa-pencil" aria-hidden="true" />
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Edit New RFID */}
                        <div
                            className="col-md-12 venuefrm"
                            id="venue"
                            style={{ display: "none" }}
                        >
                            <form className="frm" onSubmit={this.updatedata}>
                                <h2>update Venue</h2>
                                <div class="form-group">
                                    <label for="name">name</label>

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Venue Name"
                                        value={this.state.venueID}
                                        onChange={evt => {
                                            this.setState({ venueID: evt.target.value });
                                        }}
                                        id="id"
                                        style={{ display: "none" }}
                                    />

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Venue Name"
                                        value={this.state.name}
                                        onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                        id="name"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="address">address</label>
                                    <input
                                        type="address"
                                        class="form-control"
                                        placeholder="Enter Venue Address"
                                        value={this.state.adderess}
                                        onChange={evt => {
                                            this.setState({ adderess: evt.target.value });
                                        }}
                                        id="adderess"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="mobileno">mobile no</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        placeholder="Enter mobile no"
                                        value={this.state.contactNcr}
                                        onChange={evt => {
                                            this.setState({ contactNcr: evt.target.value });
                                        }}
                                        id="mobile"
                                    />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                 </button>
                                <button
                                    class="btn"
                                    style={{ float: "right" }}
                                    onClick={this.unshow}
                                >
                                    Cancel
                                 </button>
                                <label id="Sucess" className="text-success" />
                            </form>
                        </div>
                        {/* Edit New Vanue */}

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Rfid: state.playouser
});
const mapDispatchToProps = dispatch => ({
    rfid: (v) => dispatch(actions.rfid(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RFID)
);
