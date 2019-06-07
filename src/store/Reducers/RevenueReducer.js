import { handleActions } from "redux-actions";

const INITIAL_STATE = {
  revenues: {},
  dailyrevenue:{}
};
const RevenueReducer = handleActions(
  {
    MONTHLY_REVENUE: (state, action) => {
      return { ...state, revenues: action.payload };
    },
    DAILY_REVENUE: (state, action) => {
      return { ...state,  dailyrevenue: action.payload };
    }
  },
  INITIAL_STATE
);

export default RevenueReducer;
