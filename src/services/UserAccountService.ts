// This file contains the service that handles getting and posting User account data to and from official TwitterAPI

// PACKAGE LIBS
import fetch from 'node-fetch';

// Custom libs
import { User } from '../schema/types/UserAccountData';

import {
    userAccountUrl,
    authorizedHeader
} from './helper/Requests';

export class UserAccountService {
    // MEMBER DATA
    private authToken: string;                                                  // To store the authenctication token
    private csrfToken: string;                                                  // To store the csrfToken
    private cookie: string;                                                     // To store the cookies
    
    // MEMBER METHODS
    // The constructor
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        this.authToken = authToken;
        this.csrfToken = csrfToken;
        this.cookie = cookie;
    }

    // Method to fetch the user account details using screen name
    getUserAccountDetails(screenName: string): Promise<User> {
        return fetch(userAccountUrl(screenName), {
            headers: authorizedHeader(this.authToken, this.csrfToken, this.cookie),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => new User().deserialize(res.data.user.result));
    }

    // Method to fetch the list of followers of a user
    getUserFollowers(
        userId: string,
        count: number
    ): any {

    }
};