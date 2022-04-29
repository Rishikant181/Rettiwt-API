// PACKAGE LIBS
import {  MongoClient } from "mongodb";

/**
 * @summary Handles reading and writing of data from and to database.
 */
 export class DatabaseService {
    // MEMBER DATA
    private connUrl: string;                                              // To store the connection url
    protected client: MongoClient;                                        // To store the connection to mongodb database
    protected dbName: string;                                             // To store the name of database
    protected dbIndex: string;                                            // To store the name of the index table of db

    // MEMBER METHODS
    constructor(database: string, index: string) {
        // Initialising the connection url to database server
        this.connUrl = `mongodb://${process.env.CACHE_DB_HOST}:${process.env.CACHE_DB_PORT}`;

        // Initialising database and index name
        this.dbName = database;
        this.dbIndex = index;

        // Creating connection to database
        this.client = new MongoClient(this.connUrl);
    }

    /**
     * @summary Connects to the database
     * @returns Whether connection was successful or not
     */
    protected async connectDB(): Promise<boolean> {
        var success: boolean = false;                                           // To store whether connection to db successful or not

        // Trying to connect to database
        try {
            // Connecting to db
            await this.client.connect();

            // Verifying connection
            await this.client.db(this.dbName).command({ ping: 1 });

            success = true;
        }
        // If connecting to database failed
        catch (err) {
            console.log("Failed to connect to database server");
            console.log(err);
        }

        // Returning success or failure
        return Promise.resolve(success);
    }
}