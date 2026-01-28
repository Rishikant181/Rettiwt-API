/**
 * The details of a single Space.
 *
 * @public
 */
export interface ISpace {
	/** The rest id of the space. */
	id: string;

	/** The current state of the space. */
	state?: string;

	/** The title of the space. */
	title?: string;

	/** The media key of the space. */
	mediaKey?: string;

	/** The creation date of the space. */
	createdAt?: string;

	/** The scheduled start time of the space. */
	scheduledStart?: string;

	/** The actual start time of the space. */
	startedAt?: string;

	/** The end time of the space. */
	endedAt?: string;

	/** The time at which the space was last updated. */
	updatedAt?: string;

	/** The id of the user who created the space. */
	creatorId?: string;

	/** The conversation controls value for the space. */
	conversationControls?: number;

	/** Whether joining the space is disallowed. */
	disallowJoin?: boolean;

	/** Whether the space is for employees only. */
	isEmployeeOnly?: boolean;

	/** Whether the space is locked. */
	isLocked?: boolean;

	/** Whether the space is muted. */
	isMuted?: boolean;

	/** Whether clipping is available for the space. */
	isSpaceAvailableForClipping?: boolean;

	/** Whether replay is available for the space. */
	isSpaceAvailableForReplay?: boolean;

	/** Whether incognito is disabled for the space. */
	noIncognito?: boolean;

	/** The total live listeners count for the space. */
	totalLiveListeners?: number;

	/** The total replay watched count for the space. */
	totalReplayWatched?: number;

	/** The total participant count reported in the response. */
	participantCount?: number;

	/** Whether the authenticated user is subscribed to the space. */
	isSubscribed?: boolean;

	/** The participants information for the space. */
	participants?: ISpaceParticipants;
}

/**
 * The participants of a Space grouped by roles.
 *
 * @public
 */
export interface ISpaceParticipants {
	/** The total count of participants. */
	total?: number;

	/** The list of admins in the space. */
	admins: ISpaceParticipant[];

	/** The list of speakers in the space. */
	speakers: ISpaceParticipant[];

	/** The list of listeners in the space. */
	listeners: ISpaceParticipant[];
}

/**
 * The details of a single space participant.
 *
 * @public
 */
export interface ISpaceParticipant {
	/** The rest id of the user. */
	id?: string;

	/** The screen name of the user. */
	screenName?: string;

	/** The display name of the user. */
	displayName?: string;

	/** The avatar URL of the user. */
	avatarUrl?: string;

	/** Whether the user is verified. */
	isVerified?: boolean;

	/** Whether the user is muted by admins. */
	isMutedByAdmin?: boolean;

	/** Whether the user is muted by guests. */
	isMutedByGuest?: boolean;
}

