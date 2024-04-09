import { IInitializeMediaUploadResponse } from 'rettiwt-core';

/**
 * The details of a single media file.
 *
 * @public
 */
export class Media {
	/** The id of the media. */
	public id: string;

	/**
	 * @param media - The raw media details.
	 */
	public constructor(media: IInitializeMediaUploadResponse) {
		this.id = media.media_id_string;
	}
}
