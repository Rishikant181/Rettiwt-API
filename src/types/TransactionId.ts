/**
 * A function that generates an X client transaction ID.
 *
 * @param document - The X HTML document used by the generator.
 * @param method - The target HTTP method.
 * @param url - The target request URL.
 *
 * @returns The generated transaction ID.
 *
 * @public
 */
export type TransactionIdGenerator = (document: Document, method: string, url: string) => string | Promise<string>;
