import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
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
            productID: ""
        };
    }
    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
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
        await this.props.updateproduct({
            productID: this.state.productID,
            Name: this.state.name,
            Description: this.state.description,
            timeDependentFlag: this.state.timeDependentFlag
        })
    };
    onClick = async (evt) => {
        evt.preventDefault();
        document.getElementById("product").style.display = "block";
    }
    show = async (Allproducts) => {
        console.log(Allproducts);
        document.getElementById("venue").style.display = "block";
    };
    addnew = async (allvanues) => {
        console.log(allvanues);
        document.getElementById("newvenue").style.display = "block";
        document.getElementById("venue").style.display = "none";
    };
    show = async (Allproducts) => {
        console.log(Allproducts);
        document.getElementById("product").style.display = "block";
        document.getElementById("createproduct").style.display = "none";
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
        document.getElementById("product").style.display = "none";
        document.getElementById("productapiresult").style.display = "none";
        this.clearText();
    };
    unshowproduct = async () => {
        document.getElementById("createproduct").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("productapiresult").style.display = "inline-block";
    }

    render() {
        let style = {
            display: 'none',
        };
        if (this.props.customAllProducts.length > 0) {
            style.display = 'block';
        }
        return (
            <div className="row">
                <div className="col-md-12 main-heading">
                    <h2>products</h2>
                </div>
                <div className="col-md-10">
                    <div className="col-md-12 add">
                        <a href="#" onClick={this.addnew}>+ add Product</a>
                    </div>
                    <form onSubmit={this.getproducts}>
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
                                <button type="" class="btn btn-primary btn-block" onClick={this.unshowproduct}>
                                    Get Products
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="row">

                        <div className="col-md-12 venuetbl" style={style} id="productapiresult">
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
                                        <tr>
                                            <th>{Allproducts.productID}</th>
                                            <td>{Allproducts.name}</td>
                                            <td>{Allproducts.description}</td>
                                            <td>{Allproducts.timeDependentFlag ? "Yes" : "No"}</td>
                                            <td>
                                                <a href="#" title="Update/Edit">
                                                    <i class="fa fa-pencil" aria-hidden="true" onClick={(evt) => this.show(Allproducts)} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>



                        {/* Create Product Form */}
                        <div className="col-md-12 venuefrm" id="createproduct" style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.Createproject}>
                                <h2>new product</h2>
                                <div className="form-group">
                                    <label>Select Venue</label>
                                    <select className="col-md-12 form-control" value={this.state.venueid}
                                        onChange={evt => {
                                            this.setState({ venueid: evt.target.value });
                                        }} required>
                                        <option selected>Choose Venue Name </option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            <option value={allvanues.venueID} >{allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="name">name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="venuename"
                                        placeholder="product Name"
                                        value={this.state.name}
                                        onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                        required />
                                </div>
                                <div class="form-group">
                                    <label for="description">description</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="venuedecription"
                                        placeholder="description"
                                        value={this.state.description}
                                        onChange={evt => {
                                            this.setState({ description: evt.target.value });
                                        }}
                                        required />
                                </div>
                                <div class="form-group">
                                    <label for="dependent">
                                        <input type="checkbox" id="contact" value={this.state.timeDependentFlag}
                                            onClick={evt => {
                                                this.setState({ timeDependentFlag: !this.state.timeDependentFlag });
                                            }} />
                                        time dependent
                                     </label>
                                </div>
                                <button type="submit" class="btn">
                                    add
                                 </button>
                                <button class="btn" style={{ float: "right" }} onClick={this.unshowproduct}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                        {/* Create Product Form */}




                        {/* Edit Product Form */}
                        <div className="col-md-12 venuefrm" id="product" style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.updateproduct}>
                                <h2>Update product</h2>
                                <div class="form-group">
                                    <label for="name">name</label>
                                    <input
                                        type="text"
                                        class="form-control"
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
                                        class="form-control"
                                        id="venuename"
                                        placeholder="product Name"
                                        value={this.state.name}
                                        onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="description">description</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="venuedecription"
                                        placeholder="description"
                                        value={this.state.description}
                                        onChange={evt => {
                                            this.setState({ description: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="dependent">
                                        <input type="checkbox" id="checkedcontact" value={this.state.timeDependentFlag}
                                            onClick={evt => {
                                                this.setState({ timeDependentFlag: "true" });
                                            }} id="mycheck" />
                                        time dependent
                                     </label>
                                </div>

                                <button type="submit" class="btn" >
                                    add
                                 </button>
                                <button class="btn" style={{ float: "right" }} onClick={this.unshoweditproduct}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                        {/* Edit Product Form */}




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
