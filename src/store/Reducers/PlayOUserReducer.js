import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    modeofpayment: []
};
const PlayOUserReducer = handleActions(
    {
        PLAYO_USER: (state, action) => {
            return { ...state, mailSent: true, ...action.payload };
        },
        MODEOFPAYMENT: (state, action) => {
            return { ...state, mailSent: true, modeofpayment: action.payload };
        }
    },
    INITIAL_STATE
);

export default PlayOUserReducer;
