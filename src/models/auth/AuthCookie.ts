// PACKAGE
import { IsNotEmpty, validateSync } from 'class-validator';

// TYPES
import { AuthCookie as IAuthCookie } from '../../types/Authentication';
import { DataValidationError } from '../errors/DataValidationError';

export class AuthCookie implements IAuthCookie {
    /** Token used to authenticate a device. */
    @IsNotEmpty()
    kdt: string;

    /** Token used to authenticate a user using a Twitter ID. */
    @IsNotEmpty()
    twid: string;

    /** The CSRF token of the session. */
    @IsNotEmpty()
    ct0: string;

    /** The authentication token used while logging in to the account. */
    @IsNotEmpty()
    auth_token: string;

    constructor(cookie: IAuthCookie) {
        this.auth_token = cookie.auth_token;
        this.ct0 = cookie.ct0;
        this.kdt = cookie.kdt;
        this.twid = cookie.twid;

        // Validating the cookie
        const validationResult = validateSync(this);

        // If valiation error occured
        if (validationResult.length) {
            throw new DataValidationError(validationResult);
        }
    }
}