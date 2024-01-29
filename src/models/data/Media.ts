// PACKAGES
import { IMediaUploadInitializeResponse } from 'rettiwt-core';

/**
 * The details of a single media file.
 *
 * @public
 */
export class Media {
	/** The id of the media. */
	public id: string;

	/**
	 * @param media - The raw media data.
	 */
	public constructor(media: IMediaUploadInitializeResponse) {
		this.id = media.media_id_string;
	}
}
