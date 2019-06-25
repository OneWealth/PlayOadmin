import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";

class ModeOfPayment extends Component {
    state = {
        modeofpayment: null
    };
    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: "/"
            });
        }
        await this.props.getmodeofpayment();
        let paymentmode = [];
        for (var i = 0; i < paymentmode; i++) { }
    }

    getmodeofpayment = async evt => {
        evt.preventDefault();
        await this.props.getmodeofpayment({}).then(() => { });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 outputonclick">
                            <div className="col-md-12 main-heading">
                                <h2>Mode Of Payment</h2>
                            </div>
                            <div className="col-md-10 venuefrm">
                                <table className="table tbl" style={{ marginTop: "20px" }}>
                                    <thead>
                                        <tr>
                                            <th>Mode of Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.payment.modeofpayment.items &&
                                            this.props.payment.modeofpayment.items &&
                                            this.props.payment.modeofpayment.items.map(
                                                (paymentmode, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <td> {paymentmode.paymentName}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    payment: state.playouser
});
const mapDispatchToProps = dispatch => ({
    getmodeofpayment: v => dispatch(actions.getmodeofpayment(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ModeOfPayment)
);
