import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../store/Actions/Index";
import { withRouter } from "react-router";
import RevnueTable from '../revnuetable';

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {     
      allDailyRevenue :[],
      range:0,
      date: this.props.daystart
    };
  }  

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
    this.props
      .dailyrevenue({
        range: this.state.range,
        daystart: this.state.date
      })
      .then(() => {      
       this.setState({allDailyRevenue : this.props.allrevenues.dailyrevenue});        
      });    
  }  
  render() {

    const allrevenue = this.state.allDailyRevenue;

    return (
      <RevnueTable revenuedata={{allrevenue}} />
    );
  }
}

const mapStateToProps = state => {
  return {
    allrevenues: state.revenue
  };
};
const mapDispatchToProps = dispatch => ({
  dailyrevenue: v => dispatch(actions.dailyrevenue(v))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Daily)
);
