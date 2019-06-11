import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    result: [],
    resultrecieved: false
};
const PlayOUserReducer = handleActions(
    {
        GETREPORT: (state, action) => {
            return { ...state, resultrecieved: true, result: action.payload };
        },

    },
    INITIAL_STATE
);

export default PlayOUserReducer;
