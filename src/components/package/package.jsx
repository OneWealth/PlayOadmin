import React, { Component } from "react";
import "./package.css";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";


class PackageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductID: "",
            Name: "",
            Description: "",
            Duration: "",
            Money: "",
            IsActive: "",
            venueID: null,
            selectedProduct: null,
            linkedPackages: [],
            showPackageTable: {
                display: 'none',
            },
            PackageID: ""
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
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }

    }

   
    getproducts = async (id) => {
        this.props.products({
            id
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

    handleChange(evt) {
        this.getproducts(evt.target.value);
        this.setState({ venueID: evt.target.value });
    }

    onFinalClickHander(evt) {
        evt.preventDefault();
        this.setState({
            showPackageTable: {
                display: 'block',
            }
        })
    }

    createpackage = async (evt) => {
        evt.preventDefault();
        await this.props.createpackage({
            Name: this.state.name,
            Description: this.state.description,
            Duration: this.state.duration,
            Money: this.state.money,
            ProductID: this.state.ProductID
        })
    };

    updatepackage = async (evt) => {
        evt.preventDefault();
        await this.props.updatepackagenew({
            Name: this.state.name,
            Description: this.state.description,
            Duration: this.state.duration,
            Money: this.state.money,
            PackageID: this.state.PackageID
        })
    };
    showupdate = async (p) => {
        document.getElementById("updatepackages").style.display = "block";
        document.getElementById("packages").style.display = "none";
        this.setState({ PackageID: p.packageID })
        this.setState({ name: p.name })
        this.setState({ description: p.description })
        this.setState({ duration: p.duration })
        this.setState({ money: p.money })
    };
    show = async (evt) => {
        document.getElementById("packages").style.display = "block";
    };

    render() {
        let style = {
            display: 'none',
        };

        if (this.props.customAllProducts.length > 0) {

        }
        let { customAllProducts } = this.props;
        let packages = [];
        if (customAllProducts.length > 0) {
            packages = customAllProducts[0].linkedPackages;
            style.display = 'block';
        }
        return (
            <div className="row mg-top">
                <div className="col-md-7 offset-md-2">
                    <form >
                        <div className="row venuetbl">
                            <div className="col-md-4">
                                <div className="row sl-3">
                                    <select className="col-md-10" value={this.state.venueid}
                                        // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                        onChange={this.handleChange.bind(this)}>
                                        <option selected>Choose Venue Name </option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            < option value={allvanues.venueID} > {allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row sl-3">
                                    <select id="choose-packages" className="col-md-10" value={this.state.venueid}>
                                        <option selected>Choose Packages Name </option>
                                        {this.props.customAllProducts.map((Allproducts, index) => (
                                            <option>{Allproducts.name}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4 text-right">
                                <button type="submit" class="btn btn-primary btn-block" onClick={(evt) => this.onFinalClickHander.bind(this)}>
                                    Get Packages
                                </button>
                            </div>
                        </div>
                    </form>


                    {/* Package Table */}
                    <div className="row">
                        <div className="col-md-12 add">
                            <a href="#" onClick={this.show}>+ add package</a>
                        </div>
                        <div className="col-md-12 venuetbl" style={this.state.showPackageTable}>
                            <table className="table tbl">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>description</th>
                                        <th>duration</th>
                                        <th>money</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages.map((p, index) => (
                                        <tr>
                                            <td>{p.packageID}</td>
                                            <td>{p.name}</td>
                                            <td>{p.description}</td>
                                            <td>{p.duration}</td>
                                            <td>{p.money}</td>
                                            <td>
                                                <a href="#" title="Update/Edit">
                                                    <i class="fa fa-pencil" aria-hidden="true" onClick={(evt) => this.showupdate(p)} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Package Table */}



                    {/* Create Package Form */}
                    <div className="row" id="packages" style={{ display: "none" }}>
                        <div className="col-md-12 venuefrm"  >
                            <form className="frm" onSubmit={this.createpackage}>
                                <h2>new package</h2>
                                <div className="row sl-3">
                                    <label className="col-md-12">Select venue</label>
                                    <select className="col-md-10" value={this.state.venueid}
                                        // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                        onChange={this.handleChange.bind(this)}>
                                        <option >Choose Venue Name </option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            < option value={allvanues.venueID} > {allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row sl-3">
                                    <label className="col-md-12">Select Product</label>
                                    <select id="choose-packages" className="col-md-10" value={this.state.ProductID} onChange={evt => {
                                        this.setState({ ProductID: evt.target.value });
                                    }} >
                                        <option >Choose Packages Name </option>
                                        {this.props.customAllProducts.map((Allproducts, index) => (
                                            <option value={Allproducts.productID}>{Allproducts.name}  ---- {Allproducts.description}</option>
                                        ))}

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="name">name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="venuename"
                                        placeholder="package name"
                                        value={this.state.name} onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="description">description</label>
                                    <textarea
                                        type="address"
                                        class="form-control"
                                        id="address"
                                        placeholder="description"
                                        value={this.state.description} onChange={evt => {
                                            this.setState({ description: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="duration">time duration</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="contact"
                                        placeholder="duration"
                                        value={this.state.duration} onChange={evt => {
                                            this.setState({ duration: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="money">money</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="contact"
                                        placeholder="money"
                                        value={this.state.money} onChange={evt => {
                                            this.setState({ money: evt.target.value });
                                        }}
                                    />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Create Package Form */}







                    {/* Update Package Form */}
                    <div className="row" id="updatepackages" style={{ display: "none" }}>
                        <div className="col-md-12 venuefrm"  >
                            <form className="frm" onSubmit={this.updatepackage}>
                                <h2>new package</h2>

                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="venuename"
                                        placeholder="package name"
                                        value={this.state.PackageID} onChange={evt => {
                                            this.setState({ PackageID: evt.target.value });
                                        }}
                                        style={{ display: "none" }} />
                                </div>
                                <div class="form-group">
                                    <label for="name">name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="venuename"
                                        placeholder="package name"
                                        value={this.state.name} onChange={evt => {
                                            this.setState({ name: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="description">description</label>
                                    <textarea
                                        type="address"
                                        class="form-control"
                                        id="address"
                                        placeholder="description"
                                        value={this.state.description} onChange={evt => {
                                            this.setState({ description: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="duration">time duration</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="contact"
                                        placeholder="duration"
                                        value={this.state.duration} onChange={evt => {
                                            this.setState({ duration: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="money">money</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="contact"
                                        placeholder="money"
                                        value={this.state.money} onChange={evt => {
                                            this.setState({ money: evt.target.value });
                                        }}
                                    />
                                </div>
                                <button type="submit" class="btn">
                                    add
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Update Package Form */}




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
    createpackage: v => dispatch(actions.createpackage(v)),
    updatepackagenew: v => dispatch(actions.updatepackagenew(v)),
    products: v => dispatch(actions.products(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PackageContent)
);
