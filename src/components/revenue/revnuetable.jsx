import React, { Component } from "react";

export default class RevnueTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      venuename: "",
      footfall: "",
      revenue: ""
    };
  }

  // clearText = () => {
  //   this.setState({
  //     venuename: "",
  //     footfall: "",
  //     revenue: ""
  //   });
  // };
  // refresh = () => {
  //   const allrevenue = this.props.revenuedata.allrevenue;
  //   if (
  //     allrevenue === null ||
  //     allrevenue === undefined ||
  //     allrevenue.length === undefined ||
  //     allrevenue.length === 0
  //   )
  //     return;
  //   this.clearText();
  //   return allrevenue.map((item, index) => (
  //     <tr>
  //       <td id="venuname">{item.venueName}</td>
  //       <td id="footfall">{item.footFall}</td>
  //       <td id="revenue">{item.revenue}</td>
  //     </tr>
  //   ));
  // };

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push({
        pathname: "/"
      });
    }
    setInterval(() => {
      this.showrevneuerows();
    }, 5000);
  }

  showrevneuerows = () => {
    const allrevenue = this.props.revenuedata.allrevenue;
    if (
      allrevenue === null ||
      allrevenue === undefined ||
      allrevenue.length === undefined ||
      allrevenue.length === 0
    )
      return;

    return allrevenue.map((item, index) => (
      <tr>
        <td id="venuname">{item.venueName}</td>
        <td id="footfall">{item.footFall}</td>
        <td id="revenue">{item.revenue}</td>
      </tr>
    ));
  };

  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Venue Name</th>
            <th scope="col">Footfall</th>
            <th scope="col">Revenue</th>
            {/* <th>
              <a
                href="#"
                //onClick={this.refresh}
              >
                <i class="fa fa-refresh" aria-hidden="true" />
              </a>
            </th> */}
          </tr>
        </thead>
        <tbody>{this.showrevneuerows()}</tbody>
      </table>
    );
  }
}
