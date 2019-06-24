import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const CREATERFID = createAction("CREATERFID");
const getReport = createAction("GETREPORT");
const UPDATE_RFID = createAction("UPDATE_RFID");

export const createRFID = values => dispatch => {
  return axios
    .post(
      BACKEND_URL + "tableapi/RFID",
      {
        RFIDCd: values.RFIDCd,
        IsActive: true,
        friendlyRFID: values.friendlyRFID,
        VenueID: values.VenueID,
        venueName: values.venueName
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

export const updaterfidnew = values => dispatch => {
  return axios
    .put(
      BACKEND_URL + "tableapi/RFID/" + values.rfid,
      {
        rfidCd: values.rfid,
        // IsActive: true,
        friendlyRFID: values.friendlyRFID,
        // venueName: values.venueName,
        VenueID: values.VenueID
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then(res => {
      alert("Created Updated");
     
      // dispatch(UPDATE_RFID(res.data));
      // document.getElementById("updatepackages").style.display = "none";

      window.location.reload();
    })
    .catch(error => {
     
      alert(error.response.data.errorMessage);
      return Promise.reject();
    });
};
