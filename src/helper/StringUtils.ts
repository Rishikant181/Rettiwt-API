/**
 * Converts the given API key to it's equivalent cookie string.
 *
 * @param apiKey - The API key representation of the cookie string.
 * @returns - The cookie string retrieved from the API key.
 */
export function keyToCookie(apiKey: string): string {
	return Buffer.from(apiKey, 'base64').toString('ascii');
}
