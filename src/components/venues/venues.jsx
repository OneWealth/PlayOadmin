import React, { Component } from "react";
import "./venues.css";
import RightBar from "../rightbar/rightbar";
import Product from "../product/product";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import { Modal, Button } from 'react-bootstrap';


class Venue extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            venueID: "",
            name: "",
            adderess: "",
            contactNcr: "",
            data: {}
        };
        this.state = {
            show: false,
            selectedUser: null
        };

    }

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
    async componentWillReceiveProps() {
        // await this.props.verifyvenue();
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
        await this.props.createvanue({
            Name: this.state.name,
            Adderess: this.state.adderess,
            ContactNbr: this.state.contactNcr
        }).then(() => {
            this.state.name = "";
            this.state.adderess = "";
            this.state.contactNcr = "";
            // this.props.history.push("");

            return;
        });
    };



    updatedata = async (evt) => {
        evt.preventDefault();
        await this.props.updatedata({
            venueID: this.state.venueID,
            Name: this.state.name,
            Adderess: this.state.adderess,
            ContactNbr: this.state.contactNcr
        })
    };


    show = async (allvanues) => {
        document.getElementById("venue").style.display = "block";
        document.getElementById("newvenue").style.display = "none";
        document.getElementById("id").value = allvanues.venueID || "";
        this.setState({ venueID: allvanues.venueID })
        this.setState({ name: allvanues.name })
        this.setState({ adderess: allvanues.adderess })
        this.setState({ contactNcr: allvanues.contactNbr })
        document.getElementById("name").value = allvanues.name || "";
        document.getElementById("adderess").value = allvanues.adderess || "";
        document.getElementById("mobile").value = allvanues.contactNbr || "";
    };

    addnew = async (allvanues) => {
        document.getElementById("newvenue").style.display = "block";
        document.getElementById("venue").style.display = "none";
    };


    render() {
        return (
            <div className="row mg-top">
                <div className="col-md-7 offset-md-2">
                    <div className="row">
                        <div className="col-md-12 add">
                            <a href="#" onClick={this.addnew}>+ add venue</a>
                        </div>
                        <div className="col-md-12 venuetbl">
                            <table className="table tbl">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Mobile No</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                        <tr>
                                            <th>{allvanues.venueID}</th>
                                            <td>{allvanues.name}</td>
                                            <td>{allvanues.adderess}</td>
                                            <td>{allvanues.contactNbr}</td>
                                            <td>
                                                <a>
                                                    <i class="fa fa-pencil" aria-hidden="true" onClick={(evt) => this.show(allvanues)} />
                                                </a>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Edit New Vanue */}
                        <div className="col-md-12 venuefrm" id="venue" style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.updatedata}>
                                <h2>new Venue</h2>
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
                                        required id="id" style={{ display: "none" }} />

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Venue Name"
                                        value={this.state.name}
                                        onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                        required id="name" />

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
                                        required id="adderess" />
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
                                        required id="mobile" />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                </button>
                                <label id="Sucess" className="text-success"></label>
                            </form>
                        </div>
                        {/* Edit New Vanue */}

                        {/* Add New Vanue */}

                        <div className="col-md-12 venuefrm" id="newvenue" style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.onSubmit}>
                                <h2>new Venue</h2>
                                <div class="form-group">
                                    <label for="name">name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Venue Name"
                                        value={this.state.name}
                                        onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                        required />
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
                                        required />
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
                                        required />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                </button>
                                <label id="Sucess" className="text-success"></label>
                            </form>
                        </div>
                        {/* Add New Vanue */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allvenues: state.venue,
    updatedvanues: state.vanue,
    // allproducts: state.product
});
const mapDispatchToProps = dispatch => ({
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    createvanue: v => dispatch(actions.createvanue(v)),
    updatedata: v => dispatch(actions.updatedata(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Venue)
);
