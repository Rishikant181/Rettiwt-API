import { ELogActions } from '../../enums/Logging';

/**
 * Handles logging of data for debug purpose.
 *
 * @internal
 */
export class LogService {
	/** Whether logging is enabled or not. */
	public static enabled: boolean = false;

	/**
	 * Logs the given data.
	 *
	 * @param data - The data to be logged.
	 */
	public static log(action: ELogActions, data: NonNullable<unknown>): void {
		// Proceed to log only if logging is enabled
		if (this.enabled) {
			// Preparing the log message
			const logMessage: string = `[Rettiwt-API] [${action}] [${new Date().toISOString()}] ${JSON.stringify(
				data,
			)}`;

			// Logging
			console.log(logMessage);
		}
	}
}
