// This file contains the service that handles getting and posting User data to and from official TwitterAPI

// PACKAGE LIBS
import fetch from 'node-fetch';

// Custom libs
import {
    userAccountUrl,
    authorizedGuestHeader
} from './helper/Requests';

export class UserService {
    // MEMBER METHODS
    // Method to fetch the user account details using screen name
    /*
    For the time being, this method returns a Promise of 'any' type. We are expected to replace 'any' with one
    of the types from our schema
    */
    getUserAccountDetails(
        screenName: string,
        authToken: string,
        guestToken: string
    ): Promise<any> {
        return fetch(userAccountUrl(screenName), {
            "headers": authorizedGuestHeader(authToken, guestToken),
            "body": null,
            "method": "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => res.data.user.result);
    }
};