/**
 * The different types of api error messages.
 *
 * @public
 */
export enum EApiErrors {
	COULD_NOT_AUTHENTICATE = 'Failed to authenticate',
	BAD_AUTHENTICATION = 'Invalid authentication data',
	RESOURCE_NOT_ALLOWED = 'Not authorized to access requested resource',
}
