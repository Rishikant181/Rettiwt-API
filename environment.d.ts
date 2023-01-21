// Declaring the environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEVELOPMENT: string;                                // To store whether environment is production or development
            APP_PORT: string                                    // To store the port on which this app runs
        }
    }
}

export {};