import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    vanues: [],
    createvenue: [],
    updatedvanues: [],
    createuser: [],
    mailSent: false
};
const VenueReducer = handleActions(
    {
        ADD_VENUE: (state, action) => {
            return { ...state, mailSent: true, vanues: action.payload };
        },
        CREATE_VENUE: (state, action) => {
            return { ...state, mailSent: true, createvenue: action.payload };
        },
        UPDATE_VENUE: (state, action) => {
            return { ...state, mailSent: true, updatedvanues: action.payload };
        },
        CREATE_USER: (state,action) => {
            return {...state,mailSent: true, createuser: action.payload };
        }
    },
    INITIAL_STATE
);

export default VenueReducer;
