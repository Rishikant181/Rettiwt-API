/** The normalized request data used to generate an X client transaction ID. */
export interface ITransactionIdInput {
	/** The uppercase HTTP method. */
	method: string;

	/** The request URL pathname without query parameters or fragments. */
	path: string;
}

/** The resolved X homepage in both raw and parsed forms. */
export interface IXHomepage {
	/** The parsed X homepage document. */
	document: Document;

	/** The raw HTML of the X homepage. */
	html: string;
}

/** Resources available to a custom transaction ID generator. */
export interface ITransactionIdGeneratorContext {
	/**
	 * Resolves the current X homepage through Rettiwt's configured HTTP client.
	 *
	 * @remarks
	 * This uses the configured headers, proxy, adapter and migration flow. It is
	 * only invoked when the custom generator calls it.
	 */
	resolveXHomepage(): Promise<IXHomepage>;
}

/**
 * A function that generates an X client transaction ID.
 *
 * @param input - The normalized request method and pathname.
 * @param context - Resources provided by the current Rettiwt instance.
 *
 * @returns The generated transaction ID.
 *
 * @public
 */
export type TransactionIdGenerator = (
	input: Readonly<ITransactionIdInput>,
	context: Readonly<ITransactionIdGeneratorContext>,
) => string | Promise<string>;
