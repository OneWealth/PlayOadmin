import * as Auth from "./AdminAuthActions";
import * as Venue from "./VenueActions";
import * as products from "./ProductActions";
import * as playouser from "./PlayOUser";
import * as Revenue from "./RevenueAction";
import * as Rfid from "./RFID";
import * as holiday from "./Holiday";
export default {
    ...Auth,
    ...Venue,
    ...products,
    ...playouser,
    ...Revenue,
    ...Rfid,
    ...holiday
};
