import { ClientTransaction } from 'x-client-transaction-id';

/**
 * Generates an X client transaction ID using the default generator.
 *
 * @public
 */
export async function generateTransactionId(document: Document, method: string, url: string): Promise<string> {
	// Create and initialize ClientTransaction instance
	const transaction = await ClientTransaction.create(document);

	// Getting the URL path excluding all params
	const path = new URL(url).pathname.split('?')[0].trim();

	// Generating the transaction ID
	return transaction.generateTransactionId(method.toUpperCase(), path);
}
