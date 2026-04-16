import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import {
	ICommunity,
	ICommunityBanner,
	ICommunityMemberPreview,
	ICommunityRule,
} from '../../types/data/Community';
import {
	ICommunityBannerMedia,
	ICommunityDetailsResponse,
	ICommunityUserAvatarResults,
	IRawCommunity,
	ICommunityRule as IRawCommunityRule,
} from '../../types/raw/community/Details';

/**
 * The details of a single Community.
 *
 * @public
 */
export class Community implements ICommunity {
	/** The raw community details. */
	private readonly _raw: IRawCommunity;

	public createdAt?: string;
	public creatorId?: string;
	public creatorScreenName?: string;
	public customBanner?: ICommunityBanner;
	public defaultBanner?: ICommunityBanner;
	public description?: string;
	public id: string;
	public isCreatorVerified?: boolean;
	public isMember?: boolean;
	public isNsfw?: boolean;
	public joinPolicy?: string;
	public memberCount?: number;
	public membersFacepile: ICommunityMemberPreview[];
	public name?: string;
	public role?: string;
	public rules: ICommunityRule[];
	public trendingHashtags: string[];

	/**
	 * @param community - The raw community details.
	 */
	public constructor(community: IRawCommunity) {
		this._raw = { ...community };
		this.id = community.rest_id ?? '';
		this.name = community.name;
		this.description = community.description;
		this.createdAt = Community._timestampToIso(community.created_at);
		this.creatorId = community.creator_results?.result?.rest_id;
		this.creatorScreenName = community.creator_results?.result?.core?.screen_name;
		this.isCreatorVerified =
			community.creator_results?.result?.verification?.verified ?? community.creator_results?.result?.is_blue_verified;
		this.isMember = community.is_member;
		this.isNsfw = community.is_nsfw;
		this.joinPolicy = community.join_policy;
		this.memberCount = community.member_count;
		this.role = community.role;
		this.customBanner = Community._mapBanner(community.custom_banner_media);
		this.defaultBanner = Community._mapBanner(community.default_banner_media);
		this.membersFacepile = (community.members_facepile_results ?? []).map((member) => Community._mapMember(member));
		this.rules = (community.rules ?? []).map((rule) => Community._mapRule(rule));
		this.trendingHashtags = (community.trending_hashtags_slice?.items ?? [])
			.map((item) => item.hashtag)
			.filter((item): item is string => item != undefined);
	}

	/** The raw community details. */
	public get raw(): IRawCommunity {
		return { ...this._raw };
	}

	/**
	 * Maps a raw community banner to a deserialized banner.
	 *
	 * @param banner - The raw banner data.
	 */
	private static _mapBanner(banner?: ICommunityBannerMedia): ICommunityBanner | undefined {
		if (!banner?.media_info) {
			return undefined;
		}

		return {
			url: banner.media_info.original_img_url,
			width: banner.media_info.original_img_width,
			height: banner.media_info.original_img_height,
		};
	}

	/**
	 * Maps a raw member preview to a deserialized member preview.
	 *
	 * @param member - The raw member preview data.
	 */
	private static _mapMember(member: ICommunityUserAvatarResults): ICommunityMemberPreview {
		return {
			id: member.result?.rest_id,
			avatarUrl: member.result?.avatar?.image_url,
		};
	}

	/**
	 * Maps a raw community rule to a deserialized rule.
	 *
	 * @param rule - The raw rule data.
	 */
	private static _mapRule(rule: IRawCommunityRule): ICommunityRule {
		return {
			id: rule.rest_id,
			name: rule.name,
		};
	}

	/**
	 * Convert timestamp to ISO string.
	 *
	 * @param value - The timestamp value.
	 */
	private static _timestampToIso(value?: number | string): string | undefined {
		if (value == undefined) {
			return undefined;
		}

		const numeric = typeof value === 'string' ? Number(value) : value;

		if (!Number.isNaN(numeric)) {
			return new Date(numeric).toISOString();
		}

		const parsed = new Date(value);

		if (!Number.isNaN(parsed.getTime())) {
			return parsed.toISOString();
		}

		return undefined;
	}

	/**
	 * Extracts and deserializes a single target community from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The target deserialized community.
	 */
	public static single(response: ICommunityDetailsResponse): Community | undefined {
		const community = response.data?.communityResults?.result;
		const communityId = community?.rest_id;

		if (community && communityId) {
			LogService.log(LogActions.DESERIALIZE, { id: communityId });

			return new Community(community);
		}

		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: 'Community not found, skipping',
		});

		return undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICommunity {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			createdAt: this.createdAt,
			creatorId: this.creatorId,
			creatorScreenName: this.creatorScreenName,
			isCreatorVerified: this.isCreatorVerified,
			isMember: this.isMember,
			isNsfw: this.isNsfw,
			joinPolicy: this.joinPolicy,
			memberCount: this.memberCount,
			role: this.role,
			customBanner: this.customBanner,
			defaultBanner: this.defaultBanner,
			membersFacepile: this.membersFacepile,
			rules: this.rules,
			trendingHashtags: this.trendingHashtags,
		};
	}
}
