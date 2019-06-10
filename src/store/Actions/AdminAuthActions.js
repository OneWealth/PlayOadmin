import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const VERIFY_ADMIN = createAction("VERIFY_ADMIN");

export const verifyadmin = values => dispatch => {
  return axios
    .post(BACKEND_URL + "api/token", {
      username: values.username,
      password: values.password,
      RequestedAt: values.RequestedAt,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      crossdomain: true
    })
    .then(res => {
      localStorage.setItem("token", "Bearer " + res.data.token);
      dispatch(VERIFY_ADMIN());
    })
    .catch(error => {
      document.getElementById("emailerror").innerHTML =
        error.response.data.errorMessage;
      return Promise.reject();
    });
};
