import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";



const CREATERFID = createAction("CREATERFID");
const getReport = createAction("GETREPORT");

export const createRFID = values => dispatch => {
    return axios
        .post(
            BACKEND_URL + "tableapi/RFID",
            {
                RFIDCd: values.RFIDCd,
                IsActive: true,
                friendlyRFID: values.friendlyRFID,
                VenueID: values.VenueID,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            alert("Create Successfull");
            dispatch(CREATERFID());
            window.location.reload();
        })
        .catch(error => {
            alert(error.response.data.errorMessage);
            return Promise.reject();
        });
};


export const getreport = values => dispatch => {
    return axios
        .post(
            BACKEND_URL + "billing/Information/",
            {
                venueID: values.venueID,
                ProductId: values.ProductId,
                PackageId: values.PackageId,
                DayStart: values.DayStart,
                DayEnd: values.DayEnd,
                Month: values.Month,
                Year: values.Year,
                Range: values.Range
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            alert("Report Created Successfull");
            dispatch(getReport(res.data.items));
        })
        .catch(error => {
            // alert(error.data.errorMessage);
            return Promise.reject();
        });
};



