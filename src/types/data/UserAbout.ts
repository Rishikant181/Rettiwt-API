/**
 * The about profile details of a single user.
 *
 * @public
 */
export interface IUserAbout {
	/** The rest id of the user. */
	id: string;

	/** The username/screenname of the user. */
	userName: string;

	/** The full name of the user. */
	fullName: string;

	/** The creation date of user's account. */
	createdAt: string;

	/** The url of the profile image. */
	profileImage: string;

	/** The shape of the profile image. */
	profileImageShape?: string;

	/** Whether the account is verified or not. */
	isVerified: boolean;

	/** Whether the account is protected. */
	isProtected?: boolean;

	/** About profile details of the user. */
	aboutProfile?: IUserAboutProfile;

	/** Verification metadata of the user. */
	verificationInfo?: IUserAboutVerificationInfo;
}

/**
 * About profile information for a user.
 *
 * @public
 */
export interface IUserAboutProfile {
	/** Whether the created country is accurate. */
	createdCountryAccurate?: boolean;

	/** The country where the account is based. */
	accountBasedIn?: string;

	/** Whether the location is accurate. */
	locationAccurate?: boolean;

	/** The help URL for verified accounts. */
	learnMoreUrl?: string;

	/** The source platform of the account. */
	source?: string;

	/** Username change metadata for the user. */
	usernameChanges?: IUserAboutUsernameChanges;
}

/**
 * Username change metadata for a user.
 *
 * @public
 */
export interface IUserAboutUsernameChanges {
	/** The number of username changes. */
	count?: number;

	/** The last time the username was changed. */
	lastChangedAt?: string;
}

/**
 * Verification metadata for a user.
 *
 * @public
 */
export interface IUserAboutVerificationInfo {
	/** Whether the user's identity is verified. */
	isIdentityVerified?: boolean;

	/** When the account was verified. */
	verifiedSince?: string;
}
