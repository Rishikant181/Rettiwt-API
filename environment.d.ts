// Declaring the environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CACHE_DB_HOST: string,
            CACHE_DB_PORT: number,
            APP_PORT: number
        }
    }
}

export {};