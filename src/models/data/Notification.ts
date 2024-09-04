import { ENotificationType, INotification } from 'rettiwt-core';

import { findKeyByValue } from '../../helper/JsonUtils';

/**
 * The details of a single notification.
 *
 * @public
 */
export class Notification {
	/** The list of id of the users from whom the notification was received. */
	public from: string[];

	/** The id of the notification. */
	public id: string;

	/** The text contents of the notification. */
	public message: string;

	/** The date/time at which the notification was received. */
	public receivedAt: Date;

	/** The list of id of the target tweet(s) of the notification. */
	public target: string[];

	/** The type of notification. */
	public type?: ENotificationType;

	public constructor(notification: INotification) {
		// Getting the notification type
		const notificationType: string | undefined = findKeyByValue(ENotificationType, notification.icon.id);

		this.from = notification.template?.aggregateUserActionsV1?.fromUsers
			? notification.template.aggregateUserActionsV1.fromUsers.map((item) => item.user.id)
			: [];
		this.id = notification.id;
		this.message = notification.message.text;
		this.receivedAt = new Date(notification.timestampMs);
		this.target = notification.template?.aggregateUserActionsV1?.targetObjects
			? notification.template.aggregateUserActionsV1.targetObjects.map((item) => item.tweet.id)
			: [];
		this.type = notificationType
			? ENotificationType[notificationType as keyof typeof ENotificationType]
			: undefined;
	}
}
