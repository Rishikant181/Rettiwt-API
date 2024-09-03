/**
 * Outputs the given JSON data.
 *
 * @param data - The data to be output.
 *
 * @internal
 */
export function output(data: unknown): void {
	// If data is string, output as is
	if (typeof data == 'string') {
		console.log(data);
	}
	// Else, format the output
	else {
		console.log(JSON.stringify(data, null, 4));
	}
}
