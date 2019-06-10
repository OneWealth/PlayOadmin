import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const PLAYO_USER = createAction("PLAYO_USER");
const MODEOFPAYMENT = createAction("MODEOFPAYMENT");
const RFID = createAction("RFID");
export const playosuer = values => dispatch => {
    console.log(values);
    return axios
        .post(
            BACKEND_URL + "adminapi/PlayoUser",
            {
                Username: values.Username,
                Password: values.Password,
                Email: values.Email,
                VenueId: values.VenueId
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            document.getElementById("error").innerHTML = "";
            //document.getElementById("success").innerHTML = "Done";
            alert("Create Successfull");
            dispatch(PLAYO_USER());
        })
        .catch(error => {
            document.getElementById("error").innerHTML =
                error.response.data.errorMessage;
            return Promise.reject();
        });
};


export const getmodeofpayment = values => dispatch => {
    return axios.get(
        BACKEND_URL + "tableapi/ModeOfPayments", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        },
    ).then(res => {
        dispatch(MODEOFPAYMENT(res.data));
    })
        .catch(error => {
        });
};


export const rfid = values => dispatch => {
    return axios.get(
        BACKEND_URL + "tableapi/RFID", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        },
    ).then(res => {
        dispatch(RFID(res.data));
        console.log(res.data);
    })
        .catch(error => {
        });
};