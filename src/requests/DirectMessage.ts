import qs from 'querystring';

import { AxiosRequestConfig } from 'axios';

/**
 * Common parameter sets for DM requests
 */
const BaseDMParams = {
	/* eslint-disable @typescript-eslint/naming-convention */

	nsfw_filtering_enabled: false,
	filter_low_quality: true,
	include_quality: 'all',
	dm_secret_conversations_enabled: false,
	krs_registration_enabled: false,
	cards_platform: 'Web-12',
	include_cards: 1,
	include_ext_alt_text: true,
	include_ext_limited_action_results: true,
	include_quote_count: true,
	include_reply_count: 1,
	tweet_mode: 'extended',
	include_ext_views: true,
	include_groups: true,
	include_inbox_timelines: true,
	include_ext_media_color: true,
	supports_reactions: true,
	supports_edit: true,
	include_ext_edit_control: true,
	include_ext_business_affiliations_label: true,
	ext: 'mediaColor%2CaltText%2CbusinessAffiliationsLabel%2CmediaStats%2ChighlightedLabel%2CparodyCommentaryFanLabel%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Carticle',

	/* eslint-enable @typescript-eslint/naming-convention */
};

const DMUserIncludeParams = {
	/* eslint-disable @typescript-eslint/naming-convention */

	include_profile_interstitial_type: 1,
	include_blocking: 1,
	include_blocked_by: 1,
	include_followed_by: 1,
	include_want_retweets: 1,
	include_mute_edge: 1,
	include_can_dm: 1,
	include_can_media_tag: 1,
	include_ext_is_blue_verified: 1,
	include_ext_verified_type: 1,
	include_ext_profile_image_shape: 1,
	skip_status: 1,

	/* eslint-enable @typescript-eslint/naming-convention */
};

const DMConversationPageQuerySettings = {
	/* eslint-disable @typescript-eslint/naming-convention */

	conversation_event_limit: 200,
	inbox_conversation_event_limit: 5,
	inbox_conversation_limit: 20,
	user_event_limit: 500,

	/* eslint-enable @typescript-eslint/naming-convention */
};

/**
 * Collection of requests related to direct messages.
 *
 * @public
 */
