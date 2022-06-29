// This file contains various methods for checking the connections to other services

// PACKAGE LIBS
import axios from 'axios';

// CUSTOM LIBS

// CONFIGS
import * as urls from './config/urls';

/**
 * @returns Whether the server with the given url is running OK or not
 * @param rootUrl The root url of the server whose status is to be checked
 */
const serverOK = async (rootUrl: string): Promise<boolean> => {
    // Making a get request to given server's root to checks it's status
    try {
        const serverStatus = (await axios.get(rootUrl)).status;

        // If core OK, return true, else false
        return (serverStatus == 200);
    }
    // If error connecting to server
    catch(err) {
        return false;
    }    
};

/**
 * @returns Whether all the server on which this API is dependent are OK or not
 */
export const serversOK = async (): Promise<boolean> => {
    var allStatus: boolean = true;                                      // To store whether all servers are OK or not
    
    // Iterating through all servers' urls
    for(var server of Object.keys(urls)) {
        //@ts-ignore
        console.log(`Checking ${urls[server].name} status`);
        
        // If server is down, repeatedly check it's status as long as it down
        //@ts-ignore
        while(!(await serverOK(urls[server].root))) {
            // All servers are not OK, so change allStatus to false
            allStatus = false;
        }

        // If server is OK
        //@ts-ignore
        console.log(`Server ${urls[server].name} with url ${urls[server].root} is up\n`);
    }

    // If all servers are OK
    console.log("All servers are OK");

    return true;
}