import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { ISpace, ISpaceParticipant, ISpaceParticipants } from '../../types/data/Space';
import {
	IAudioSpace,
	IAudioSpaceByIdResponse,
	IAudioSpaceParticipant,
	IAudioSpaceParticipants,
} from '../../types/raw/space/AudioSpaceById';

/**
 * The details of a single Space.
 *
 * @public
 */
export class Space implements ISpace {
	/** The raw space details. */
	private readonly _raw: IAudioSpace;

	public id: string;
	public state?: string;
	public title?: string;
	public mediaKey?: string;
	public createdAt?: string;
	public scheduledStart?: string;
	public startedAt?: string;
	public endedAt?: string;
	public updatedAt?: string;
	public creatorId?: string;
	public conversationControls?: number;
	public disallowJoin?: boolean;
	public isEmployeeOnly?: boolean;
	public isLocked?: boolean;
	public isMuted?: boolean;
	public isSpaceAvailableForClipping?: boolean;
	public isSpaceAvailableForReplay?: boolean;
	public noIncognito?: boolean;
	public totalLiveListeners?: number;
	public totalReplayWatched?: number;
	public participantCount?: number;
	public isSubscribed?: boolean;
	public participants?: ISpaceParticipants;

	/**
	 * @param space - The raw space details.
	 */
	public constructor(space: IAudioSpace) {
		this._raw = { ...space };

		const metadata = space.metadata;

		this.id = metadata?.rest_id ?? '';
		this.state = metadata?.state;
		this.title = metadata?.title;
		this.mediaKey = metadata?.media_key;
		this.createdAt = Space._timestampToIso(metadata?.created_at);
		this.scheduledStart = Space._timestampToIso(metadata?.scheduled_start);
		this.startedAt = Space._timestampToIso(metadata?.started_at);
		this.endedAt = Space._timestampToIso(metadata?.ended_at);
		this.updatedAt = Space._timestampToIso(metadata?.updated_at);
		this.creatorId = metadata?.creator_results?.result?.rest_id ?? metadata?.creator_id;
		this.conversationControls = metadata?.conversation_controls;
		this.disallowJoin = metadata?.disallow_join;
		this.isEmployeeOnly = metadata?.is_employee_only;
		this.isLocked = metadata?.is_locked;
		this.isMuted = metadata?.is_muted;
		this.isSpaceAvailableForClipping = metadata?.is_space_available_for_clipping;
		this.isSpaceAvailableForReplay = metadata?.is_space_available_for_replay;
		this.noIncognito = metadata?.no_incognito;
		this.totalLiveListeners = metadata?.total_live_listeners;
		this.totalReplayWatched = metadata?.total_replay_watched;
		this.participantCount = space.participants?.total ?? metadata?.participant_count;
		this.isSubscribed = space.is_subscribed;
		this.participants = Space._mapParticipants(space.participants);
	}

	/** The raw space details. */
	public get raw(): IAudioSpace {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes a single target space from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The target deserialized space.
	 */
	public static single(response: IAudioSpaceByIdResponse): Space | undefined {
		const audioSpace = response.data?.audioSpace;
		const spaceId = audioSpace?.metadata?.rest_id;

		if (audioSpace && spaceId) {
			// Logging
			LogService.log(LogActions.DESERIALIZE, { id: spaceId });

			return new Space(audioSpace);
		}

		// Logging
		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: 'Space not found, skipping',
		});

		return undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ISpace {
		return {
			id: this.id,
			state: this.state,
			title: this.title,
			mediaKey: this.mediaKey,
			createdAt: this.createdAt,
			scheduledStart: this.scheduledStart,
			startedAt: this.startedAt,
			endedAt: this.endedAt,
			updatedAt: this.updatedAt,
			creatorId: this.creatorId,
			conversationControls: this.conversationControls,
			disallowJoin: this.disallowJoin,
			isEmployeeOnly: this.isEmployeeOnly,
			isLocked: this.isLocked,
			isMuted: this.isMuted,
			isSpaceAvailableForClipping: this.isSpaceAvailableForClipping,
			isSpaceAvailableForReplay: this.isSpaceAvailableForReplay,
			noIncognito: this.noIncognito,
			totalLiveListeners: this.totalLiveListeners,
			totalReplayWatched: this.totalReplayWatched,
			participantCount: this.participantCount,
			isSubscribed: this.isSubscribed,
			participants: this.participants,
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
	 * Maps raw participants to deserialized participants.
	 *
	 * @param participants - The raw participants data.
	 */
	private static _mapParticipants(participants?: IAudioSpaceParticipants): ISpaceParticipants | undefined {
		if (!participants) {
			return undefined;
		}

		return {
			total: participants.total,
			admins: (participants.admins ?? []).map(Space._mapParticipant),
			speakers: (participants.speakers ?? []).map(Space._mapParticipant),
			listeners: (participants.listeners ?? []).map(Space._mapParticipant),
		};
	}

	/**
	 * Maps a raw participant to a deserialized participant.
	 *
	 * @param participant - The raw participant data.
	 */
	private static _mapParticipant(participant: IAudioSpaceParticipant): ISpaceParticipant {
		const userId = participant.user_results?.rest_id ?? participant.user_results?.result?.rest_id;

		return {
			id: userId,
			screenName: participant.twitter_screen_name,
			displayName: participant.display_name,
			avatarUrl: participant.avatar_url,
			isVerified: participant.is_verified,
			isMutedByAdmin: participant.is_muted_by_admin,
			isMutedByGuest: participant.is_muted_by_guest,
		};
	}
}
