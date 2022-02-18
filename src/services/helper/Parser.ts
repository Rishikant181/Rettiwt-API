// This file contains various methods for extracting data from incoming JSON

// Method to search for a value from a given JSON, when the key is supplied
export function findJSONKey(data: any, key: string, last: boolean = false): any {
    var jsonStr: string = JSON.stringify(data);                                 // To store the input data as string
    var extStr: string = '';                                                    // To store the extracted string
    var len: number = jsonStr.length;                                           // To store length of input data
    var braceStack: string[] = [];                                              // To store the stack of braces
    var reqData: any = {};                                                      // To store the required data
    var start: number = !last ? (jsonStr.indexOf(`"${key}"`) + `"${key}":`.length) : (jsonStr.lastIndexOf(`"${key}"`) + `"${key}":`.length);

    for (var i = start; i < len; i++) {
        // Getting each character
        var char: string = jsonStr[i];

        // Appending the character to extracted string
        extStr += char;
        
        if(char == '[' || char == '{') {
            braceStack.push(char);
        }
        else if(char == ']' || char == '}') {
            braceStack.pop();

            // If stack is now empty, this means data extraction complete
            if(braceStack.length == 0) {
                break;
            }
        }
    }

    // Extracting the required data
    reqData = JSON.parse(extStr);

    return reqData;
}