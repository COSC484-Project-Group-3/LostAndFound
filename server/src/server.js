import { MongoDB } from "./config/mongo.config.js";

export class Server {
    /**
     * A function to start the server
     */
    static start() {
        // connect to db
        MongoDB.init();
    }
}
