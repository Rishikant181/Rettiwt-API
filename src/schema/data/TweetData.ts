// This file contains various objects related to handling of Tweets made by a user

// CUSTOM LIBS
import { Deserializable } from "./Data";

// Object to hold additional tweet entites
export class TweetEntities implements Deserializable {
    // MEMBER DATA
    hastags: string[];                                                          // To store a list of hastags used
    symbols: string[];                                                          // To store a list of symbold used
    urls: string[];                                                             // To store a list of urls mentioned
    user_mentions: string[];                                                    // To store a list of users mentioned

    // MEMBER METHODS
    // Method to deserialize input data into this object
    deserialize(data: any): this {
        Object.assign(this, data);        
        return this;
    }
}

// Object to hold the actual tweet
export class Tweet implements Deserializable {
    // MEMBER DATA
    rest_id: string;                                                        // To store the conversation id
    user_id_str: string;                                                    // To store the rest id of the user who made the tweet
    created_at: string;                                                     // To store the time when the tweet was created
    entities: TweetEntities;                                                // To store additional tweet entities
    full_text: string;                                                      // To store the full text in the tweet
    lang: string;                                                           // To store the language used in the tweet
    quote__count: number;                                                   // To store the number of quotes of the tweet
    reply_count: number;                                                    // To store the number of replies to the tweet
    retweet_count: number;                                                  // To store the number of retweets

    // MEMBER METHODS
    // Method to deserialize input data into this object
    deserialize(data: any): this {
        // Setting specific fields
        this.rest_id = data.conversation_id_str;

        // Copying common fields
        for(var key in this) {
            if(key === 'entities') {
                this['entities'] = new TweetEntities().deserialize(data[key]);
            }
            else {
                this[key] = data[key];
            }
        }

        return this;
    }
}