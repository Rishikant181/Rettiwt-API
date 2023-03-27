// RESOLVERS
import ResolverBase from './ResolverBase';

// TYPES
import { DataContext } from '../../types/Rettiwt';

export default class AccountResolver extends ResolverBase {
    // MEMBER METHODS
    constructor(context: DataContext) {
        super(context);
    }

    /**
     * @param email The email of the account to be logged into
     * @param userName The username associated with the account
     * @param password The password to the account
     * @returns The cookie string that can be used to authenticate against twitter
     */
    async resolveLogin(email: string, userName: string, password: string): Promise<string> {
        return await this.context.account.login(email, userName, password);
    }
}