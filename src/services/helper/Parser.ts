// This file contains various methods for extracting data from incoming JSON

/**
 * Finds the value associated with the given key inside the given json
 * @param data The json data within which to search for the value
 * @param key The key to search for
 * @param last Whether to begin searching from the end
 */
export function findJSONKey(data: any, key: string, last: boolean = false): any {
    var jsonStr: string = JSON.stringify(data);                                 // To store the input data as string
    var extStr: string = '';                                                    // To store the extracted string
    var len: number = jsonStr.length;                                           // To store length of input data
    var braceStack: string[] = [];                                              // To store the stack of braces
    var reqData: any = {};                                                      // To store the required data

    /**
     * Getting the position to start extracting data from
     * This the position just after the key plus ":"
     * */
    var start: number = !last ? (jsonStr.indexOf(`"${key}"`) + `"${key}":`.length) : (jsonStr.lastIndexOf(`"${key}"`) + `"${key}":`.length);

    // If value to be extracted is not a JSON
    if (jsonStr[start] != '[' && jsonStr[start] != '{') {
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
    // If value to be extracted is a JSON
    else {
        for (var i = start; i < len; i++) {
            // Getting each character
            var char: string = jsonStr[i];

            // Appending the character to extracted string
            extStr += char;

            if (char == '[' || char == '{') {
                braceStack.push(char);
            }
            else if (char == ']' || char == '}') {
                braceStack.pop();

                // If stack is now empty, this means data extraction complete
                if (braceStack.length == 0) {
                    break;
                }
            }
        }

        // Extracting the required data
        reqData = JSON.parse(extStr);

        return reqData;
    }
}

/**
 * Extracts the parent object within which the given key-value pair exists
 * @param data The json data within which to search
 * @param query The key-value pair to search for, format: { "key": "value" }
 */
export function filterJSON(data: any, query: any): any {
    var jsonStr: string = JSON.stringify(data);                             // To store the input JSON as a string
    var atPos: number = 0                                                   // To store the index of the key-value pair
    var braceStack: string[] = [];                                          // To store the stack of braces
    var subJSON: any = {};                                                  // To store the enclosing JSON
    var start: number = 0;                                                  // To store staring position of sub JSON
    var end: number = 0;                                                    // To store ending position of end JSON

    // Parsing the query to remove braces
    query = JSON.stringify(query).replace(/{|}/g, '');

    // Getting position of the key-value pair
    atPos = jsonStr.indexOf(query);

    // If key-value pair found
    if (atPos != -1) {
        // Getting starting position of parent JSON
        for (var i = atPos; i >= 0; i--) {
            var char: string = jsonStr[i];
            if (char === '}') {
                braceStack.push(char)
            }
            else if (char === '{') {
                // If parent JSON start
                if (braceStack.length == 0) {
                    start = i;
                    break;
                }
                else {
                    braceStack.pop();
                }
            }
        }

        // Resetting braceStack to prepare it for getting ending position
        braceStack = [];

        // Getting ending position of parent JSON
        for (var i = atPos; i < jsonStr.length; i++) {
            var char: string = jsonStr[i];
            if (char === '{') {
                braceStack.push(char)
            }
            else if (char === '}') {
                // If parent JSON start
                if (braceStack.length == 0) {
                    end = i;
                    break;
                }
                else {
                    braceStack.pop();
                }
            }
        }

        subJSON = JSON.parse(jsonStr.substring(start, end + 1));
    }
    // If not found
    else {
        subJSON = undefined;
    }

    return subJSON;
}