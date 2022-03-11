// This file contains various methods for extracting data from incoming JSON

/**
 * @returns The value associated with the given key inside the given json
 * @param data The json data within which to search for the value
 * @param key The key to search for
 * @param last Whether to begin searching from the end
 */
export function findJSONKey(data: any, key: string, last: boolean = false): any {
    var jsonStr: string = JSON.stringify(data);                                 // To store the input data as string
    var extStr: string = '';                                                    // To store the extracted string
    var len: number = jsonStr.length;                                           // To store length of input data

    /**
     * Getting the position to start extracting data from
     * This the position just after the key plus ":"
     * */
    var start: number = !last ? (jsonStr.indexOf(`"${key}"`) + `"${key}":`.length) : (jsonStr.lastIndexOf(`"${key}"`) + `"${key}":`.length);

    for (var i = start; i < len; i++) {
        // Getting each character
        var char: string = jsonStr[i];

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