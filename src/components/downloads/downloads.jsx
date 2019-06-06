import React, { Component } from "react";

class Downloads extends Component {
    state = {};
    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }

    }
    render() {
        return (
            <div className="row mg-top">
                <div className="col-md-7 offset-md-2">
                    <div className="row">
                        <div className="col-md-12 venuefrm">
                            <form className="frm">
                                <div className="row sl-3">
                                    <label className="col-md-12">Venue</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">All</option>
                                        <option value="2">Venue</option>
                                    </select>
                                </div>
                                <div className="row sl-3">
                                    <label className="col-md-12">Venues</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>

                                <div className="row sl-3">
                                    <label className="col-md-12">Product</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">All</option>
                                        <option value="2">Product</option>
                                    </select>
                                </div>

                                <div className="row sl-3">
                                    <label className="col-md-12">Products</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>

                                <div className="row sl-3">
                                    <label className="col-md-12">Package</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">All</option>
                                        <option value="2">Package</option>
                                    </select>
                                </div>

                                <div className="row sl-3">
                                    <label className="col-md-12">Packages</label>
                                    <select className="col-md-12">
                                        <option selected>Choose...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>

                                <button type="submit" class="btn">
                                    add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Downloads;
