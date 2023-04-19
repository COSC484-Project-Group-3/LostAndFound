import axios from "axios";
import { LOCATION_ROUTES } from "../constants/route";

export class LocationService {

    static async createLocation(location) {
        return await axios.post(LOCATION_ROUTES.CREATE_LOCATION(), location);
    }

}

export default LocationService;
