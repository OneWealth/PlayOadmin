import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const PLAYO_USER = createAction("PLAYO_USER");

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