export class DMRequests {
	/**
	 * Get a specific DM conversation page.
	 * @param conversationId - The conversation ID (e.g., "394028042:1645287614")
	 * @param maxId - Oldest loaded event ID from the previous page (optional)
	 */
	public static conversation(conversationId: string, maxId?: string): AxiosRequestConfig {
		const variables: Record<string, unknown> = {
			/* eslint-disable @typescript-eslint/naming-convention */

			conversation_id: conversationId,
			min_conversation_key_version: '9223372036854775807',
			query_settings: DMConversationPageQuerySettings,

			/* eslint-enable @typescript-eslint/naming-convention */
		};

		if (maxId) {
			variables.min_local_sequence_id = maxId;
		}

		return {
			method: 'get',
			url: 'https://api.x.com/graphql/IVlXls9JTnbgQ1gxsGAfJA/GetConversationPageQuery',
			params: {
				variables: JSON.stringify(variables),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * Delete a DM conversation
	 * @param conversationId - The ID of the conversation to delete
	 */
	public static deleteConversation(conversationId: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: `https://x.com/i/api/1.1/dm/${conversationId}/delete.json`,
			data: qs.stringify({
				/* eslint-disable @typescript-eslint/naming-convention */
				dm_secret_conversations_enabled: false,
				krs_registration_enabled: false,
				cards_platform: 'Web-12',
				include_cards: 1,
				include_ext_alt_text: true,
				include_ext_limited_action_results: true,
				include_quote_count: true,
				include_reply_count: 1,
				tweet_mode: 'extended',
				include_ext_views: true,
				dm_users: false,
				include_groups: true,
				include_inbox_timelines: true,
				include_ext_media_color: true,
				supports_reactions: true,
				supports_edit: true,
				include_conversation_info: true,
			}),
		};
	}

	/**
	 * Get the initial state of the DM inbox
	 */
	public static inboxInitial(): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/1.1/dm/inbox_initial_state.json',
			params: {
				...BaseDMParams,
				...DMUserIncludeParams,
				/* eslint-disable @typescript-eslint/naming-convention */
				dm_users: true,
				include_ext_parody_commentary_fan_label: true,
				ext: 'mediaColor%2CaltText%2CmediaStats%2ChighlightedLabel%2CparodyCommentaryFanLabel%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Carticle',
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * Get inbox timeline (pagination of conversations)
	 * @param maxId - Maximum ID for pagination
	 */
	public static inboxTimeline(maxId?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/1.1/dm/inbox_timeline/trusted.json',
			params: {
				...BaseDMParams,
				...DMUserIncludeParams,
				/* eslint-disable @typescript-eslint/naming-convention */
				max_id: maxId,
				dm_users: false,
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * Create a new DM or get DM creation interface
	 */
	// public static new(): AxiosRequestConfig {
	// 	return {
	// 		method: 'get',
	// 		url: 'https://x.com/i/api/1.1/dm/new2.json',
	// 		params: {
	// 			/* eslint-disable @typescript-eslint/naming-convention */
	// 			ext: 'mediaColor%2CaltText%2CmediaStats%2ChighlightedLabel%2CparodyCommentaryFanLabel%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Carticle',
	// 			include_ext_alt_text: true,
	// 			include_ext_limited_action_results: true,
	// 			include_reply_count: 1,
	// 			tweet_mode: 'extended',
	// 			include_ext_views: true,
	// 			include_groups: true,
	// 			include_inbox_timelines: true,
	// 			include_ext_media_color: true,
	// 			supports_reactions: true,
	// 			supports_edit: true,
	// 		},
	// 		paramsSerializer: { encode: encodeURIComponent },
	// 	};
	// }

	/**
	 * Check DM permissions for specific recipients
	 * @param recipientIds - Array of recipient user IDs
	 */
	// public static permissions(recipientIds: string[]): AxiosRequestConfig {
	// 	return {
	// 		method: 'get',
	// 		url: 'https://x.com/i/api/1.1/dm/permissions.json',
	// 		params: {
	// 			/* eslint-disable @typescript-eslint/naming-convention */
	// 			recipient_ids: recipientIds.join(','),
	// 			dm_users: true,
	// 		},
	// 		paramsSerializer: { encode: encodeURIComponent },
	// 	};
	// }

	/**
	 * Update the last seen event ID for a conversation
	 * @param lastSeenEventId - The ID of the last seen event
	 * @param trustedLastSeenEventId - The trusted last seen event ID (usually same as lastSeenEventId)
	 */
	// public static updateLastSeenEventId(lastSeenEventId: string, trustedLastSeenEventId?: string): AxiosRequestConfig {
	// 	return {
	// 		method: 'post',
	// 		url: 'https://x.com/i/api/1.1/dm/update_last_seen_event_id.json',
	// 		data: qs.stringify({
	// 			/* eslint-disable @typescript-eslint/naming-convention */
	// 			last_seen_event_id: lastSeenEventId,
	// 			trusted_last_seen_event_id: trustedLastSeenEventId ?? lastSeenEventId,
	// 		}),
	// 	};
	// }

	/**
	 * Get user updates for DMs (polling for new messages)
	 * @param cursor - Cursor for pagination
	 * @param activeConversationId - ID of the currently active conversation
	 */
	// public static userUpdates(cursor?: string, activeConversationId?: string): AxiosRequestConfig {
	// 	return {
	// 		method: 'get',
	// 		url: 'https://x.com/i/api/1.1/dm/user_updates.json',
	// 		params: {
	// 			...DM_BASE_PARAMS,
	// 			/* eslint-disable @typescript-eslint/naming-convention */
	// 			cursor: cursor,
	// 			active_conversation_id: activeConversationId,
	// 			dm_users: false,
	// 		},
	// 		paramsSerializer: { encode: encodeURIComponent },
	// 	};
	// }
}
