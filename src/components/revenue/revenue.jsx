import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./revenue.css";
import Monthly from "../revenue/monthly/monthly";
import Daily from "../revenue/daily/daily";

class Revenue extends Component {
    state = {};
    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <Card className="revenuecard">
                        <Card.Header>Monthly Revenue</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Monthly />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-6 col-sm-12">
                    <Card className="revenuecard">
                        <Card.Header>Daily Revenue</Card.Header>
                        <Card.Body>
                            <Daily />
                            <Card.Text />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Revenue;
