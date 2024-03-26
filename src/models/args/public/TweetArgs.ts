import {
	ArrayMaxSize,
	IsArray,
	IsNotEmpty,
	IsNumberString,
	IsObject,
	IsOptional,
	IsString,
	MaxLength,
	validateSync,
} from 'class-validator';

import { DataValidationError } from '../../errors/DataValidationError';

/**
 * The arguments specifying the tweet to be posted.
 */
export class TweetArgs {
	/**
	 * The media content of the tweet.
	 *
	 * @remarks Max number of media that can be posted is 4.
	 */
	@IsOptional()
	@IsArray()
	@ArrayMaxSize(4)
	@IsObject({ each: true })
	public media?: TweetMediaArgs[];

	/**	The id of the tweet to quote. */
	@IsOptional()
	@IsNumberString()
	public quote?: string;

	/**	The id of the tweet to which the reply is to be made. */
	@IsOptional()
	@IsNumberString()
	public replyTo?: string;

	/**
	 * The text content of the tweet.
	 *
	 * @remarks Length must be \<= 280 characters.
	 */
	@IsNotEmpty()
	@IsString()
	@MaxLength(280)
	public text: string;

	/**
	 * @param tweet - The tweet arguments specifying the tweet.
	 */
	public constructor(tweet: TweetArgs) {
		this.text = tweet.text;
		this.media = tweet.media ? tweet.media.map((item) => new TweetMediaArgs(item)) : undefined;
		this.replyTo = tweet.replyTo;
		this.quote = tweet.quote;

		// Validating this object
		const validationResult = validateSync(this);

		// If validation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}

/**
 * The arguments specifying the media to be posted in a single tweet.
 *
 * @public
 */
export class TweetMediaArgs {
	/**
	 * The media file to be posted.
	 * Can be either a path to the media file or an ArrayBuffer containing the media file.
	 *
	 * @remarks The size of the media file must be \<= 5242880 bytes.
	 */
	@IsNotEmpty()
	public path: string | ArrayBuffer;

	/**
	 * The list of id of users to be tagged in the media.
	 *
	 * @remarks Max number of tags is 10.
	 */
	@IsOptional()
	@IsArray()
	@ArrayMaxSize(10)
	@IsNumberString(undefined, { each: true })
	public tags?: string[];

	/**
	 * @param media - The media arguments specifying the media.
	 */
	public constructor(media: TweetMediaArgs) {
		this.path = media.path;
		this.tags = media.tags ?? [];

		// Validating this object
		const validationResult = validateSync(this);

		// If validation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}
