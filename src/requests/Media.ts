import fs from 'fs';

import { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

import { IMediaMetadataArgs } from '../types/args/PostArgs';

/**
 * Collection of requests related to media.
 *
 * @public
 */
export class MediaRequests {
	/**
	 * @param id - The allocated id of the media item to be uploaded.
	 * @param media - The media item to upload.
	 */
	public static appendUpload(id: string, media: string | ArrayBuffer): AxiosRequestConfig {
		const data = new FormData();
		data.append('media', typeof media == 'string' ? fs.createReadStream(media) : Buffer.from(media));
		return {
			method: 'post',
			headers: { referer: 'https://x.com' },
			url: 'https://upload.x.com/i/media/upload.json',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				command: 'APPEND',
				media_id: id,
				segment_index: 0,
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			data: data,
		};
	}

	/**
	 * @param args - The metadata to set for the media item.
	 */
	public static createMetadata(args: IMediaMetadataArgs): AxiosRequestConfig {
		return {
			method: 'post',
			headers: { referer: 'https://x.com' },
			url: 'https://x.com/i/api/1.1/media/metadata/create.json',
			/* eslint-disable @typescript-eslint/naming-convention */
			data: {
				media_id: args.id,
				...(args.altText !== undefined && { alt_text: { text: args.altText } }),

				...(args.sensitiveWarning !== undefined && { sensitive_media_warning: args.sensitiveWarning }),
				
				...(args.allowDownload !== undefined && {
					allow_download_status: { allow_download: String(args.allowDownload) },
				}),
				
				...(args.blockGrokEdit !== undefined && {
					grok_actions: { block_grok_edit: String(args.blockGrokEdit) },
				}),
				
				...(args.aiGenerated !== undefined && {
					self_reported_ai_generated: { self_reported_ai_generated: String(args.aiGenerated) },
				}),
			},
			/* eslint-enable @typescript-eslint/naming-convention */
		};
	}

	/**
	 * @param id - The allocated id of the media item.
	 */
	public static finalizeUpload(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			headers: { referer: 'https://x.com' },
			url: 'https://upload.x.com/i/media/upload.json',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				command: 'FINALIZE',
				media_id: id,
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param size - The size (in bytes) of the media item to be uploaded.
	 */
	public static initializeUpload(size: number): AxiosRequestConfig {
		return {
			method: 'post',
			headers: { referer: 'https://x.com' },
			url: 'https://upload.x.com/i/media/upload.json',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				command: 'INIT',
				total_bytes: size,
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}
}
