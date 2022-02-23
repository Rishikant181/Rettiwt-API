// PACKAGE LIBS
import { MongoClient } from "mongodb";

// CUSTOM LIBS
import { config } from '../config/env';

/**
 * This service handles reading and writing of data from and to cache
 */
export class CacheService {
    // MEMBER DATA
    private client: MongoClient;                                        // To store the connection to mongodb database
    private connUrl: string;                                            // To store the connection url

    // MEMBER METHODS
    constructor() {
        // Initialising the connection url to database server
        this.connUrl = `${config['server']['db']['host']}:${config['server']['db']['port']}`;

        // Creating connection to database
        this.client = new MongoClient(this.connUrl);
    }
}