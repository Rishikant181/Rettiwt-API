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
        // Initializing member data
        this.connUrl = `mongodb://${process.env.DATA_DB_HOST}:${process.env.DATA_DB_PORT}`;
        this.dbName = database;
        this.dbIndex = index;
        this.client = new MongoClient(this.connUrl);
    }

    /**
     * @summary Connects to the database
     */
    protected async connectDB(): Promise<boolean> {
        try {
            // Connecting to db
            await this.client.connect();

            // Testing connection to database by making a ping to it
            await this.client.db(this.dbName).command({ ping: 1 });

            return true;
        }
        catch(err) {
            // If connection failed
            console.log("Failed to connect to database server");            
            throw err;
        }
    }
    
    /**
     * @summary Stores the given data in the given table of the database
     * @param data The data to be stored
     * @param table The table in which the data is to be stored
     * @returns Whether write was successful or not
     */
    protected async write(data: any, table: string): Promise<boolean> {
        try {
            // Connecting to db
            await this.connectDB();

            // Inserting the data into the db
            await this.client.db(this.dbName).collection(table).insertOne(data)

            return true;
        }
        catch(err) {
            // If insertion failed
            console.log("Failed to write to database");
            throw err;
        }
    }

    /**
     * @summary Clears the current database completely, including all indexes
     * @returns Whether clearing was successful or not
     */
    protected async clear(): Promise<boolean> {
        try {
            // Connecting to db
            await this.connectDB()

            // Clearing the db
            await this.client.db(this.dbName).dropDatabase()

            return true;
        }
        catch(err) {
            // If clearing failed
            console.log("Failed to clear database");
            throw err;
        }
    }
}