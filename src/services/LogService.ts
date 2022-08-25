/**
 * @summary Manages logging of various activities of the api and other logging tasks
 */
export class LogService {
    // MEMBER DATA
    private static instance: LogService;                                                    // To store the only instance of the class
    
    // MEMBER METHODS
    private LogService() {

    }

    /**
     * @returns The only instance of the class
     */
    static getInstance(): LogService {
        // If in instance does not exist already
        if(!this.instance) {
            // Creating a new instance
            this.instance = new LogService();
        }

        return this.instance;
    }
}