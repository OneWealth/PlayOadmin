import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: "",
            name: "",
            description: "",
            timeDependentFlag: "",
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

    async componentWillReceiveProps() {
        // // await this.props.verifyvenue();
        // console.log(this.props.products);
        // let allvanues = [];
        // for (var i = 0; i < allvanues; i++) {
        //     this.setState({ venueID: this.props.allvenues.vanues.items[i].venueID });
        //     this.setState({ name: this.props.allvenues.vanues.items[i].name });
        //     this.setState({ adderess: this.props.allvenues.vanues.items[i].adderess });
        //     this.setState({ contactNcr: this.props.allvenues.vanues.items[i].contactNbr });
        // }
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        await this.props.createproduct({
            Name: this.state.name,
            Description: this.state.description,
            venueID: this.props.products.venueID,
            timeDependentFlag: this.state.timeDependentFlag
        }).then(() => {
            this.state.name = "";
            this.state.description = "";
            this.state.venueID = "";
            // this.props.history.push("");
            return;
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
            this.state.name = "";
            this.state.description = "";
            this.state.venueID = "";
            // this.props.history.push("");
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
        // if (Allproducts.timeDependentFlag === true) {
        //     document.getElementById("checkedcontact");
        // }
        document.getElementById("venuename").value = Allproducts.name || "";
        document.getElementById("venuedecription").value = Allproducts.adderess || "";
    };


    addnew = async () => {
        document.getElementById("createproduct").style.display = "block";
        document.getElementById("product").style.display = "none";
    };

    render() {
        let style = {
            display: 'none',
        };
        if (this.props.customAllProducts.length > 0) {
            style.display = 'block';
        }

        return (
            <div className="row mg-top">
                <div className="col-md-7 offset-md-2">
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
                                <button type="submit" class="btn btn-primary btn-block" >
                                    Get Products
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="row" style={style}>
                        <div className="col-md-12 add">
                            <a href="#" onClick={this.addnew}>+ add Product</a>
                        </div>
                        <div className="col-md-12 venuetbl">
                            <table className="table tbl">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>description</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.props.customAllProducts.map((Allproducts, index) => (
                                        <tr>
                                            <th>{Allproducts.productID}</th>
                                            <td>{Allproducts.name}</td>
                                            <td>{Allproducts.description}</td>
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
                                        }}>
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
                                        <input type="checkbox" id="contact" value={this.state.timeDependentFlag}
                                            onClick={evt => {
                                                this.setState({ timeDependentFlag: "true" });
                                            }} />
                                        time dependent
                                     </label>
                                </div>

                                <button type="submit" class="btn">
                                    add
                                 </button>
                            </form>
                        </div>
                        {/* Create Product Form */}




                        {/* Edit Product Form */}
                        <div className="col-md-12 venuefrm" id="product" style={{ display: "none" }}>
                            <form className="frm" onSubmit={this.updateproduct}>
                                <h2>new product</h2>
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
                                            }} />
                                        time dependent
                                     </label>
                                </div>

                                <button type="submit" class="btn" >
                                    add
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
