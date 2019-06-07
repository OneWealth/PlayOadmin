import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../store/Actions/Index";
import { withRouter } from "react-router";
class RevenueTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: "",
      month: "",
      year: ""
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
    this.props
      .monthlyrevenue({
        range: this.props.range,
        month: this.props.month,
        year: this.props.year
      })
      .then(() => {
        let allrevenue = [];
        for (var i = 0; i < allrevenue; i++) {}
      });
    console.log(this.props.allrevenues.revenues);
    // let revenuedata = [];
    // for(i=0 , revenuedata>0, )
  }

  // var today = new Date();
  // var date =
  //   today.getFullYear() +
  //   "-" +
  //   (today.getMonth() + 1) +
  //   "-" +
  //   today.getDate();
  // document.getElementById("RequestedAt").value = date;

  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Venue Name</th>
            <th scope="col">Footfall</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {/* {this.props.allrevenue.monthlyrevenue.items &&
            this.props.allrevenue.monthlyrevenue.items &&
            this.props.allrevenue.monthlyrevenue.items.map(
              (allrevenue, index) => (
                <tr>
                  <td>{allrevenue.range}</td>
                  <td>{allrevenue.month}</td>
                  <td>{allrevenue.year}</td>
                </tr>
              )
            )} */}
          {/*<tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
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
  )(RevenueTable)
);
