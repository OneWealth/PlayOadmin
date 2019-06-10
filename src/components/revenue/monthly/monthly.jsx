import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../store/Actions/Index";
import { withRouter } from "react-router";
import RevnueTable from '../revnuetable';

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {     
      allmonthlyrevenue :[],
      range:1,
      month:6,
      year:2019
    };
  }

  

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
console.log('hello');

    this.props
      .monthlyrevenue({
        range: this.state.range,
        month: this.state.month,
        year: this.state.year
      })
      .then(() => {      
        this.setState({allmonthlyrevenue : this.props.allrevenues.revenues});
        console.log(this.props.allrevenues.revenues);
      });    
  }  
  render() {

    const allrevenue = this.state.allmonthlyrevenue;
console.log(allrevenue);
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
  monthlyrevenue: v => dispatch(actions.monthlyrevenue(v))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Monthly)
);
