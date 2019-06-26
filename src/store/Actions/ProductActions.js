import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const api_get_product = 'tableapi/products/adminproduct/';
const GET_PRODUCTS = createAction("GET_PRODUCTS");
const CREATE_PRODUCT = createAction("CREATE_PRODUCT");
const UPDATE_PRODUCT = createAction("UPDATE_PRODUCT");
const CREATE_PACKAGE = createAction("CREATE_PACKAGE");
const UPDATE_PACKAGE = createAction("UPDATE_PACKAGE");

export const products = values => dispatch => {
    axios
        .get(BACKEND_URL + api_get_product + values.id, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch(GET_PRODUCTS(res.data.items));
        })
        .catch(error => {
            return Promise.reject();
        });
};

export const createproduct = values => dispatch => {
    return axios
        .post(
            BACKEND_URL + "tableapi/products",
            {
                venueID: values.venueID,
                Name: values.Name,
                Description: values.Description,
                isActive: "true",
                timeDependentFlag: values.timeDependentFlag
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(CREATE_PRODUCT(res.data));
            //document.getElementById("packages").style.display = "none";
            alert("Created Successfully");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const updateproduct = values => dispatch => {

    return axios
        .put(
            BACKEND_URL + "tableapi/products/" + values.productID,
            {
                productid: values.productID,
                Name: values.Name,
                Description: values.Description,
                timeDependentFlag: values.timeDependentFlag
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(UPDATE_PRODUCT(res.data));
            // document.getElementById("product").style.display = "none";
            alert("Created Updated");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const createpackage = values => dispatch => {

    return axios
        .post(
            BACKEND_URL + "tableapi/Packages",
            {
                Name: values.Name,
                Description: values.Description,
                Duration: values.Duration,
                holidayMoney: values.holidayMoney,
                Money: values.Money,
                ProductID: values.ProductID,
                isActive: "true"
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(CREATE_PACKAGE(res.data));
            //document.getElementById("packages").style.display = "none";
            alert("Created Successfully");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const updatepackagenew = values => dispatch => {
    return axios
        .put(
            BACKEND_URL + "tableapi/Packages/" + values.PackageID,
            {
                Name: values.Name,
                Description: values.Description,
                Duration: values.Duration,
                Money: values.Money,
                HolidayMoney: values.HolidayMoney,
                PackageID: values.PackageID
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            dispatch(UPDATE_PACKAGE(res.data));
            // document.getElementById("updatepackages").style.display = "none";
            alert("Created Updated");
            window.location.reload();
        })
        .catch(error => {
            alert("Something Went Wrong");
            return Promise.reject();
        });
};

export const deletepackages = values => dispatch => {

    axios.delete(BACKEND_URL + "tableapi/Packages/" + values.PackageID, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(res => {

            alert("Deleted Successfully");
            dispatch(CREATE_PACKAGE(res.data));
            window.location.reload();
        })
        .catch(error => {
            return Promise.reject();
        });
};
