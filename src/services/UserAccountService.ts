// This file contains the service that handles getting and posting User account data to and from official TwitterAPI

// PACKAGE LIBS
import fetch from 'node-fetch';

// Custom libs
import { UserAccountDetails } from '../schema/data/UserAccountData';

import {
    userAccountUrl,
    authorizedGuestHeader
} from './helper/Requests';

export class UserAccountService {
    // MEMBER METHODS
    // Method to fetch the user account details using screen name
    getUserAccountDetails(
        screenName: string,
        authToken: string,
        guestToken: string
    ): Promise<UserAccountDetails> {
        return fetch(userAccountUrl(screenName), {
            headers: authorizedGuestHeader(authToken, guestToken),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => new UserAccountDetails().deserialize(res.data.user.result));
    }
};