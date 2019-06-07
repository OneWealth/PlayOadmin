import React, { Component } from "react";

export default class RevnueTable extends React.PureComponent {

    constructor(props) {
        super(props);

    }


    showrevneuerows = ()=>{

        const allrevenue = this.props.revenuedata.allrevenue;
        if(allrevenue === undefined || allrevenue.length === undefined || allrevenue.length === 0) return;
        return allrevenue.map(
            (item, index) => (
                <tr>
                    <td>{item.venueName}</td>
                    <td>{item.footFall}</td>
                    <td>{item.revenue}</td>
                </tr>
            )
        );
    }

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
                    {
                        this.showrevneuerows()
                        
                    }
                </tbody>
            </table>
        );
    }
}