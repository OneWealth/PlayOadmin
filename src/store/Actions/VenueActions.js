import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const ADD_VENUE = createAction("ADD_VENUE");
const CREATE_VENUE = createAction("CREATE_VENUE");
const UPDATE_VENUE = createAction("UPDATE_VENUE");
const GET_USER = createAction("GET_USER");

export const createvanue = values => dispatch => {
    return axios.post(
        BACKEND_URL + "tableapi/venues", {
            Name: values.Name,
            Adderess: values.Adderess,
            ContactNbr: values.ContactNbr,
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(CREATE_VENUE(res.data));
    }).catch(error => {
        return Promise.reject();
    });
};


export const verifyvenue = values => dispatch => {
    return axios.get(
        BACKEND_URL + "tableapi/venues",
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(ADD_VENUE(res.data));
    })
        .catch(error => {
            return Promise.reject();
        });
};



export const updatedata = values => dispatch => {
    return axios.put(
        BACKEND_URL + "tableapi/venues/" + values.venueID, {
            venueID: values.venueID,
            name: values.Name,
            adderess: values.Adderess,
            contactNbr: values.ContactNbr
        },
        {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }
    ).then(res => {
        dispatch(UPDATE_VENUE(res.data));
        document.getElementById("Sucess").innerHTML = "successfully Created";
        document.getElementById("venue").style.display = "none";
        document.getElementById("newvenue").style.display = "none";
    }).catch(error => {
        console.log(error.response)
    });
};


export const getuser = values => dispatch => {
    return axios.get(
        BACKEND_URL + "api/PlayoUser",
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(GET_USER(res.data));
    })
        .catch(error => {
            return Promise.reject();
        });
};
