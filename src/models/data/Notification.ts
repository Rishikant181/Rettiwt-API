import { NotificationType } from '../../enums/Notification';
import { findByFilter } from '../../helper/JsonUtils';
import { INotification } from '../../types/data/Notification';
import { INotification as IRawNotification } from '../../types/raw/base/Notification';

/**
 * The details of a single notification.
 *
 * @public
 */
export class Notification implements INotification {
	/** The raw notification details. */
	private readonly _raw: IRawNotification;

	public from: string[];
	public id: string;
	public message: string;
	public receivedAt: string;
	public target: string[];
	public type?: NotificationType;

	/**
	 * @param notification - The raw notification details.
	 */
	public constructor(notification: IRawNotification) {
		this._raw = { ...notification };

		// Getting the original notification type
		const notificationType = notification.notification_icon.toString();

		this.from = notification.template.from_users
			? notification.template.from_users.map((item) => item.user_results.result.rest_id)
			: [];
		this.id = notification.id;
		this.message = notification.rich_message.text;
		this.receivedAt = new Date(notification.timestamp_ms).toISOString();
		this.target = notification.template.target_objects
			? notification.template.target_objects.map((item) => item.tweet_results.result.rest_id)
			: [];
		this.type = notificationType
			? NotificationType[notificationType as keyof typeof NotificationType]
			: NotificationType.UNDEFINED;
	}

	/** The raw notification details. */
	public get raw(): IRawNotification {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes the list of notifications from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of notifications.
	 */
	public static list(response: NonNullable<unknown>): Notification[] {
		const notifications: Notification[] = [];

		// Extracting the matching data
		const extract = findByFilter<IRawNotification>(response, '__typename', 'TimelineNotification');

		// Deserializing valid data
		for (const item of extract) {
			notifications.push(new Notification(item));
		}

		return notifications;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): INotification {
		return {
			from: this.from,
			id: this.id,
			message: this.message,
			receivedAt: this.receivedAt,
			target: this.target,
			type: this.type,
		};
	}
}
