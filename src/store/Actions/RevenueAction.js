import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const MONTHLY_REVENUE = createAction("MONTHLY_REVENUE");
const DAILY_REVENUE = createAction("DAILY_REVENUE");

export const monthlyrevenue = values => dispatch => {
  return axios
    .get(
      BACKEND_URL +
        "billing/Information/revenue?Range=" +
        values.range +
        "&daystart=" +
        values.daystart, //+
        // "&Year=" +
        // values.year,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then(res => {
      dispatch(MONTHLY_REVENUE(res.data.items));
      console.log(res.data.items);
    })
    .catch(error => {
      return Promise.reject();
    });
};





export const dailyrevenue = values => dispatch => {
  return axios
    .get(
      BACKEND_URL +
        "billing/Information/revenue?Range=" +
        values.range +
        "&DayStart=" +
        values.daystart,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then(res => {
      dispatch(DAILY_REVENUE(res.data.items));
      console.log(res.data.items);
    })
    .catch(error => {
      return Promise.reject();
    });
};
