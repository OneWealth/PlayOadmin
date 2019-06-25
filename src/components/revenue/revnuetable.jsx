import React from "react";

export default class RevnueTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            venuename: "",
            footfall: "",
            revenue: ""
        };
    }
    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: "/"
            });
        }
    }
    componentWillUnmount() {
        clearTimeout(this.state.time)
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
            <tr key={index}>
                <td id="venuname">{item.venueName}</td>
                <td id="footfall">{item.footFall}</td>
                <td id="revenue">{item.revenue}</td>
            </tr>
        ));
        this.state.time = setTimeout(this.fetchRevenue, 5000)
    };




    render() {

        return (
            <table className="table">
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
                <i className="fa fa-refresh" aria-hidden="true" />
              </a>
            </th> */}
                    </tr>
                </thead>
                <tbody>{this.showrevneuerows()}</tbody>
            </table>
        );
    }
}
