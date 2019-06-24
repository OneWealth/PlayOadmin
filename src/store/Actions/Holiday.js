
import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const HOLIDAY = createAction("HOLIDAY");
const CREATE_HOLIDAY = createAction("CREATE_HOLIDAY");
export const holidays = values => dispatch => {
    axios
        .get(BACKEND_URL + "tableapi/Holiday", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch(HOLIDAY(res.data.items));
        })
        .catch(error => {
            return Promise.reject();
        });
};



export const createholiday = values => dispatch => {
    axios.post(BACKEND_URL + "tableapi/Holiday", {
        venueID: values.venueID,
        holiday: values.holiday,
        isholiday: values.isholiday,
        reason: values.reason,
        venueName:values.venueName,
    },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            alert("Created Successfully");
            dispatch(CREATE_HOLIDAY(res.data.items));
            window.location.reload();
        })
        .catch(error => {
            return Promise.reject();
        });
};



export const deleteholiday = values => dispatch => {
    axios.delete(BACKEND_URL + "tableapi/Holiday/" + values.id, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(res => {
            alert("Deleted Successfully");
            dispatch(CREATE_HOLIDAY(res.data.items));
            window.location.reload();
        })
        .catch(error => {
            return Promise.reject();
        });
};
