import React, { Component } from "react";
import "./Holidays.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SideBar from "../sidebar/sidebar";
import actions from "../../store/Actions/Index";
import EditHoliday from "./EditHoliday";

class Holidays extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            venueID: "",
            holiday: "",
            isholiday: "",
            reason: ""
        };
    }
    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: "/"
            });
        }
        await this.props.holidays();
        let holidaypackages = [];
        for (var i = 0; i < holidaypackages; i++) { }
    }
    showupdate1 = async () => {
        document.getElementById("editholiday").style.display = "block";
        document.getElementById("holidayapiresult").style.display = "none";
    };

    showupdate = async (holidaypackages) => {
        await this.props.deleteholiday({
            id: holidaypackages.id,
        })
    };


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 outputonclick">
                            <div className="col-md-12 main-heading">
                                <h2>Holidays</h2>
                            </div>
                            <div className="col-md-10 add">
                                <a href="#" onClick={this.showupdate1}>+ add Holiday</a>
                            </div>
                            <div className="col-md-10 holidayfrm" id="holidayapiresult">
                                <table className="table tbl" style={{ marginTop: "20px" }}>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>VenueID</th>
                                            <th>Holiday</th>
                                            <th>Is Holiday</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.allholidays &&
                                            this.props.allholidays &&
                                            this.props.allholidays.map(holidaypackages => {
                                                return (
                                                    <tr>
                                                        <td> {holidaypackages.id}</td>
                                                        <td> {holidaypackages.venueID}</td>
                                                        <td> {holidaypackages.holiday.substring(0, 10)}</td>
                                                        <td> {holidaypackages.isHoliday ? "True" : "False"}</td>

                                                        <td>
                                                            <a href="#" title="Update/Edit">
                                                                <i
                                                                    class="fa fa-trash"
                                                                    aria-hidden="true"
                                                                    onClick={(evt) => this.showupdate(holidaypackages)}
                                                                />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-12" id="editholiday" style={{ display: "none" }}>
                                <EditHoliday />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    allholidays: state.holiday.holidays
});
const mapDispatchToProps = dispatch => ({
    holidays: v => dispatch(actions.holidays(v)),
    deleteholiday: v => dispatch(actions.deleteholiday(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Holidays)
);