import { handleActions } from "redux-actions";

const INITIAL_STATE = {
  zxc: "asds",
  mailSent: false
};
const AdminAuthReducer = handleActions(
  {
    VERIFY_ADMIN: (state, action) => {
      return { ...state, mailSent: true, ...action.payload };
    }
  },
  INITIAL_STATE
);

export default AdminAuthReducer;
