// Declaring the environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            USE_CACHE: boolean;                                 // To store whether to use cache or not
            CACHE_DB_HOST: string,                              // To store the hostname of the caching database
            CACHE_DB_PORT: number,                              // To store the port number of caching database
            DATA_DB_HOST: string,                               // To store the hostname of the data db
            DATA_DB_PORT: number,                               // To store the port number of the data db
            CORE_HOST: string,                                  // To store the hostname of the core api
            CORE_PORT: number,                                  // To store the port number of the core api
            APP_PORT: number                                    // To store the port on which this app runs
        }
    }
}

export {};