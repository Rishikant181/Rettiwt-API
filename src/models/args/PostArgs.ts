import { INewTweet, INewTweetMedia, IPostArgs, IUploadArgs } from '../../types/args/PostArgs';

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export class PostArgs implements IPostArgs {
	public id?: string;
	public tweet?: NewTweet;
	public upload?: UploadArgs;

	/**
	 * @param resource - The resource to be posted.
	 * @param args - Additional user-defined arguments for posting the resource.
	 */
	public constructor(args: IPostArgs) {
		this.id = args.id;
		this.tweet = args.tweet ? new NewTweet(args.tweet) : undefined;
		this.upload = args.upload ? new UploadArgs(args.upload) : undefined;
	}
}

/**
 * Configuration for the new tweet to be posted.
 *
 * @public
 */
export class NewTweet implements INewTweet {
	public media?: NewTweetMedia[];
	public quote?: string;
	public replyTo?: string;
	public scheduleFor?: Date;
	public text: string;

	/**
	 * @param newTweet - The args specifying the new tweet to be posted.
	 */
	public constructor(newTweet: INewTweet) {
		this.media = newTweet.media;
		this.quote = newTweet.quote;
		this.replyTo = newTweet.replyTo;
		this.scheduleFor = newTweet.scheduleFor;
		this.text = newTweet.text ?? '';
	}
}

/**
 * Configuration for the media to be uploaded.
 *
 * @public
 */
export class NewTweetMedia implements INewTweetMedia {
	public id: string;
	public tags?: string[];

	/**
	 * @param newTweetMedia - The args specifying the new media to be posted along with the tweet.
	 */
	public constructor(newTweetMedia: INewTweetMedia) {
		this.id = newTweetMedia.id;
		this.tags = newTweetMedia.tags;
	}
}

/**
 * Options specifying the media file to be uploaded.
 *
 * @public
 */
export class UploadArgs implements IUploadArgs {
	public id?: string;
	public media?: string | ArrayBuffer;
	public size?: number;

	/**
	 * @param step - The upload step.
	 * @param args - The upload arguments for uploading the media file.
	 */
	public constructor(args: IUploadArgs) {
		this.size = args.size;
		this.media = args.media;
		this.id = args.id;
	}
}
