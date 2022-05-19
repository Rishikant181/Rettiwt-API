// PACKAGE LIBS
import { MongoClient } from "mongodb";

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
    /**
     * @param database The name of the data where data operations are to be done
     * @param index The name of the index table(if any)
     */
    constructor(database: string, index: string) {
        // Initialising the connection url to database server
        this.connUrl = `mongodb://${process.env.CACHE_DB_HOST}:${process.env.CACHE_DB_PORT}`;

        // Initialising names
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
        return this.client.connect()
        // Testing connection to database
        .then(() => this.client.db(this.dbName).command({ ping: 1 }))
        // If connection successful
        .then(() => true)
        // If Connection failed
        .catch((err) => {
            console.log("Failed to connect to database server");            
            return false;
        });
    }
    
    /**
     * @summary Stores the given data in the given table of the database
     * @param data The data to be stored
     * @param table The table in which the data is to be stored
     * @returns Whether write was successful or not
     */
    protected async write(data: any, table: string): Promise<boolean> {
        // If connection to db was successful
        if (await this.connectDB()) {
            // Writing data to database's table
            return (await this.client.db(this.dbName).collection(table).insertOne(data)).acknowledged;
        }
        // If failed to connect to db
        else {
            return false;
        }
    }

    /**
     * @summary Clears the current database completely, including all indexes
     * @returns Whether clearing was successful or not
     */
    protected async clear(): Promise<boolean> {
        // If connection to database successful
        if (await this.connectDB()) {
            // Clearing the cache
            return await this.client.db(this.dbName).dropDatabase();
        }
        else {
            return false;
        }
    }
}