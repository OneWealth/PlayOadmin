import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Actions/Index";
import { withRouter } from "react-router";

class EditHoliday extends React.PureComponent {
    constructor(props) {
        super(props);
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
        await this.props.verifyvenue();
        let allvanues = [];
        for (var i = 0; i < allvanues; i++) {
            this.setState({ venueID: this.props.allvenues.vanues.items[i].venueID });
        }
    }

    HOLIDAYS = async evt => {
        evt.preventDefault();
        await this.props.createholiday({
            venueID: this.state.venueID,
            holiday: this.state.holiday,
            isholiday: this.state.isholiday,
            reason: this.state.reason
        })
    };


    unshow() {
        document.getElementById("editholiday").style.display = "none";
        document.getElementById("holidayapiresult").style.display = "block";
    }

    render() {
        return (
            <div className="col-md-10 holidayedit" >
                <form className="frm" onSubmit={this.HOLIDAYS}>
                    <h2>Edit Holiday Details</h2>

                    <div className="form-group col-md-12">
                        <label>Choose Venue Name</label>
                        <select
                            className="col-md-12"
                            value={this.state.venueID}
                            onChange={evt => {
                                this.setState({ venueID: evt.target.value });
                            }}
                        >
                            <option selected>Choose Venue Name </option>
                            {this.props.allvenues.vanues.items &&
                                this.props.allvenues.vanues.items &&
                                this.props.allvenues.vanues.items.map(
                                    (allvanues, index) => (
                                        <option value={allvanues.venueID}>
                                            {allvanues.name}
                                        </option>
                                    )
                                )}
                        </select>
                    </div>

                    <div class="form-group col-md-12">
                        <label>Holiday Date</label>
                        <input
                            type="date"
                            class="form-control"
                            value={this.state.holiday}
                            onChange={evt => {
                                this.setState({ holiday: evt.target.value });
                            }}
                            required />
                    </div>

                    <div class="form-group col-md-12">
                        <label>Reason</label>

                        <input
                            type="texarea"
                            class="form-control"
                            placeholder="Enter Reason of Holiday"
                            value={this.state.rfid}
                            onChange={evt => {
                                this.setState({ reason: evt.target.value });
                            }} />
                    </div>
                    <div class="form-group col-md-12">
                        <label for="dependent">
                            <input type="checkbox" value={this.state.isholiday}
                                onClick={evt => {
                                    this.setState({ isholiday: "true" });
                                }} id="mycheck" />
                            time dependent
                    </label>
                    </div>
                    <button
                        type="submit"
                        class="btn"
                        variant="primary">
                        Add Holiday
                    </button>
                    <a
                        class="btn butn"
                        style={{ float: "right" }}
                        onClick={this.unshow} >
                        Cancel
                       </a>
                </form>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    allvenues: state.venue,
});
const mapDispatchToProps = dispatch => ({
    verifyvenue: v => dispatch(actions.verifyvenue(v)),
    createholiday: v => dispatch(actions.createholiday(v)),
});


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditHoliday)
);


