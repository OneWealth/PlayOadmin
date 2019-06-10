import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class modeofpayment extends Component {
    state = {
        modeofpayment: null,
    };
    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        await this.props.getmodeofpayment();
        let paymentmode = [];
        for (var i = 0; i < paymentmode; i++) {

        }
    }

    getmodeofpayment = async (evt) => {
        evt.preventDefault();
        await this.props.getmodeofpayment({
        }).then(() => {
        })
    }

    render() {
        return (
            <div className="row mg-top">
                <div className="col-md-12 main-heading">
                    <h2>Mode Of Payment</h2>
                </div>
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-12 venuefrm">

                            <table className="table tbl" style={{ marginTop: "20px" }} >
                                <thead>
                                    <tr>
                                        <th>Mode of Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.payment.modeofpayment.items && this.props.payment.modeofpayment.items && this.props.payment.modeofpayment.items.map((paymentmode) => {
                                        return (
                                            <tr>
                                                <td> {paymentmode.paymentName}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
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
    getmodeofpayment: (v) => dispatch(actions.getmodeofpayment(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(modeofpayment)
);