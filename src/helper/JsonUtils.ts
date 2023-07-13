/**
 * Search for all the sub-objects (even deep-nested ones) that have the given key-value pair(filter).
 *
 * @param data The data on which search is to be performed.
 * @param key The key of the key-value pair to search.
 * @param value The value of the key-value pait to search.
 * @returns The list of sub-objects from the given object, having the given key-value pair.
 *
 * @internal
 */
export function findByFilter<T>(data: NonNullable<unknown>, key: string, value: string): T[] {
	/**
	 * The list containing all the objects matching given filter.
	 */
	let res: T[] = [];

	/**
	 * If the data is an array, recursively run the function of each element of the array and merge the results.
	 */
	if (Array.isArray(data)) {
		/**
		 * findByFilter returns an array.
		 * map() also returns an array.
		 * Therefore, map(item => findByFilter(.......)) returns an array of arrays.
		 * Therefore, using ... operator to spread the 2-D array in 1-D array.
		 */
		res = res.concat(...data.map((item) => findByFilter<T>(item as NonNullable<unknown>, key, value)));
	}
	// If the data is an object
	else if (typeof data == 'object') {
		/**
		 * If the object includes the key and the value specified by the key matches the filter, add it to the result.
		 */
		if (Object.keys(data).includes(key) && data[key as keyof typeof data] == value) {
			res.push(data as T);
		} else {
			/**
			 * Else, recursively run the function on each value specified by each key in the object.
			 */
			for (const [, v] of Object.entries(data)) {
				res = res.concat(findByFilter<T>(v as NonNullable<unknown>, key, value));
			}
		}
	}

	return res;
}

/**
 * @returns The value associated with the given key inside the given json.
 * @param data The json data within which to search for the value.
 * @param key The key to search for.
 * @param last Whether to begin searching from the end.
 *
 * @internal
 */
export function findJSONKey(data: object, key: string, last: boolean = false): string {
	const jsonStr: string = JSON.stringify(data); // To store the input data as string
	let extStr: string = ''; // To store the extracted string
	const len: number = jsonStr.length; // To store length of input data

	/**
	 * Getting the position to start extracting data from
	 * This the position just after the key plus ":"
	 * */
	const start: number = !last
		? jsonStr.indexOf(`"${key}"`) + `"${key}":`.length
		: jsonStr.lastIndexOf(`"${key}"`) + `"${key}":`.length;

	for (let i = start; i < len; i++) {
		// Getting each character
		const char: string = jsonStr[i];

		// If not ending of value
		if (char != ',' && char != '\n') {
			extStr += char;
		}
		// If ending of value
		else {
			break;
		}
	}

	// Removing begginning and ending quotes from string
	/**
	 * I don't know how this regex I used works. I just copied it from StackOverflow
	 * Here is the link to the thread: https://stackoverflow.com/q/19156148
	 */
	extStr = extStr.replace(/^"|"$/g, '');

	return extStr;
}

/**
 * @returns A list of data from a singleton data.
 * @param data The data to be converted to a list.
 *
 * @internal
 */
export function dataToList(data: object | object[]): object[] {
	// If data is already a list
	if (Array.isArray(data)) {
		return data;
	}
	// If data is not array
	else {
		return [data];
	}
}

/**
 * @param text The text to be normalized.
 * @returns The text after being formatted to remove unnecessary characters.
 *
 * @internal
 */
export function normalizeText(text: string): string {
	let normalizedText: string = ''; // To store the normalized text

	// Removing unnecessary full stops, and other characters
	normalizedText = text.replace(/\n/g, '.').replace(/[.]+[\s+.\s+]+/g, '. ');

	// Adding full-stop to the end if does not exist already
	normalizedText = normalizedText.endsWith('.') ? normalizedText : normalizedText + '.';

	return normalizedText;
}
