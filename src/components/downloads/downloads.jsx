import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
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
            packageID: "",
            VenueTyp: 1,
            ProductTyp: 0,
            ProductId: null,
            PackageTyp: 0,
            PackageId: null,
            Range: 1,
            DayStart: "2019-06-06",
            DayEnd: null,
            Month: 6,
            Year: 2019
        };
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
            document.getElementById("alldate").style.display = "block";
            document.getElementById("packages1").style.display = "none";
            document.getElementById("products").style.display = "none";
        }


        else {
            document.getElementById("alldate").style.display = "none";
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



    show = async (id) => {

        if (document.getElementById("selectone").value == "Year") {
            document.getElementById("year").style.display = "inline-block";
            document.getElementById("month").style.display = "none";
            document.getElementById("startdate").style.display = "none";
            document.getElementById("enddate").style.display = "none";
            document.getElementById("day").style.display = "none";
        }

        else if (document.getElementById("selectone").value == "Month") {
            document.getElementById("month").style.display = "inline-block";
            document.getElementById("year").style.display = "inline-block";
            document.getElementById("startdate").style.display = "none";
            document.getElementById("enddate").style.display = "none";
            document.getElementById("day").style.display = "none";
        }

        else if (document.getElementById("selectone").value == "Date") {
            document.getElementById("day").style.display = "inline-block";
            document.getElementById("year").style.display = "none";
            document.getElementById("month").style.display = "none";
            document.getElementById("startdate").style.display = "none";
            document.getElementById("enddate").style.display = "none";
        }
        else if (document.getElementById("selectone").value == "Custom") {
            document.getElementById("year").style.display = "none";
            document.getElementById("month").style.display = "none";
            document.getElementById("day").style.display = "none";
            document.getElementById("startdate").style.display = "inline-block";
            document.getElementById("enddate").style.display = "inline-block";
        }
        else {
            document.getElementById("year").style.display = "none";
            document.getElementById("month").style.display = "none";
            document.getElementById("day").style.display = "none";
            document.getElementById("startdate").style.display = "none";
            document.getElementById("enddate").style.display = "none";
        }
    };



    getreport = async (evt) => {
        evt.preventDefault();
        await this.props.getreport({
            venueID: this.state.venueID,
            ProductId: this.state.ProductId,
            PackageId: this.state.PackageId,
            DayStart: this.state.DayStart,
            DayEnd: this.state.DayEnd,
            Month: this.state.Month,
            Year: this.state.Year
        })
    };



    render() {
        if (this.props.customAllProducts.length > 0) {

        }
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
                            <form className="frm">
                                <div className="row sl-3">
                                    <label className="col-md-3">Venue</label>
                                    <select className="col-md-9" value={this.state.venueid}
                                        // evt => { this.setState({ venueid: evt.target.value }), this.getproducts }
                                        onChange={this.handleChange.bind(this)}>
                                        <option >Choose</option>
                                        <option value="All">All</option>
                                        {this.props.allvenues.vanues.items && this.props.allvenues.vanues.items && this.props.allvenues.vanues.items.map((allvanues, index) => (
                                            < option value={allvanues.venueID} > {allvanues.name}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="row sl-3" id="products">
                                    <label className="col-md-3">Product</label>
                                    <select id="choose-packages" className="col-md-9" value={this.state.ProductId} onChange={(e) => this.setState({ ProductId: e.target.value, showPackageTable: { display: 'none' } })}>
                                        <option selected>Choose Product Name </option>
                                        {this.props.customAllProducts.map((Allproducts, index) => (

                                            <option value={Allproducts.productID}>{Allproducts.name}</option>
                                        ))}

                                    </select>
                                </div>


                                <div className="row sl-3" id="packages1">
                                    <label className="col-md-3">Package</label>
                                    <select className="col-md-9" value={this.state.PackageId} onChange={(e) => this.setState({ PackageId: e.target.value })} >
                                        <option selected>Choose...</option>
                                        {packages.map((p, index) => (
                                            <option value={p.packageID}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="row sl-3" id="alldate" >
                                    <div className="row">
                                        <label className="col-md-12">Filter by Year/Month/Day</label>

                                        <select className="col-md-3" value={this.state.venueid}
                                            onChange={this.show} id="selectone">
                                            <option selected>Choose...</option>
                                            <option value="Year" >Year</option>
                                            <option value="Month">Month</option>
                                            <option value="Date">Date</option>
                                            <option value="Custom">Custom</option>
                                        </select>

                                        <select className="col-md-3 offset-md-1" id="year" style={{ display: "none" }}
                                            value={this.state.Year} onChange={(e) => this.setState({ Year: e.target.value })}

                                        >
                                            <option selected>2019</option>
                                            <option selected>2020</option>
                                            <option selected>2021</option>
                                            <option selected>2022</option>
                                            <option selected>2023</option>
                                            <option selected>2024</option>
                                            <option selected>2025</option>

                                        </select>

                                        <select className="col-md-3 offset-md-1" id="month" style={{ display: "none" }}
                                            value={this.state.Month} onChange={(e) => this.setState({ Month: e.target.value })}
                                        >
                                            <option selected>Jan</option>
                                            <option selected>Feb</option>
                                            <option selected>Mar</option>
                                            <option selected>Apr</option>
                                            <option selected>May</option>
                                            <option selected>Jun</option>
                                            <option selected>Jul</option>
                                            <option selected>Aug</option>
                                            <option selected>Sep</option>
                                            <option selected>Oct</option>
                                            <option selected>Nov</option>
                                            <option selected>Dec</option>
                                        </select>


                                        <input
                                            type="date"
                                            class="form-control col-md-12 "
                                            placeholder="Choose Date"
                                            value={this.state.DayStart} onChange={evt => {
                                                this.setState({ DayStart: evt.target.value });
                                            }}
                                            id="day"
                                            required style={{ display: "none", marginTop: "10px" }} />



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



                                <button type="submit" class="btn">
                                    Download Data
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}





const mapStateToProps = state => ({
    allvenues: state.venue,
    customAllProducts: state.products.allproducts,
    allvenues: state.venue,
});
const mapDispatchToProps = dispatch => ({
    products: v => dispatch(actions.products(v)),
    verifyvenue: v => dispatch(actions.verifyvenue(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Downloads)
);