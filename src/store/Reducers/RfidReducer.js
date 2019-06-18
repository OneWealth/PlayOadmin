import { handleAction } from "redux-actions";

const INITIAL_STATE = {
    result: [],
    resultrecieved: false
};

const PlayOUserReducer = handleAction(
    "GETREPORT",
    (state, action) => ({
        ...action, resultrecieved: true, result: action.payload
    }),
    INITIAL_STATE
);

export default PlayOUserReducer;
