import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    modeofpayment: [],
    rfid: []
};
const PlayOUserReducer = handleActions(
    {
        PLAYO_USER: (state, action) => {
            return { ...state, ...action.payload };
        },
        MODEOFPAYMENT: (state, action) => {
            return { ...state, modeofpayment: action.payload };
        },
        RFID: (state, action) => {
            return { ...state, rfid: action.payload };
        },
    },
    INITIAL_STATE
);

export default PlayOUserReducer;
