import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./revenue.css";
import Monthly from "../revenue/monthly/monthly";
import Daily from "../revenue/daily/daily";
import MonthlyDetail from "../revenue/monthlydetail/monthlydetail";
import SideBar from "../sidebar/sidebar";

class Revenue extends Component {
  constructor(props) {
    super(props);
    var todayData = this.calculateTodayData();

    this.state = {
      todayRevenue: todayData.todayRevenue,
      monthRevenue: todayData.month
    };
  }

  calculateTodayData = () => {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var m = now.getFullYear() + "-" + month;
    return { todayRevenue: today, month: m };
  };

  componentDidMount() {}

  render() {
    const todayRevenue = this.state.todayRevenue;
    const monthRevenue = this.state.monthRevenue;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2">
              <SideBar />
            </div>
            <div className="col-md-10 outputonclick">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Card className="revenuecard">
                    <Card.Header>
                      Monthly Revenue{" "}
                      <span id="date" style={{ float: "right" }}>
                        {monthRevenue}
                      </span>{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Monthly daystart={todayRevenue} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6 col-sm-12">
                  <Card className="revenuecard">
                    <Card.Header>
                      Daily Revenue{" "}
                      <span id="date" style={{ float: "right" }}>
                        {todayRevenue}
                      </span>{" "}
                    </Card.Header>
                    <Card.Body>
                      <Daily daystart={todayRevenue} />
                      <Card.Text />
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <Card className="revenuecard">
                    <Card.Header>
                      Monthly Daily Revenue{" "}
                      <span id="date" style={{ float: "right" }}>
                        {monthRevenue}
                      </span>{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <MonthlyDetail daystart={todayRevenue} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Revenue;
