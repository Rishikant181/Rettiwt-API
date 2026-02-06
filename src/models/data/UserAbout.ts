import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import {
	IUserAbout,
	IUserAboutProfile,
	IUserAboutUsernameChanges,
	IUserAboutVerificationInfo,
} from '../../types/data/UserAbout';
import { IUserAboutResponse, IUserAboutResult } from '../../types/raw/user/About';

/* eslint-disable @typescript-eslint/naming-convention */
type IRawUsernameChanges = {
	count?: string;
	last_changed_at_msec?: string;
};
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * The about profile details of a single user.
 *
 * @public
 */
export class UserAbout implements IUserAbout {
	/** The raw about profile details. */
	private readonly _raw: IUserAboutResult;

	public aboutProfile?: IUserAboutProfile;
	public createdAt: string;
	public fullName: string;
	public id: string;
	public isProtected?: boolean;
	public isVerified: boolean;
	public profileImage: string;
	public profileImageShape?: string;
	public userName: string;
	public verificationInfo?: IUserAboutVerificationInfo;

	/**
	 * @param user - The raw about profile details.
	 */
	public constructor(user: IUserAboutResult) {
		this._raw = { ...user };

		this.id = user.rest_id ?? user.id ?? '';
		this.userName = user.core?.screen_name ?? '';
		this.fullName = user.core?.name ?? '';
		this.createdAt = new Date(user.core?.created_at ?? 0).toISOString();
		this.profileImage = user.avatar?.image_url ?? '';
		this.profileImageShape = user.profile_image_shape;
		this.isVerified = user.is_blue_verified ?? false;
		this.isProtected = user.privacy?.protected;
		this.aboutProfile = UserAbout._buildAboutProfile(user);
		this.verificationInfo = UserAbout._buildVerificationInfo(user);
	}

	/** The raw about profile details. */
	public get raw(): IUserAboutResult {
		return { ...this._raw };
	}

	private static _buildAboutProfile(user: IUserAboutResult): IUserAboutProfile | undefined {
		const profile = user.about_profile;

		if (!profile) {
			return undefined;
		}

		const usernameChanges = UserAbout._buildUsernameChanges(profile.username_changes);

		return {
			createdCountryAccurate: profile.created_country_accurate,
			accountBasedIn: profile.account_based_in,
			locationAccurate: profile.location_accurate,
			learnMoreUrl: profile.learn_more_url,
			source: profile.source,
			usernameChanges: usernameChanges,
		};
	}

	private static _buildUsernameChanges(changes?: IRawUsernameChanges): IUserAboutUsernameChanges | undefined {
		if (!changes) {
			return undefined;
		}

		return {
			count: UserAbout._toNumber(changes.count),
			lastChangedAt: UserAbout._toIsoFromMsec(changes.last_changed_at_msec),
		};
	}

	private static _buildVerificationInfo(user: IUserAboutResult): IUserAboutVerificationInfo | undefined {
		const info = user.verification_info;

		if (!info) {
			return undefined;
		}

		return {
			isIdentityVerified: info.is_identity_verified,
			verifiedSince: UserAbout._toIsoFromMsec(info.reason?.verified_since_msec),
		};
	}

	private static _toIsoFromMsec(value?: string | number): string | undefined {
		const parsed = UserAbout._toNumber(value);

		return parsed === undefined ? undefined : new Date(parsed).toISOString();
	}

	private static _toNumber(value?: string | number): number | undefined {
		if (value === undefined || value === null) {
			return undefined;
		}

		const parsed = typeof value === 'number' ? value : Number(value);

		return Number.isFinite(parsed) ? parsed : undefined;
	}

	/**
	 * Extracts and deserializes a single target user about profile from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The target deserialized user about profile.
	 */
	public static single(response: NonNullable<unknown>): UserAbout | undefined {
		const result = (response as IUserAboutResponse)?.data?.user_result_by_screen_name?.result;

		if (!result || result.__typename !== 'User') {
			LogService.log(LogActions.WARNING, {
				action: LogActions.DESERIALIZE,
				message: `User not found, skipping`,
			});
			return undefined;
		}

		// Logging
		LogService.log(LogActions.DESERIALIZE, { id: result.rest_id ?? result.id });

		return new UserAbout(result);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IUserAbout {
		return {
			id: this.id,
			userName: this.userName,
			fullName: this.fullName,
			createdAt: this.createdAt,
			profileImage: this.profileImage,
			profileImageShape: this.profileImageShape,
			isVerified: this.isVerified,
			isProtected: this.isProtected,
			aboutProfile: this.aboutProfile,
			verificationInfo: this.verificationInfo,
		};
	}
}
