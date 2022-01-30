// This file contains various object for handling data related to User Account

// CUSTOM LIBS
import { Deserializable } from "./Data";

export class UserAccountDetails implements Deserializable {
    // MEMBER DATA
    __typename: string = '';                                                // To store the type of account
    id: string = '';                                                        // To store the internal data id
    rest_id: string = '';                                                   // To store the internal rest id of user account
    screen_name: string = '';                                               // To store the screen name of the user
    name: string = '';                                                      // To store the actual name of the user
    created_at: string = '';                                                // To store the time when the account was created
    description: string = '';                                               // To store the account description
    verified: boolean = false;                                              // To store whether this is a verified account or not
    favourites_count: number = 0;                                           // To store the number of favourites
    followers_count: number = 0;                                            // To store the number of followers
    friends_count: number = 0;                                              // To store the number of friends
    statuses_count: number = 0;                                             // To store the number of status posted by user
    location: string = '';                                                  // To store the user's location
    media_count = 0;                                                        // To store the number of media posted by user
    pinned_tweet_ids_str: string[] = [];                                    // To store the ids of tweets that are pinned in the account
    profile_banner_url: string = '';                                        // To store the url to the profile's banner
    profile_image_url_https: string = '';                                   // To store the url to the profile's image

    // MEMBER METHODS
    // Method to deserialize input data into current object
    /*
    For now, this take in input data of 'any' format, then removes unnecessary, non-required fields,
    then copies required fields from input data
    NOTE: There might be a more elegant and faster method to do this
    */
    deserialize(data: any): this {
        // Flatteining data.legacy json
        Object.assign(data, data.legacy);

        // Removing flattened data.legacy
        delete data.legacy;

        // Copying common fields into this object
        for(var key in this) {
            this[key] = data[key];
        }
        
        return this;
    }
}