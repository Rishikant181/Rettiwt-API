// TYPES
import { ITweetFilter } from '../../types/Args';

/**
 * @returns Whether the given json object is empty or not
 * @param data The input JSON object which needs to be checked
 */
export function isJSONEmpty(data: any): boolean {
    // If the JSON has any keys, it's not empty
    if (Object.keys(data).length == 0) {
        return true;
    }
    // Else, it's empty
    else {
        return false;
    }
}

/**
 * @returns The value associated with the given key inside the given json
 * @param data The json data within which to search for the value
 * @param key The key to search for
 * @param last Whether to begin searching from the end
 */
export function findJSONKey(data: any, key: string, last: boolean = false): any {
    let jsonStr: string = JSON.stringify(data);                                 // To store the input data as string
    let extStr: string = '';                                                    // To store the extracted string
    let len: number = jsonStr.length;                                           // To store length of input data

    /**
     * Getting the position to start extracting data from
     * This the position just after the key plus ":"
     * */
    let start: number = !last ? (jsonStr.indexOf(`"${key}"`) + `"${key}":`.length) : (jsonStr.lastIndexOf(`"${key}"`) + `"${key}":`.length);

    for (let i = start; i < len; i++) {
        // Getting each character
        let char: string = jsonStr[i];

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
 * @returns A list of data from a singleton data
 * @param data The data to be converted to a list
 */
export function dataToList(data: any | any[]): any[] {
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
 * @param text The text to be normalized
 * @returns The text after being formatted to remove unnecessary characters
 */
export function normalizeText(text: string): string {
    let normalizedText: string = '';                                                // To store the normalized text

    // Removing unnecessary full stops, and other characters
    normalizedText = text.replace(/\n/g, '.').replace(/[.]+[\s+.\s+]+/g, '. ');

    // Adding full-stop to the end if does not exist already
    normalizedText = normalizedText.endsWith('.') ? normalizedText : (normalizedText + '.');

    return normalizedText;
}