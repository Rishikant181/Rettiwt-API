import type { RettiwtConfig } from '../models/RettiwtConfig';

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

/**
 * A function that generates an X client transaction ID.
 *
 * @param input - The normalized request method and pathname.
 * @param config - The current Rettiwt configuration.
 *
 * @returns The generated transaction ID.
 *
 * @public
 */
export type TransactionIdGenerator = (
	input: Readonly<ITransactionIdInput>,
	config: Readonly<RettiwtConfig>,
) => string | Promise<string>;
