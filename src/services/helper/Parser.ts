// This file contains various methods for extracting data from incoming JSON

// Method to search for a value from a given JSON, when the key is supplied
export function valueFromKey(data: any, key: string): any {
    var jsonStr: string = JSON.stringify(data);                                 // To store the input data as string
    var len: number = jsonStr.length;                                           // To store length of input data
    var braceStack: string[] = [];                                              // To store the stack of braces
    var reqData: any = {};                                                      // To store the required data
    var start: number = jsonStr.indexOf(`"${key}"`) + `"${key}":`.length;       // To store starting position
    var end: number = 0;                                                        // To store ending position

    for (var i = start; i < len; i++) {
        if(jsonStr[i] == '[' || jsonStr[i] == '{') {
            braceStack.push(jsonStr[i]);
        }
        else if(jsonStr[i] == ']' || jsonStr[i] == '}') {
            braceStack.pop();

            // If stack is now empty
            if(braceStack.length == 0) {
                end = i + 1;
                break;
            }
        }
    }

    // Extracting the required data
    reqData = JSON.parse(jsonStr.substring(start, end));

    return reqData;
}