// Declaring the environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CACHE_DB_HOST: string,                              // To store the hostname of the caching database
            CACHE_DB_PORT: number,                              // To store the port number of caching database
            APP_PORT: number                                    // To store the port on which this app runs
        }
    }
}

export {};