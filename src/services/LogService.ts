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
	public log(data: NonNullable<unknown>): void {
		// Proceed to log only if logging is enabled
		if (this.enabled) {
			console.log(data);
		}
	}
}
