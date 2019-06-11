import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";


const CREATERFID = createAction("CREATERFID");
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
