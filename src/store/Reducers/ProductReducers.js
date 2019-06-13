import { handleActions } from "redux-actions";

const INITIAL_STATE = {
  allproducts: [],
  mailSent: false,
  modeofpayment: []
};
const ProductReducer = handleActions(
  {
    GET_PRODUCTS: (state, action) => {
      return { ...state, mailSent: true, allproducts: action.payload };
    },
    CREATE_PRODUCT: (state, action) => {
      return { ...state, mailSent: true, ...action.payload };
    },
    MODEOFPAYMENT: (state, action) => {
      return { ...state, mailSent: true, modeofpayment: action.payload };
    }
  },
  INITIAL_STATE
);

export default ProductReducer;
