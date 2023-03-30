// PACKAGES
import { GraphQLError } from 'graphql'

// TYPES
import { IDataContext } from '../../types/Rettiwt';

export default class ResolverBase {
    /** The current data context that can used for fetching data from Twitter. */
    protected context: IDataContext;

    /**
     * @param context The data context that will be used for fetching data from Twitter.
     */
    constructor(context: IDataContext) {
        this.context = context;
    }

    /**
     * @param error The error object received from the services.
     * 
     * @returns The GraphQL error object that can be returned to the client.
     */
    protected getGraphQLError(error: Error) {
        return new GraphQLError(error.message, undefined, undefined, undefined, undefined, undefined, error);
    }
}