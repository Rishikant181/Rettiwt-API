/**
 * Outputs the given JSON data.
 *
 * @param data - The data to be output.
 */
export function output(data: NonNullable<unknown>): void {
	console.log(JSON.parse(JSON.stringify(data)));
}
