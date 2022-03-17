// This file contains various helper methods for validating various types of data

// CUSTOM LIBS

// TYPES
import { TweetFilter } from '../../../types/TweetData';

/**
 * @summary Collection of different types of validation errors
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required"
}

/**
 * @returns Whether the given tweet filter is valid or not
 * @param filter The tweet filter that needs to be validated
 * @summary A tweet filter is said to be valid if it has atleast one of fromUsers/toUsers/mentions/hashtags/words arguments
 */
export function validTweetFilter(filter: TweetFilter): boolean {
    // Validating tweet filter
    // If valid
    if(filter.fromUsers || filter.toUsers || filter.words || filter.hashtags || filter.mentions) {
        return true;
    }
    // If invalid
    else {
        return false;
    }
}