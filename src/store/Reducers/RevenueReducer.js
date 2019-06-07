import { handleActions } from "redux-actions";

const INITIAL_STATE = {
  revenues: {}
};
const RevenueReducer = handleActions(
  {
    MONTHLY_REVENUE: (state, action) => {
      return { ...state, mailSent: true, revenues: action.payload };
    }
  },
  INITIAL_STATE
);

export default RevenueReducer;
