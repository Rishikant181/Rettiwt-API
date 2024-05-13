import chalk from 'chalk';

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
	 * @param action - The action to be logged.
	 *
	 * @returns - The colored text representing the action.
	 */
	private static getColoredAction(action: ELogActions): string {
		if (action == ELogActions.WARNING) {
			return chalk.yellow(action);
		} else {
			return chalk.green(action);
		}
	}

	/**
	 * Logs the given data.
	 *
	 * @param action - The action to be logged.
	 *
	 * @param data - The data to be logged.
	 */
	public static log(action: ELogActions, data: NonNullable<unknown>): void {
		// Proceed to log only if logging is enabled
		if (this.enabled) {
			// Preparing the log message
			const logPrefix: string = chalk.blue('Rettiwt-API');
			const logTime: string = new Date().toISOString();
			const logAction: string = LogService.getColoredAction(action);
			const logData: string = JSON.stringify(data);

			const logMessage: string = `[${logPrefix}] [${logTime}] [${logAction}] ${logData}`;

			// Logging
			console.log(logMessage);
		}
	}
}
