/* eslint-disable */

import { RawNotificationType } from '../../../enums/raw/Notification';
import { IDataResult } from '../composite/DataResult';
import { ITweet } from './Tweet';
import { IUser } from './User';

/**
 * Represents the raw data of a single Notification.
 *
 * @public
 */
export interface INotification {
	itemType: string;
	__typename: string;
	id: string;
	notification_icon: RawNotificationType;
	rich_message: INotificationRichMessage;
	notification_url: INotificationUrl;
	template: INoticiationTemplate;
	timestamp_ms: string;
}

export interface INotificationRichMessage {
	rtl: boolean;
	text: string;
	entities: INotificationEntity[];
}

export interface INotificationEntity {
	fromIndex: number;
	toIndex: number;
	ref: INotificationEntityRef;
}

export interface INotificationEntityRef {
	type: string;
	user_results: IDataResult<IUser>;
}

export interface INotificationUrl {
	url: string;
	urlType: string;
	urtEndpointOptions?: INotificationUrtEndpointOptions;
}

export interface INotificationUrtEndpointOptions {
	cacheId: string;
	title: string;
}

export interface INoticiationTemplate {
	__typename: string;
	target_objects: INotificationTargetObject[];
	from_users: INotificationFromUser[];
}

export interface INotificationTargetObject {
	__typename: string;
	tweet_results: IDataResult<ITweet>;
}

export interface INotificationFromUser {
	__typename: string;
	user_results: IDataResult<IUser>;
}
