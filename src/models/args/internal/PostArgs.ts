import {
	ArrayMaxSize,
	IsArray,
	IsNotEmpty,
	IsNumberString,
	IsObject,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	validateSync,
} from 'class-validator';

import { NewTweet, NewTweetMedia } from 'rettiwt-core';

import { EResourceType } from '../../../enums/Resource';
import { DataValidationError } from '../../errors/DataValidationError';

/**
 * User set query parameters that are used to specify the data that is to be posted.
 *
 * @internal
 */
export class PostArgs {
	/** The id of the target resource. */
	@IsOptional()
	@IsNotEmpty({ groups: [EResourceType.TWEET_LIKE, EResourceType.TWEET_RETWEET] })
	@IsNumberString(undefined, { groups: [EResourceType.TWEET_LIKE, EResourceType.TWEET_RETWEET] })
	public id?: string;

	/** The tweet that is to be posted. */
	@IsOptional()
	@IsNotEmpty({ groups: [EResourceType.TWEET_CREATE] })
	@IsObject({ groups: [EResourceType.TWEET_CREATE] })
	public tweet?: TweetArgs;

	/** The media file to be uploaded. */
	@IsOptional()
	@IsNotEmpty({
		groups: [
			EResourceType.MEDIA_UPLOAD_INITIALIZE,
			EResourceType.MEDIA_UPLOAD_APPEND,
			EResourceType.MEDIA_UPLOAD_FINALIZE,
		],
	})
	@IsObject({
		groups: [
			EResourceType.MEDIA_UPLOAD_INITIALIZE,
			EResourceType.MEDIA_UPLOAD_APPEND,
			EResourceType.MEDIA_UPLOAD_FINALIZE,
		],
	})
	public upload?: UploadArgs;

	/**
	 * @param resourceType - The type of resource that is targeted.
	 * @param args - The additional user-defined arguments for posting the resource.
	 */
	public constructor(resourceType: EResourceType, args: PostArgs) {
		this.id = args.id;
		this.tweet = args.tweet ? new TweetArgs(args.tweet) : undefined;
		this.upload = args.upload ? new UploadArgs(resourceType, args.upload) : undefined;

		// Validating this object
		const validationResult = validateSync(this, { groups: [resourceType] });

		// If valiation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}

/**
 * User set query parameters that are used to specify the tweet that is to be posted.
 *
 * @internal
 */
export class TweetArgs extends NewTweet {
	/**
	 * The list of media to be uploaded.
	 *
	 * @remarks
	 * - The media first needs to be uploaded using the {@link EResourceType.MEDIA_UPLOAD} resource.
	 * - After uploading, the returned id(s) can be used to reference the media here.
	 * - Maximum number of media items that can be posted is 4.
	 */
	@IsOptional()
	@IsArray()
	@ArrayMaxSize(4)
	@IsObject({ each: true })
	public media?: TweetMediaArgs[];

	/** The id of the tweet to quote. */
	@IsOptional()
	@IsNumberString()
	public quote?: string;

	/** The id of the Tweet to which the given Tweet must be a reply. */
	@IsOptional()
	@IsNumberString()
	public replyTo?: string;

	/**
	 * The text for the tweet to be created.
	 *
	 * @remarks
	 * Length of the tweet must be \<= 280 characters.
	 */
	@IsNotEmpty()
	@IsString()
	@MaxLength(280)
	public text: string;

	/**
	 * @param args - The additional user-defined arguments for posting the resource.
	 */
	public constructor(args: TweetArgs) {
		super();
		this.text = args.text;
		this.quote = args.quote;
		this.media = args.media ? args.media.map((item) => new TweetMediaArgs(item)) : undefined;
		this.replyTo = args.replyTo;

		// Validating this object
		const validationResult = validateSync(this);

		// If valiation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}

/**
 * User set query parameters that are used to specify the details of the media to be uploaded.
 *
 * @internal
 */
export class TweetMediaArgs extends NewTweetMedia {
	/** The id of the media to upload. */
	@IsNotEmpty()
	@IsNumberString()
	public id: string;

	/**
	 * The list of id of the users tagged in the media.
	 *
	 * @remarks
	 * Maximum number of users that can be tagged is 10.
	 */
	@IsOptional()
	@IsArray()
	@ArrayMaxSize(10)
	@IsNumberString(undefined, { each: true })
	public tags?: string[];

	/**
	 * @param args - The media arguments specifying the media.
	 */
	public constructor(args: TweetMediaArgs) {
		super();
		this.id = args.id;
		this.tags = args.tags ?? [];

		// Validating this object
		const validationResult = validateSync(this);

		// If validation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}

/**
 * User set query parameters that are used while uploading a media file.
 *
 * @internal
 */
export class UploadArgs {
	/** The id allocated to the media file to be uploaded. */
	@IsOptional()
	@IsNotEmpty({ groups: [EResourceType.MEDIA_UPLOAD_APPEND, EResourceType.MEDIA_UPLOAD_FINALIZE] })
	@IsNumberString(undefined, { groups: [EResourceType.MEDIA_UPLOAD_APPEND, EResourceType.MEDIA_UPLOAD_FINALIZE] })
	public id?: string;

	/** The media file to be uploaded. */
	@IsOptional()
	@IsNotEmpty({ groups: [EResourceType.MEDIA_UPLOAD_APPEND] })
	public media?: string | ArrayBuffer;

	/**
	 * The size (in bytes) of the media file to be uploaded.
	 *
	 * @remarks The size must be \<= 5242880 bytes.
	 */
	@IsOptional()
	@IsNotEmpty({ groups: [EResourceType.MEDIA_UPLOAD_INITIALIZE] })
	@Max(5242880, { groups: [EResourceType.MEDIA_UPLOAD_INITIALIZE] })
	public size?: number;

	/**
	 * @param step - The upload step.
	 * @param args - The upload arguments for uploading the media file.
	 */
	public constructor(step: EResourceType, args: UploadArgs) {
		this.size = args.size;
		this.media = args.media;
		this.id = args.id;

		// Validating this object
		const validationResult = validateSync(this, { groups: [step] });

		// If validation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}
