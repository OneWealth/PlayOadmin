import { combineReducers } from "redux";
import AdminAuthReducer from "./AdminAuthReducers";
import VenueReducer from "./VenueReducer";
import ProductReducer from "./ProductReducers";
import PlayOUserReducer from "./PlayOUserReducer";
import RevenueReducer from "./RevenueReducer";
import RfidReducer from "./RfidReducer";
import HolidayReducer from "./HolidayReducer";
export default combineReducers({
    auth: AdminAuthReducer,
    venue: VenueReducer,
    products: ProductReducer,
    playouser: PlayOUserReducer,
    revenue: RevenueReducer,
    Rfid: RfidReducer,
    holiday: HolidayReducer
});
