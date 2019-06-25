import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";
import { async } from "q";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: "",
            name: "",
            description: "",
            timeDependentFlag: false,
            activeFlag: "",
            venueid: "",
            productID: "",
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
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
    onSubmit = async (evt) => {
        evt.preventDefault();
        await this.props.createproduct({
            Name: this.state.name,
            Description: this.state.description,
            venueID: this.props.products.venueID,
            timeDependentFlag: this.state.timeDependentFlag
        }).then(() => {
            this.clearText();
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("venueID").value = "";
            return;
        });
    };

    clearText = () => {
        this.setState({
            name: "",
            description: "",
            venueID: ""
        });
    };

    Createproject = async (evt) => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.createproduct({
            Name: this.state.name,
            Description: this.state.description,
            venueID: this.state.venueid,
            timeDependentFlag: this.state.timeDependentFlag
        }).then(() => {
            // this.state.name = "";
            // this.state.description = "";
            // this.state.venueID = "";
            // this.props.history.push("");
            document.getElementById("venuename").innerHTML = "";
            return;
        });
    };
    getproducts = async (evt) => {
        evt.preventDefault();
        this.props.products({
            id: this.state.venueid
        })
    };
    updateproduct = async (evt) => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.updateproduct({
            productID: this.state.productID,
            Name: this.state.name,
            Description: this.state.description,
            timeDependentFlag: this.state.timeDependentFlag
        })
    };
    onClick = async (evt) => {
        evt.preventDefault();
        document.getElementById("editproduct").style.display = "block";
    }
    show = async (Allproducts) => {

        document.getElementById("venue").style.display = "block";
    };
    addnew = async (allvanues) => {

        document.getElementById("newvenue").style.display = "block";
        document.getElementById("venue").style.display = "none";
    };
    show = async (Allproducts) => {
        document.getElementById("editproduct").style.display = "block";
        document.getElementById("createproduct").style.display = "none";
        document.getElementById("productapiresult").style.display = "none";
        document.getElementById("venueid").value = Allproducts.productID || "";
        this.setState({ productID: Allproducts.productID })
        this.setState({ name: Allproducts.name })
        this.setState({ description: Allproducts.description })
        this.setState({ timeDependentFlag: Allproducts.timeDependentFlag })
        if (Allproducts.timeDependentFlag === true) {
            document.getElementById("mycheck").checked = true;
        }
        else {
            document.getElementById("mycheck").checked = false;
        }
        document.getElementById("venuename").value = Allproducts.name || "";
        document.getElementById("venuedecription").value = Allproducts.adderess || "";
    };
    addnew = async () => {
        document.getElementById("createproduct").style.display = "block";
        document.getElementById("editproduct").style.display = "none";
        document.getElementById("productapiresult").style.display = "none";
        this.clearText();
    };
    unshoweditproduct = async () => {
        document.getElementById("createproduct").style.display = "none";
        document.getElementById("editproduct").style.display = "none";
        document.getElementById("productapiresult").style.display = "inline-block";
    }

    unshowproducts = async () => {
        document.getElementById("createproduct").style.display = "none";
        document.getElementById("editproduct").style.display = "none";
        document.getElementById("productapiresult").style.display = "inline-block";
    }
    simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    handleClick() { }

    render() {
        const { isLoading } = this.state;
        let style = {
            display: 'none',
        };
        if (this.props.customAllProducts.length > 0) {
            style.display = 'block';
        }
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
                                    <h2>products</h2>
                                </div>
                                <div className="col-md-10 add">
                                    <a href="#" onClick={this.addnew}>+ add Product</a>
                                </div>
                                <div className="col-md-10">
                                    <form onSubmit={this.getproducts}>
                                        <div className="row venuetbl">
                                            <div className="col-md-7">
                                                <       div className="row sl-3">
                                                    <select className="col-md-12" value={this.state.venueid}
                                                        onChange={evt => {
                                                            this.setState({ venueid: evt.target.value });
                                                        }}>
                                                        <option>Choose Venue Name </option>
                                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                                            <option key={index}  value={allvanues.venueID} >{allvanues.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-5 text-right">
                                                <button type="" className="btn btn-primary btn-block" onClick={this.unshowproduct}>
                                                    Get Products
                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                                {/* Create Product Form */}
                                <div className="col-md-10 venuetbl" style={style} id="productapiresult">
                                    <table className="table tbl">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>description</th>
                                                <th>Time Dependent</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.props.customAllProducts.map((Allproducts, index) => (
                                                <tr key={index} >
                                                    <td>{Allproducts.productID}</td>
                                                    <td>{Allproducts.name}</td>
                                                    <td>{Allproducts.description}</td>
                                                    <td>{Allproducts.timeDependentFlag ? "Yes" : "No"}</td>
                                                    <td>
                                                        <a href="#" title="Update/Edit">
                                                            <i className="fa fa-pencil" aria-hidden="true" onClick={(evt) => this.show(Allproducts)} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>



                                {/* Create Product Form */}

                                <div className="col-md-10 venuefrm" id="createproduct" style={{ display: "none" }}>
                                    <form className="frm" onSubmit={this.Createproject}>
                                        <h2>new product</h2>
                                        <div className="form-group sl-3 col-md-12">
                                            <label>Select Venue</label>
                                            <select className="col-md-12 form-control" value={this.state.venueid}
                                                onChange={evt => {
                                                    this.setState({ venueid: evt.target.value });
                                                }} required>
                                                <option>Choose Venue Name </option>
                                                {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                                    <option key={index} value={allvanues.venueID} >{allvanues.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venuename"
                                                placeholder="Product Name"
                                                value={this.state.name}
                                                onChange={evt => {
                                                    this.setState({ name: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>description</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="venuedecription"
                                                placeholder="Description"
                                                value={this.state.description}
                                                onChange={evt => {
                                                    this.setState({ description: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>
                                                <input type="checkbox" id="contact" value={this.state.timeDependentFlag}
                                                    onClick={evt => {
                                                        this.setState({ timeDependentFlag: !this.state.timeDependentFlag });
                                                    }} />
                                                time dependent
                                     </label>
                                        </div>
                                        <button type="submit" className="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        // onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "add"}

                                        </button>
                                        <a style={{ float: "right" }} onClick={this.unshowproducts} className="butn btn">
                                            Cancel
                                </a>
                                    </form>
                                </div>
                                {/* Create Product Form */}

                                {/* Edit Product Form */}
                                <div className="col-md-10 venuefrm" id="editproduct" style={{ display: "none" }}>
                                    <form className="frm" onSubmit={this.updateproduct}>
                                        <h2>Update product</h2>
                                        <div className="form-group col-md-12">
                                            <label>name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venueid"
                                                placeholder="product Name"
                                                value={this.state.productID}
                                                onChange={evt => {
                                                    this.setState({ productID: evt.target.value });
                                                }}
                                                style={{ display: "none" }}
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venuename"
                                                placeholder="product Name"
                                                value={this.state.name}
                                                onChange={evt => {
                                                    this.setState({ name: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>description</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="venuedecription"
                                                placeholder="description"
                                                value={this.state.description}
                                                onChange={evt => {
                                                    this.setState({ description: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>
                                                <input type="checkbox" id="checkedcontact" value={this.state.timeDependentFlag}
                                                    onClick={evt => {
                                                        this.setState({ timeDependentFlag: "true" });
                                                    }} id="mycheck" />
                                                time dependent
                                     </label>
                                        </div>

                                        <button type="submit" className="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        // onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "update"}
                                        </button>
                                        <a style={{ float: "right" }} onClick={this.unshoweditproduct} className="butn btn">
                                            Cancel
                                </a>
                                    </form>
                                </div>
                                {/* Edit Product Form */}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customAllProducts: state.products.allproducts,
        allvenues: state.venue,
    };
};
const mapDispatchToProps = dispatch => ({
    createproduct: v => dispatch(actions.createproduct(v)),
    products: v => dispatch(actions.products(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    updateproduct: v => dispatch(actions.updateproduct(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Product)
);
