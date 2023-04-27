import mongoose from "mongoose";
import dotenv from "dotenv";

export class MongoDB {
    /**
     * Load environment variables and connect to database
     */
    static async init() {
        dotenv.config();
        this.connect();
    }

    /**
     * A function to connect to the database
     */
    static connect() {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log(`ERROR CONNECTING TO DATABASE: ${err}`);
                return;
            }
            console.log("SUCCESSFULLY CONNECTED TO DATABASE");
        });
    }

    /**
     * A function to disconnect from the database
     * 
     */
    static async disconnect() {
        await mongoose.disconnect();
        console.log("SUCCESSFULLY DISCONNECTED FROM DATABASE");
    }
}
