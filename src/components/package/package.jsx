import React, { Component } from "react";
import "./package.css";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";


class PackageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductID: "",
            Name: "",
            Description: "",
            Duration: "",
            holidaymoney: "",
            Money: "",
            IsActive: "",
            venueID: null,
            selectedProduct: null,
            linkedPackages: [],
            showPackageTable: {
                display: 'none',
            },
            packageID: "",
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
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
        this.setState({ venueID: evt.target.value, productID: '' });
    }

    onFinalClickHandler() {
        this.setState({
            showPackageTable: {
                display: 'block',
            }
        })

    }


    clearText = () => {
        this.setState({
            name: "",
            description: "",
            duration: "",
            holidayMoney: "",
            money: "",
            ProductID: ""
        });
    };
    createpackage = async (evt) => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.createpackage({

            Name: this.state.name,
            Description: this.state.description,
            Duration: this.state.duration,
            holidayMoney: this.state.holidayMoney,
            Money: this.state.money,
            ProductID: this.state.ProductID
        }).then(() => {
            this.clearText();
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("duration").value = "";
            document.getElementById("holidaymoney").value = "";
            document.getElementById("money").value = "";
            document.getElementById("ProductID").value = "";
            return;
        });

    };

    updatepackage = async (evt) => {
        evt.preventDefault();
        this.setState({ isLoading: true }, () => {
            this.simulateNetworkRequest().then(() => {
                this.setState({ isLoading: false });
            });
        });
        await this.props.updatepackagenew({
            Name: this.state.name,
            Description: this.state.description,
            Duration: this.state.duration,
            holidayMoney: this.state.holidayMoney,
            Money: this.state.money,
            PackageID: this.state.PackageID
        })
    };
    showupdate = async (p) => {
        document.getElementById("updatepackages").style.display = "block";
        document.getElementById("newpackages").style.display = "none";
        document.getElementById("packagesapiresult").style.display = "none";
        this.setState({ PackageID: p.packageID })
        this.setState({ name: p.name })
        this.setState({ description: p.description })
        this.setState({ duration: p.duration })
        this.setState({ holidayMoney: p.holidayMoney })
        this.setState({ money: p.money })
    };
    show = async (evt) => {
        document.getElementById("newpackages").style.display = "block";
        document.getElementById("updatepackages").style.display = "none";
        document.getElementById("packagesapiresult").style.display = "none";
        this.clearText();
    };
    unshowproduct = async () => {
        document.getElementById("newpackages").style.display = "none";
        document.getElementById("updatepackages").style.display = "none";
        document.getElementById("packagesapiresult").style.display = "block";
    }
    simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    handleClick() { }

    delpackages = async (pack) => {
        await this.props.deletepackages({
            PackageID: pack.packageID,
        })
    };
    render() {
        const { isLoading } = this.state;
        if (this.props.customAllProducts.length > 0) {
        }
        let { customAllProducts } = this.props;
        let packages = [];
        if (customAllProducts.length > 0 && parseInt(this.state.productID)) {
            let _c = customAllProducts.filter((c) => c.productID == this.state.productID);
            packages = _c[0].linkedPackages || [];
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
                                    <h2>packages</h2>
                                </div>

                                <div className="col-md-10">
                                    <div className="col-md-12 add">
                                        <a onClick={this.show}>+ add package</a>
                                    </div>
                                    <form >
                                        <div className="row venuetbl">
                                            <div className="col-md-4">
                                                <div className="row sl-3">
                                                    <select className="col-md-10" value={this.state.venueid}
                                                        // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                                        onChange={this.handleChange.bind(this)}>
                                                        <option>Choose Venue Name </option>
                                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                                            < option key={index} value={allvanues.venueID} > {allvanues.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row sl-12">
                                                    <select id="choose-packages" className="col-md-10" value={this.state.productID} onChange={(e) => this.setState({ productID: e.target.value, showPackageTable: { display: 'none' } })}>
                                                        <option>Choose Product Name </option>
                                                        {this.props.customAllProducts.map((Allproducts, index) => (

                                                            <option key={index} value={Allproducts.productID}>{Allproducts.name}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-right linkstyle">
                                                <a className="btn btn-primary btn-block" onClick={this.onFinalClickHandler.bind(this)}>
                                                    Get Packages
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-10 venuetbl" style={this.state.showPackageTable} id="packagesapiresult">

                                    <table className="table tbl col-md-12">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>description</th>
                                                <th>duration</th>
                                                <th>money</th>
                                                <th>holiday money</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {packages.map((p, index) => (

                                                <tr key={index} >
                                                    <td>{p.packageID}</td>
                                                    <td>{p.name}</td>
                                                    <td>{p.description}</td>
                                                    <td>{p.duration}</td>

                                                    <td>{p.money}</td>
                                                    <td>{p.holidayMoney}</td>
                                                    <td>
                                                        <a title="Update/Edit">
                                                            <i className="fa fa-pencil" aria-hidden="true" onClick={(evt) => this.showupdate(p)} />
                                                        </a>
                                                        <a title="Delete">
                                                            <i className="fa fa-trash" aria-hidden="true" onClick={(evt) => this.delpackages(p)} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Package Table */}
                                {/* Create Package Form */}

                                <div className="col-md-10 venuefrm" id="newpackages" style={{ display: "none" }}  >
                                    <form className="frm" onSubmit={this.createpackage}>
                                        <h2>new package</h2>
                                        <div className="row sl-3">
                                            <label className="col-md-12">Select Venue</label>
                                            <select className="col-md-12" value={this.state.venueid}
                                                // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                                onChange={this.handleChange.bind(this)} required>
                                                <option>Choose Venue Name </option>
                                                {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                                    < option key={index} value={allvanues.venueID} > {allvanues.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="row sl-3">
                                            <label className="col-md-12">Select Product</label>
                                            <select id="choose-packages" className="col-md-12" value={this.state.ProductID} onChange={evt => {
                                                this.setState({ ProductID: evt.target.value });
                                            }} required >
                                                <option >Choose Product Name </option>
                                                {this.props.customAllProducts.map((Allproducts, index) => (
                                                    <option value={Allproducts.productID}>{Allproducts.name}  ---- {Allproducts.description}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venuename"
                                                placeholder="Package Name"
                                                value={this.state.name} onChange={evt => {
                                                    this.setState({ name: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>description</label>
                                            <textarea
                                                type="address"
                                                className="form-control"
                                                id="address"
                                                placeholder="Description"
                                                value={this.state.description} onChange={evt => {
                                                    this.setState({ description: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>time duration</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="contact"
                                                placeholder="Duration"
                                                value={this.state.duration} onChange={evt => {
                                                    this.setState({ duration: evt.target.value });
                                                }}
                                                required />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>money</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="contact"
                                                placeholder="Money"
                                                value={this.state.money} onChange={evt => {
                                                    this.setState({ money: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Holiday money</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="holidaymoney"
                                                placeholder="Holiday Money"
                                                value={this.state.holidayMoney} onChange={evt => {
                                                    this.setState({ holidayMoney: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <button type="submit" className="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        //    onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "add"}
                                        </button>
                                        <button className="btn" style={{ float: "right" }} onClick={this.unshowproduct}>
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                                {/* Create Package Form */}


                                {/* Update Package Form */}

                                <div className="col-md-10 venuefrm" id="updatepackages" style={{ display: "none" }} >
                                    <form className="frm" onSubmit={this.updatepackage}>
                                        <h2>Update package</h2>

                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venuename"
                                                placeholder="package name"
                                                value={this.state.PackageID} onChange={evt => {
                                                    this.setState({ PackageID: evt.target.value });
                                                }}
                                                style={{ display: "none" }} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venuename"
                                                placeholder="package name"
                                                value={this.state.name} onChange={evt => {
                                                    this.setState({ name: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>description</label>
                                            <textarea
                                                type="address"
                                                className="form-control"
                                                id="address"
                                                placeholder="description"
                                                value={this.state.description} onChange={evt => {
                                                    this.setState({ description: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>time duration</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="contact"
                                                placeholder="duration"
                                                value={this.state.duration} onChange={evt => {
                                                    this.setState({ duration: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>money</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="contact"
                                                placeholder="money"
                                                value={this.state.money} onChange={evt => {
                                                    this.setState({ money: evt.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Holiday money</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="holidaymoney"
                                                placeholder="Holiday Money"
                                                value={this.state.holidayMoney} onChange={evt => {
                                                    this.setState({ holidayMoney: evt.target.value });
                                                }}
                                                required />
                                        </div>
                                        <button type="submit" className="btn"
                                            variant="primary"
                                            disabled={isLoading}
                                        // onClick={!isLoading ? this.handleClick : null}
                                        >
                                            {isLoading ? "Loading…" : "update"}
                                        </button>
                                        <a className="btn butn" style={{ float: "right" }} onClick={this.unshowproduct}>
                                            Cancel
                                        </a>
                                    </form>
                                </div>

                                {/* Update Package Form */}
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
    createpackage: v => dispatch(actions.createpackage(v)),
    updatepackagenew: v => dispatch(actions.updatepackagenew(v)),
    products: v => dispatch(actions.products(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    deletepackages: v => dispatch(actions.deletepackages(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PackageContent)
);
