import React, { Component } from "react";
import "./RFID.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import { async } from "q";

class RFID extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            RFIDCd: "",
            friendlyRFID: "",
            VenueID: "",
            rfid: ""
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


    createRFID = async (evt) => {
        evt.preventDefault();
        await this.props.createRFID({
            RFIDCd: this.state.rfid,
            IsActive: true,
            friendlyRFID: this.state.friendlyRFID,
            VenueID: this.state.VenueID,
        })
    };


    RFID = async (evt) => {
        evt.preventDefault();
        await this.props.rfid({
        }).then(() => {
        })
    }

    addnew = async (evt) => {
        document.getElementById("rfid").style.display = "block";
    }
    unshow = async (evt) => {
        document.getElementById("rfid").style.display = "none";
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
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/*  New RFID */}
                        <div
                            className="col-md-12 venuefrm"
                            id="rfid"
                            style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.createRFID}>
                                <h2>Enter New RFID Details</h2>

                                <div className="form-group">
                                    <label for="address">Choose Venue Name</label>
                                    <select className="col-md-12" value={this.state.VenueID}
                                        onChange={evt => {
                                            this.setState({ VenueID: evt.target.value });
                                        }}>
                                        <option selected>Choose Venue Name </option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            <option value={allvanues.venueID} >{allvanues.name}</option>
                                        ))}
                                    </select>

                                </div>

                                <div class="form-group">
                                    <label for="address">Friendly RFID</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Friendly RFID"
                                        value={this.state.friendlyRFID}
                                        onChange={evt => {
                                            this.setState({ friendlyRFID: evt.target.value });
                                        }} />
                                </div>

                                <div class="form-group">
                                    <label for="name">RFID</label>

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter RFID"
                                        value={this.state.rfid}
                                        onChange={evt => {
                                            this.setState({ rfid: evt.target.value });
                                        }} />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                 </button>
                                <a
                                    class="btn"
                                    style={{ float: "right" }}
                                    onClick={this.unshow}>
                                    Cancel
                                 </a>
                                <label id="Sucess" className="text-success" />
                            </form>
                        </div>
                        {/*  New Rfid */}

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Rfid: state.playouser,
    allvenues: state.venue,
});
const mapDispatchToProps = dispatch => ({
    rfid: (v) => dispatch(actions.rfid(v)),
    createRFID: (v) => dispatch(actions.createRFID(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RFID)
);
