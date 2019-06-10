import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./revenue.css";
import Monthly from "../revenue/monthly/monthly";
import Daily from "../revenue/daily/daily";

class Revenue extends Component {
    state = {
        date: null,
        month: null
    };
    componentDidMount() {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        var m = now.getFullYear() + "-" + (month);
        this.setState({ date: today });
        this.setState({ month: m });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <Card className="revenuecard">
                        <Card.Header>Monthly Revenue   <span id="date" style={{ float: "right" }}>{this.state.month}</span>  </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Monthly />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-6 col-sm-12">
                    <Card className="revenuecard">
                        <Card.Header>Daily Revenue  <span id="date" style={{ float: "right" }}>{this.state.date}</span> </Card.Header>
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
