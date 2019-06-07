import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./revenue.css";
import RevenueTable from "../revenue/monthly/monthly";
class Revenue extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Card bg="info" text="white">
            <Card.Header>Monthly Revenue</Card.Header>
            <Card.Body>
              {/* <Card.Title>Primary Card Title</Card.Title> */}
              <Card.Text>
                <RevenueTable range="1" month="6" year="2019" />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 col-sm-12">
          <Card bg="info" text="white">
            <Card.Header>Monthly Revenue</Card.Header>
            <Card.Body>
              {/* <Card.Title>Primary Card Title</Card.Title> */}
              <Card.Text />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Revenue;
