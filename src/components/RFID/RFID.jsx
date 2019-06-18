import React, { Component } from "react";
import "./RFID.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";
import { async } from "q";

class RFID extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            RFIDCd: "",
            friendlyRFID: "",
            VenueID: "",
            rfid: "",
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

        await this.props.rfid();
        let rfid = [];
        for (var i = 0; i < rfid; i++) { }
    }

    createRFID = async evt => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props
            .createRFID({
                RFIDCd: this.state.rfid,
                IsActive: true,
                friendlyRFID: this.state.friendlyRFID,
                VenueID: this.state.VenueID
            })
            .then(() => {
                this.clearText();
                document.getElementById("friendlyRFID").value = "";
                document.getElementById("rfid").value = "";
                document.getElementById("VenueID").value = "";
                return;
            });
    };
    clearText = () => {
        this.setState({
            friendlyRFID: "",
            rfid: ""
        });
    };

    RFID = async evt => {
        evt.preventDefault();
        await this.props.rfid({}).then(() => { });
    };

    addnew = async evt => {
        document.getElementById("newrfid").style.display = "block";
        document.getElementById("rfidapi").style.display = "none";
        document.getElementById("updaterfid").style.display = "none";
        this.clearText();
    };
    unshow = async evt => {
        document.getElementById("newrfid").style.display = "none";
        document.getElementById("rfidapi").style.display = "block";
        document.getElementById("updaterfid").style.display = "none";
    };

    showupdate = async p => {
        console.log(p);
        document.getElementById("updaterfid").style.display = "block";
        document.getElementById("newrfid").style.display = "none";
        document.getElementById("rfidapi").style.display = "none";
        this.setState({ VenueID: p.venueID });
        this.setState({ friendlyRFID: p.friendlyRFID });
        this.setState({ rfid: p.rfidCd });
        this.setState({ venueName: p.venueName });
    };
    updateRFID = async evt => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.updaterfidnew({
            VenueID: this.state.VenueID,
            friendlyRFID: this.state.friendlyRFID,
            venueName: this.state.venueName,
            rfid: this.state.rfid
        });
    };

    simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    handleClick() { }
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
                                <div className="col-md-12 main-heading">
                                    <h2>RFID</h2>
                                </div>

                                <div className="col-md-10 add">
                                    <a href="#" onClick={this.addnew}>
                                        + add RFID
                  </a>
                                </div>

                                <div className="col-md-10 venuetbl venuestbl" id="rfidapi">
                                    <table className="table tbl">
                                        <thead>
                                            <tr>
                                                <th>VenueID</th>
                                                <th>RfidCd</th>
                                                <th>FriendlyRFID</th>
                                                <th>Venue Name</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.Rfid.rfid.items &&
                                                this.props.Rfid.rfid.items &&
                                                this.props.Rfid.rfid.items.map(paymentmode => {
                                                    return (
                                                        <tr>
                                                            <td> {paymentmode.venueID}</td>
                                                            <td> {paymentmode.rfidCd}</td>
                                                            <td> {paymentmode.friendlyRFID}</td>
                                                            <td> {paymentmode.venueName}</td>
                                                            <td>
                                                                <a href="#" title="Update/Edit">
                                                                    <i
                                                                        class="fa fa-pencil"
                                                                        aria-hidden="true"
                                                                        onClick={evt =>
                                                                            this.showupdate(paymentmode)
                                                                        }
                                                                    />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>

                                {/*  New RFID */}
                                <div
                                    className="col-md-10 venuefrm"
                                    id="newrfid"
                                    style={{ display: "none" }}
                                >
                                    <form className="frm" onSubmit={this.createRFID}>
                                        <h2>Enter New RFID Details</h2>

                                        <div className="form-group col-md-12">
                                            <label for="address">Choose Venue Name</label>
                                            <select
                                                className="col-md-12"
                                                value={this.state.VenueID}
                                                onChange={evt => {
                                                    this.setState({ VenueID: evt.target.value });
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

                                        <div class="form-group col-md-12">
                                            <label for="address">Friendly RFID</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter Friendly RFID"
                                                value={this.state.friendlyRFID}
                                                onChange={evt => {
                                                    this.setState({ friendlyRFID: evt.target.value });
                                                }}
                                                id="friendlyRFID" required
                                            />
                                        </div>

                                        <div class="form-group col-md-12">
                                            <label for="name">RFID</label>

                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter RFID"
                                                value={this.state.rfid}
                                                onChange={evt => {
                                                    this.setState({ rfid: evt.target.value });
                                                }}
                                                id="rfid"
                                                onKeyPress={event => {
                                                    if (event.charCode === 13) {
                                                        event.preventDefault();
                                                        return false;
                                                    }
                                                }} required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        // onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "add"}
                                        </button>
                                        <a
                                            class="btn butn"
                                            style={{ float: "right" }}
                                            onClick={this.unshow}
                                        >
                                            Cancel
                    </a>
                                        <label id="Sucess" className="text-success" />
                                    </form>
                                </div>
                                {/*  New Rfid */}

                                {/*  Update RFID */}
                                <div
                                    className="col-md-10 venuefrm"
                                    id="updaterfid"
                                    style={{ display: "none" }}
                                >
                                    <form className="frm" onSubmit={this.updateRFID}>
                                        <h2>Update RFID Details</h2>

                                        <div className="form-group">
                                            <label for="address">Choose Venue Name</label>
                                            <select
                                                className="col-md-12"
                                                value={this.state.VenueID}
                                                onChange={evt => {
                                                    this.setState({ VenueID: evt.target.value });
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

                                        <div class="form-group col-md-12">
                                            <label for="address">Friendly RFID</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter Friendly RFID"
                                                value={this.state.friendlyRFID}
                                                onChange={evt => {
                                                    this.setState({ friendlyRFID: evt.target.value });
                                                }}
                                                id="fRFID"
                                            />
                                        </div>

                                        <div class="form-group col-md-12">
                                            <label for="name">RFID</label>

                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter RFID"
                                                value={this.state.rfid}
                                                onChange={evt => {
                                                    this.setState({ rfid: evt.target.value });
                                                }}
                                                id="rRFID"
                                                onKeyPress={event => {
                                                    if (event.charCode === 13) {
                                                        event.preventDefault();
                                                        return false;
                                                    }
                                                }}
                                                readOnly
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        // onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "update"}
                                        </button>
                                        <a
                                            class="btn butn"
                                            style={{ float: "right" }}
                                            onClick={this.unshow}
                                        >
                                            Cancel
                    </a>
                                        <label id="Sucess" className="text-success" />
                                    </form>
                                </div>
                                {/*  Update Rfid */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Rfid: state.playouser,
    allvenues: state.venue
});
const mapDispatchToProps = dispatch => ({
    rfid: v => dispatch(actions.rfid(v)),
    createRFID: v => dispatch(actions.createRFID(v)),
    updaterfidnew: v => dispatch(actions.updaterfidnew(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RFID)
);
