import React, { Component } from "react";
import "./venues.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";
class Venue extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            venueID: "",
            name: "",
            adderess: "",
            contactNcr: "",
            data: {},
            show: false,
            selectedUser: null,
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
    }
    async componentWillReceiveProps() {
        // await this.props.verifyvenue();
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
    }
    clearText = () => {
        this.setState({
            name: "",
            adderess: "",
            contactNcr: ""
        });
    };
    onSubmit = async evt => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props
            .createvanue({
                Name: this.state.name,
                Adderess: this.state.adderess,
                ContactNbr: this.state.contactNcr
            })
            .then(() => {
                this.clearText();
                document.getElementById("name").value = "";
                document.getElementById("adderess").value = "";
                document.getElementById("contactNcr").value = "";
                return;
            });
    };
    updatedata = async evt => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.updatedata({
            venueID: this.state.venueID,
            Name: this.state.name,
            Adderess: this.state.adderess,
            ContactNbr: this.state.contactNcr
        });
    };
    show = async allvanues => {
        document.getElementById("updatevenue").style.display = "block";
        document.getElementById("newvenue").style.display = "none";
        document.getElementById("apivenue").style.display = "none";
        document.getElementById("id").value = allvanues.venueID || "";
        this.setState({ venueID: allvanues.venueID });
        this.setState({ name: allvanues.name });
        this.setState({ adderess: allvanues.adderess });
        this.setState({ contactNcr: allvanues.contactNbr });
        document.getElementById("name").value = allvanues.name || "";
        document.getElementById("adderess").value = allvanues.adderess || "";
        document.getElementById("mobile").value = allvanues.contactNbr || "";
    };
    addnew = async () => {
        document.getElementById("updatevenue").style.display = "none";
        document.getElementById("newvenue").style.display = "block";
        document.getElementById("apivenue").style.display = "none";
        this.clearText();
    };
    unshow = async () => {
        document.getElementById("newvenue").style.display = "none";
        document.getElementById("apivenue").style.display = "inline-block";
        document.getElementById("updatevenue").style.display = "none";
    };
    unshowedit = async () => {
        document.getElementById("updatevenue").style.display = "none";
        document.getElementById("apivenue").style.display = "inline-block";
        document.getElementById("newvenue").style.display = "none";
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
                                    <h2>Venue</h2>
                                </div>
                                <div className="col-md-10 add">
                                    <a href="#" onClick={this.addnew}>
                                        + add venue
                  </a>
                                </div>

                                <div className="col-md-10 venuetbl venuestbl" id="apivenue">
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
                                            {this.props.allvenues.vanues.items &&
                                                this.props.allvenues.vanues.items &&
                                                this.props.allvenues.vanues.items.map(
                                                    (allvanues, index) => (
                                                        <tr>
                                                            <th>{allvanues.venueID}</th>
                                                            <td>{allvanues.name}</td>
                                                            <td>{allvanues.adderess}</td>
                                                            <td>{allvanues.contactNbr}</td>
                                                            <td>
                                                                <a>
                                                                    <i
                                                                        class="fa fa-pencil"
                                                                        aria-hidden="true"
                                                                        onClick={evt => this.show(allvanues)}
                                                                    />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Edit New Vanue */}
                                <div
                                    className="col-md-10 venuefrm"
                                    id="updatevenue"
                                    style={{ display: "none" }}
                                >
                                    <form className="frm" onSubmit={this.updatedata}>
                                        <h2>update Venue</h2>
                                        <div class="form-group col-md-12">
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
                                        <div class="form-group col-md-12">
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
                                        <div class="form-group col-md-12">
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
                                {/* Edit New Vanue */}

                                {/* Add New Vanue */}

                                <div
                                    className="col-md-10 venuefrm"
                                    id="newvenue"
                                    style={{ display: "none" }}
                                >
                                    <form className="frm" onSubmit={this.onSubmit}>
                                        <h2>new Venue</h2>
                                        <div class="form-group col-md-12">
                                            <label for="name">name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter Venue Name"
                                                value={this.state.name}
                                                onChange={evt => {
                                                    this.setState({ name: evt.target.value });
                                                }}
                                                id="name"
                                                required
                                            />
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label for="address">address</label>
                                            <input
                                                type="address"
                                                class="form-control"
                                                placeholder="Enter Venue Address"
                                                id="adderess"
                                                value={this.state.adderess}
                                                onChange={evt => {
                                                    this.setState({ adderess: evt.target.value });
                                                }}
                                                required
                                            />
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label for="mobileno">mobile no</label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                placeholder="Enter mobile no"
                                                value={this.state.contactNcr}
                                                id="contactNcr"
                                                onChange={evt => {
                                                    this.setState({ contactNcr: evt.target.value });
                                                }}
                                                required
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
                                        <button
                                            class="btn"
                                            style={{ float: "right" }}
                                            onClick={this.unshowedit}
                                        >
                                            Cancel
                    </button>
                                        <label id="Sucess" className="text-success" />
                                    </form>
                                </div>
                                {/* Add New Vanue */}
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
    updatedvanues: state.vanue
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
