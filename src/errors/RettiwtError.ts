class RettiwtError extends Error {
    constructor(message?: string) {
        super(message);

        Object.setPrototypeOf(this, RettiwtError.prototype);
    }
}

export default RettiwtError;
