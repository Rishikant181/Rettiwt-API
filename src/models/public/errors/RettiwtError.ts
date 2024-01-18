/**
 * Represents an error that arises inside the package.
 *
 * @internal
 */
export class RettiwtError extends Error {
	public constructor(message?: string) {
		super(message);

		Object.setPrototypeOf(this, RettiwtError.prototype);
	}
}
