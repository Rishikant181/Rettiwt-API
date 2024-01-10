class RettiwtError extends Error {
	public constructor(message?: string) {
		super(message);

		Object.setPrototypeOf(this, RettiwtError.prototype);
	}
}

export default RettiwtError;
