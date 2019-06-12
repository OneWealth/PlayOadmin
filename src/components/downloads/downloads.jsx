import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import { CSVLink, CSVDownload } from "react-csv";
import { async } from "q";
class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venueID: null,
            selectedProduct: null,
            linkedPackages: [],
            showPackageTable: {
                display: 'none',
            },
            packageId: null,
            productID: null,
            Range: null,
            DayStart: null,
            DayEnd: null,
            Month: null,
            Year: null
        };
        this.getdownloadlink = this.getdownloadlink.bind(this);
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
    }
    handleChange(evt) {
        if (evt.target.value === "All") {
            document.getElementById("packages1").style.display = "none";
            document.getElementById("products").style.display = "none";
        }
        else {
            document.getElementById("packages1").style.display = "block";
            document.getElementById("products").style.display = "block";
            this.getproducts(evt.target.value);
            this.setState({ venueID: evt.target.value, productID: '' });
        }
    }

    getproducts = async (id) => {
        this.props.products({
            id
        })
    };


    show = async (evt) => {
        var selectedVal = parseInt(document.getElementById("selectone").value);
        document.getElementById("year").style.display = selectedVal == 1 || selectedVal == 2 ? "inline-block" : "none";
        document.getElementById("month").style.display = selectedVal == 1 ? "inline-block" : "none";
        document.getElementById("startdate").style.display = selectedVal == 3 ? "inline-block" : "none";
        document.getElementById("enddate").style.display = selectedVal == 3 ? "inline-block" : "none";
        document.getElementById("day").style.display = selectedVal == 0 ? "inline-block" : "none";
        this.setState({ Range: evt.target.value })
    };



    getreports = async (evt) => {
        evt.preventDefault();
        await this.props.getreport({
            venueID: this.state.venueID,
            ProductId: this.state.productID,
            PackageId: this.state.PackageId,
            DayStart: this.state.DayStart,
            DayEnd: this.state.DayEnd,
            Month: this.state.Month,
            Year: this.state.Year,
            Range: this.state.Range
        })
    };


    getdownloadlink = () => {
        if (this.props.RESULT.result.length == 0) {
            return (
                ""
            )
        }
        return (<CSVDownload data={this.props.RESULT.result} target="_blank" id="csvresult" />);
    }

    render() {
        let { customAllProducts } = this.props;
        let packages = [];

        if (customAllProducts.length > 0 && parseInt(this.state.productID)) {
            let _c = customAllProducts.filter((c) => c.productID == this.state.productID);
            packages = _c[0].linkedPackages;
        }

        return (
            <div className="row mg-top">
                <div className="col-md-12 main-heading">
                    <h2>Reports</h2>
                </div>
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-12 venuefrm">
                            <form className="frm" >
                                <div className="row sl-3">
                                    <label className="col-md-3">Venue</label>
                                    <select className="col-md-9" value={this.state.venueid}
                                        // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                        onChange={this.handleChange.bind(this)}>
                                        <option value="0">All Venue</option>

                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            < option value={allvanues.venueID} > {allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="row sl-3" id="products">
                                    <label className="col-md-3">Product</label>
                                    <select id="choose-packages" className="col-md-9" value={this.state.productID} onChange={(e) => this.setState({ productID: e.target.value, showPackageTable: { display: 'none' } })}>
                                        <option selected value="0">All Product  </option>

                                        {this.props.customAllProducts.map((Allproducts, index) => (

                                            <option value={Allproducts.productID}>{Allproducts.name}</option>
                                        ))}

                                    </select>
                                </div>


                                <div className="row sl-3" id="packages1">
                                    <label className="col-md-3">Package</label>
                                    <select className="col-md-9" value={this.state.PackageId} onChange={(e) => this.setState({ PackageId: e.target.value })} >
                                        <option selected value="0">All Package</option>
                                        {packages.map((p, index) => (
                                            <option value={p.packageID}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="row sl-3" id="alldate" >
                                    <div className="row">
                                        <label className="col-md-12">Filter by Year/Month/Day</label>

                                        <select className="col-md-12" value={this.state.Range}
                                            onChange={this.show} id="selectone">
                                            <option selected value="-1">Choose...</option>
                                            <option value="2" >Year</option>
                                            <option value="1">Month</option>
                                            <option value="0">Date</option>
                                            <option value="3">Custom</option>
                                        </select>

                                        <select className="col-md-5" id="year" style={{ display: "none", marginTop: "10px"  }}
                                            value={this.state.Year} onChange={(e) => this.setState({ Year: e.target.value })}

                                        >
                                            <option selected value="0">Select Year</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>

                                        </select>

                                        <select className="col-md-5 offset-md-1" id="month" style={{ display: "none", marginTop: "10px"  }}
                                            value={this.state.Month} onChange={(e) => this.setState({ Month: e.target.value })}
                                        >
                                            <option selected value="0">Select Month</option>
                                            <option value="1">Jan</option>
                                            <option value="2">Feb</option>
                                            <option value="3">Mar</option>
                                            <option value="4">Apr</option>
                                            <option value="5">May</option>
                                            <option value="6">Jun</option>
                                            <option value="7">Jul</option>
                                            <option value="8">Aug</option>
                                            <option value="9">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>


                                        <input
                                            type="date"
                                            class="form-control col-md-12 "
                                            placeholder="Choose Date"
                                            value={this.state.DayStart} onChange={evt => {
                                                this.setState({ DayStart: evt.target.value });
                                            }}
                                            id="day"
                                            required style={{ display: "none", marginTop: "10px", marginTop: "10px"  }} />



                                        <input
                                            type="date"
                                            class="form-control col-md-12 "
                                            placeholder="Start Date"
                                            value={this.state.DayStart} onChange={evt => {
                                                this.setState({ DayStart: evt.target.value });
                                            }}
                                            id="startdate"
                                            required style={{ display: "none", marginTop: "10px" }} />


                                        <input
                                            type="date"
                                            class="form-control col-md-12"
                                            placeholder="End Date"
                                            value={this.state.DayEnd} onChange={evt => {
                                                this.setState({ DayEnd: evt.target.value });
                                            }}
                                            id="enddate"
                                            required style={{ display: "none", marginTop: "10px" }} />
                                    </div>
                                </div>

                                <button type="submit" class="btn" onClick={this.getreports}>
                                    Download Data
                                </button>

                                {this.props.RESULT.result ? this.getdownloadlink() : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}





const mapStateToProps = state => {
    return ({
        allvenues: state.venue,
        customAllProducts: state.products.allproducts,
        allvenues: state.venue,
        RESULT: state.Rfid
    })
};
const mapDispatchToProps = dispatch => ({
    products: v => dispatch(actions.products(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    getreport: v => dispatch(actions.getreport(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Downloads)
);