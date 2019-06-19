import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    holidays: [],
};
const HolidayReducer = handleActions(
    {
        HOLIDAY: (state, action) => {
            return { ...state, holidays: action.payload };
        },
    },
    INITIAL_STATE
);

export default HolidayReducer;
