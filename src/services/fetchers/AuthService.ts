// This file contains the service that handles various function related to authentication and authorization from official twitter api

// Package libs
import fetch from "node-fetch";

export class AuthService {
    // MEMBER METHODS    
    // Method to generate guest token from twitter API
    /*
    For the time being, all this does is make a query to twitter home page and from the returned data,
    scraps the guest token that is embbedded into the html page
    */
    generateGuestToken(url: string): Promise<string> {
        return fetch(url, {
            headers: {},
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        })
        .then(res => res.text())
        .then(res => {
            // Getting the index position of guest token in the reponse string
            const guestTokenIndex: number = res.indexOf("gt=") + 3;
            
            // Scraping the guest token from the response string
            const guestToken = res.substring(guestTokenIndex, guestTokenIndex + 19);

            return guestToken;
        });
    }
};