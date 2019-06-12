import React, { Component } from "react";
import { Tab, Tabs, Col, Nav, Row } from "react-bootstrap";
import Menu from "../menu/menu";
import AddUser from "../adduser/adduser";
import Venue from "../venues/venues";
import RightDashboard from "../rightdashboard/rightdashboard";
import Product from "../product/product";
import Package from "../package/package";
import Downloads from "../downloads/downloads";
import ModeOfPayment from "../modeofpayment/modeofpayment";
import RFID from "../RFID/RFID";
import "./dashboard.css";

import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: "/"
            });
        }
    }
    render() {
        return (
            <div className="row main">
                <div className="col-md-12">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={2} className="sidenavbar">
                                <Menu />
                            </Col>
                            <Col sm={10} className="rightbar">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <RightDashboard />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <AddUser />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <Venue />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="forth">
                                        <Product />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fifth">
                                        <Package />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="sixth">
                                        <Downloads />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="seventh">
                                        <ModeOfPayment />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="eight">
                                        <RFID />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);
