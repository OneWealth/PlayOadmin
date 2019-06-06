import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const PLAYO_USER = createAction("PLAYO_USER");

export const playosuer = values => dispatch => {
    console.log(values);
    return axios.post(BACKEND_URL + "api/PlayoUser",
        {
            Username: values.Username,
            Password: values.Password,
            Email: values.RequestedAt,
            VenueId: values.VenueId,
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        console.log(res.response);
        document.getElementById("error").innerHTML =
            "";
        document.getElementById("success").innerHTML =
            "Done";
        dispatch(PLAYO_USER());
    })
        .catch(error => {
            document.getElementById("error").innerHTML =
                error.response.data.errorMessage;
            return Promise.reject();
        });
};
