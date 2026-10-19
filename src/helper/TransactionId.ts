import { ClientTransaction } from 'x-client-transaction-id';

import { ITransactionIdInput } from '../types/TransactionId';

/**
 * Generates an X client transaction ID using the default generator.
 *
 * @public
 */
export async function generateTransactionId(document: Document, input: Readonly<ITransactionIdInput>): Promise<string> {
	// Create and initialize ClientTransaction instance
	const transaction = await ClientTransaction.create(document);

	// Generating the transaction ID
	return transaction.generateTransactionId(input.method, input.path);
}
