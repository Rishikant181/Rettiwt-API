/**
 * @summary Stores a single log entry
 */
export interface Log {
    time: Date
    message: string
    data: JSON
}