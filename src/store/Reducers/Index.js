import { combineReducers } from "redux";
import AdminAuthReducer from "./AdminAuthReducers";
import VenueReducer from "./VenueReducer";
import ProductReducer from "./ProductReducers";
import PlayOUserReducer from "./PlayOUserReducer";
import RevenueReducer from "./RevenueReducer";
export default combineReducers({
  auth: AdminAuthReducer,
  venue: VenueReducer,
  products: ProductReducer,
  playouser: PlayOUserReducer,
  revenue: RevenueReducer
});
