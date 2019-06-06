import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    allproducts: [],
    mailSent: false
};
const ProductReducer = handleActions(
    {
        GET_PRODUCTS: (state, action) => {
            return { ...state, mailSent: true, allproducts: action.payload };
        },
        CREATE_PRODUCT: (state, action) => {
            return { ...state, mailSent: true, ...action.payload };
        }
    },
    INITIAL_STATE
);

export default ProductReducer;
