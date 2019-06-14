import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../store/Actions/Index";
import { withRouter } from "react-router";
import RevenueDetailTable from "../revenuedetailtable";

class MonthlyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monlthyDetailRevenue: [],
      range: 1,
      daystart: this.props.daystart,
      venueid: 0
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }

    this.fetchRevenue();
  }
  fetchRevenue = () => {
    this.props
      .monthlydetailrevenue({
        range: this.state.range,
        daystart: this.state.daystart,
        venueid: this.state.venueid
      })
      .then(() => {
        this.setState({
          monlthyDetailRevenue: this.props.allrevenues.monthlydetailrevenue
        });
        setTimeout(() => {
          this.fetchRevenue();
        }, 5000);
      });
  };
  render() {
    const allrevenue = this.state.monlthyDetailRevenue;
    return <RevenueDetailTable revenuedata={{ allrevenue }} />;
  }
}

const mapStateToProps = state => {
  return {
    allrevenues: state.revenue
  };
};
const mapDispatchToProps = dispatch => ({
  monthlydetailrevenue: v => dispatch(actions.monthlydetailrevenue(v))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonthlyDetail)
);
