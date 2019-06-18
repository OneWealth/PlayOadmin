import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const ADD_VENUE = createAction("ADD_VENUE");
const CREATE_VENUE = createAction("CREATE_VENUE");
const UPDATE_VENUE = createAction("UPDATE_VENUE");
const GET_USER = createAction("GET_USER");

export const createvanue = values => dispatch => {
    return axios
        .post(
            BACKEND_URL + "tableapi/venues",
            {
                Name: values.Name,
                Adderess: values.Adderess,
                ContactNbr: values.ContactNbr,
                 GSTNbr:values.GSTNbr,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(CREATE_VENUE(res.data));
            alert("Created Successfully");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const verifyvenue = values => dispatch => {
    return axios
        .get(BACKEND_URL + "tableapi/venues", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch(ADD_VENUE(res.data));
        })
        .catch(error => {
            return Promise.reject();
        });
};

export const updatedata = values => dispatch => {
    return axios
        .put(
            BACKEND_URL + "tableapi/venues/" + values.venueID,
            {
                venueID: values.venueID,
                name: values.Name,
                adderess: values.Adderess,
                contactNbr: values.ContactNbr,
                GSTNbr:values.GSTNbr,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(UPDATE_VENUE(res.data));
            alert("successfully Updated");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const getvenueuser = values => dispatch => {
    return axios
        .get(BACKEND_URL + "adminapi/PlayoUser/venue/" + values.venueID, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch(GET_USER(res.data));
        })
        .catch(error => {
            return Promise.reject();
        });
};
