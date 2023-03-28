// PACKAGE
import { IsNotEmpty, validateSync } from 'class-validator';

// TYPES
import { AuthCookie as IAuthCookie } from '../../types/Authentication';
import { DataValidationError } from '../errors/DataValidationError';

export class AuthCookie implements IAuthCookie {
    /** Token used to authenticate a device. */
    @IsNotEmpty()
    kdt: string = '';

    /** Token used to authenticate a user using a Twitter ID. */
    @IsNotEmpty()
    twid: string = '';

    /** The CSRF token of the session. */
    @IsNotEmpty()
    ct0: string = '';

    /** The authentication token used while logging in to the account. */
    @IsNotEmpty()
    auth_token: string = '';

    constructor(cookie?: IAuthCookie) {
        if (cookie) {
            this.auth_token = cookie.auth_token;
            this.ct0 = cookie.ct0;
            this.kdt = cookie.kdt;
            this.twid = cookie.twid;
        }

        // Validating the cookie
        const validationResult = validateSync(this);

        // If valiation error occured
        if (validationResult.length) {
            throw new DataValidationError(validationResult);
        }
    }

    /**
     * @returns The string respresentation of this cookie in the valid cookie string format.
     */
    toString(): string {
        /** The string representation of this cookie. */
        let cookieString: string = '';
        
        // Iterating through the (key, value) pairs of this cookie
        for (let [key, value] of Object.entries(this)) {
            cookieString += `${key}=${value};`;
        }

        return cookieString;
    }
}