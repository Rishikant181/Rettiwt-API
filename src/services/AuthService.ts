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
        // Preparing the headers
        const headers: any = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"97\", \"Chromium\";v=\"97\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        };

        // Fetching the raw html from twitter
        return fetch(url, {
            headers: headers,
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