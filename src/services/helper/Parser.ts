// TYPES
import { TweetFilter } from '../../types/data/Tweet';

/**
 * @returns Whether the given json object is empty or not
 * @param data The input JSON object which needs to be checked
 */
export function isJSONEmpty(data: any): boolean {
    // If the JSON has any keys, it's not empty
    if(Object.keys(data).length == 0) {
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

/**
 * @param filter The tweet filter to use for getting filtered tweets
 * @returns The same tweet filter, in a URL query format string
 */
export function toQueryString(filter: TweetFilter): string {
    // Concatenating the input filter arguments to a URL query formatted string
    return [
        filter.words ? filter.words.join(' ') : '',
        filter.hashtags ? `(${filter.hashtags.map(hashtag => '#' + hashtag).join(' OR ')})` : '',
        filter.fromUsers ? `(${filter.fromUsers.map(user => `from:${user}`).join(' OR ')})` : '',
        filter.toUsers ? `(${filter.toUsers.map(user => `to:${user}`).join(' OR ')})` : '',
        filter.mentions ? `(${filter.mentions.map(mention => '@' + mention).join(' OR ')})` : '',
        filter.startDate ? `since:${filter.startDate}` : '',
        filter.endDate ? `until:${filter.endDate}` : '',
        filter.sinceId ? `since_id:${filter.sinceId}` : '',
        filter.quoted ? `quoted_tweet_id:${filter.quoted}` : ''
    ]
    .filter(item => item !== '()' && item !== '')
    .join(' ') + (!filter.links ? ' -filter:links' : '');
}

/**
 * 
 * @param input string to number
 * @returns  De-abbreviated Number
 */
export function convertToNumber(input: string): number {
    
    // Work-around to handle missing data.
    if (input=='') return -1;


    // Define the regular expression pattern to match the input string
    const regex = /^([\d,]+\.?[\d]+)([kKmMbB]?)\s*(.*)$/;
  
    // Use the match method to match the input string against the pattern
    const match = input.match(regex);
  
    // If the match is not successful, return the input string with the commas removed and converted to a number
    if (!match) {
      return parseFloat(input.replace(/,/g, ''));
    }
  
    // If the match is successful, extract the number part and the abbreviation from the match
    const [, numberPart, abbreviation] = match;
  
    // Convert the number part into an actual number by removing the commas and parsing it as a float
    const number = parseFloat(numberPart.replace(/,/g, ''));
  
    // If the abbreviation is "k" or "K", multiply the number by 1000
    if (abbreviation === 'k' || abbreviation === 'K') {
      return number * 1000;
    }
  
    // If the abbreviation is "m" or "M", multiply the number by 1000000
    if (abbreviation === 'm' || abbreviation === 'M') {
      return number * 1000000;
    }
    // If the abbreviation is "b" or "B", multiply the number by 1000000000
    if (abbreviation === 'b' || abbreviation === 'B') {
      return number * 1000000000;
    }
  
    // If there is no abbreviation, return the number as is
    return number;
}
