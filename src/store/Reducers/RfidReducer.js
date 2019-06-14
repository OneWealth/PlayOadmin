import { handleAction } from "redux-actions";

const INITIAL_STATE = {
  result: [],
  resultrecieved: false
};

// const PlayOUserReducer = handleActions(
//   {
//     GETREPORT: (state, action) => {
//       return { ...state, resultrecieved: true, result: action.payload };
//     }
//   },
//   INITIAL_STATE
// );

const PlayOUserReducer = handleAction(
  "GETREPORT",
  (state, action) => ({
    result: action.payload
  }),
  INITIAL_STATE
);

export default PlayOUserReducer;
