import { combineReducers } from "redux";
import AdminAuthReducer from "./AdminAuthReducers";
import VenueReducer from "./VenueReducer";
import ProductReducer from "./ProductReducers";
import PlayOUserReducer from "./PlayOUserReducer";
export default combineReducers({
    auth: AdminAuthReducer,
    venue: VenueReducer,
    products: ProductReducer,
    playouser: PlayOUserReducer
});
