// ENUMS
import { ELogActions } from '../../enums/Logging';

/**
 * Handles logging of data for debug purpose.
 *
 * @internal
 */
export class LogService {
	/** Whether logging is enabled or not. */
	private readonly enabled: boolean;

	public constructor() {
		this.enabled = true;
	}

	/**
	 * Logs the given data.
	 *
	 * @param data - The data to be logged.
	 */
	public log(action: ELogActions, data: NonNullable<unknown>): void {
		// Proceed to log only if logging is enabled
		if (this.enabled) {
			// Preparing the log message
			const logMessage: string = `[Rettiwt-API] [${action}] [${new Date().toString()}] ${JSON.stringify(data)}`;

			// Logging
			console.log(logMessage);
		}
	}
}
