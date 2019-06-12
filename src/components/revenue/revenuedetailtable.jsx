import React, { Component } from "react";

export default class RevenueDetailTable extends React.PureComponent {

    constructor(props) {
        super(props);
        /*
         "date": "2019-06-05T00:00:00",
                    "venueId": 1,
                    "venueName": "Logix Mall Noida",
                    "productName": null,
                    "packageName": null,
                    "revenue": 400,
                    "footFall": 1
        */
    }


    ShowRevenueRowsWithVenueHeader = () => {

        const allrevenue = this.props.revenuedata.allrevenue;
        if (allrevenue === null || allrevenue === undefined || allrevenue.length === undefined || allrevenue.length === 0) return;

        var availableVenues = [];

        allrevenue.forEach(function (item, index) {
            if (availableVenues.indexOf(item.venueId) == -1) { availableVenues.push(item.venueId); }
        }
        );

        var displaydata = [];

        availableVenues.forEach(function(item,index){
        var bfirst = false;
            allrevenue.filter(x=> x.venueId == item).forEach(
                function(vendetail,idx){
                if(bfirst===false)
                {
                    displaydata.push(
                        {
                            type:0,
                            name:vendetail.venueName

                        }
                    );

                    bfirst= true;
                }

                displaydata.push(
                    {
                        type:1,
                        date:vendetail.date.substring(0,10),
                        footFall:vendetail.footFall,
                        revenue:vendetail.revenue,

                    }
                );
            }

            )
        });
 console.log('displaydata' + JSON.stringify(displaydata));
        return displaydata.map(            
            (item, index) => (
               item.type==1?this.linecomponent(item):this.headercomponent(item)
            )
        );
    }

    headercomponent = (item)=>{
        return   ( <tr>
        <td colSpan='3'><strong>{item.name}</strong></td>
    </tr>)
    }

    linecomponent = (item)=>{
        return   ( <tr>
        <td>{item.date}</td>
        <td>{item.footFall}</td>
        <td>{item.revenue}</td>
    </tr>)
    }

    render() {



        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Footfall</th>
                        <th scope="col">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.ShowRevenueRowsWithVenueHeader()

                    }
                </tbody>
            </table>
        );
    }
}