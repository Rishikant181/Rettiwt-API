// Declaring the environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEVELOPMENT: string;                                // To store whether environment is production or development
            USE_CACHE: string;                                  // To store whether to use cache or not
            CACHE_DB_URL: string,                               // To store the url of the caching database
            DATA_DB_URL: string,                                // To store the url of the mongodb database
            APP_PORT: string                                    // To store the port on which this app runs
        }
    }
}

export {};