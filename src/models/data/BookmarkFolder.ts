import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IBookmarkFolder } from '../../types/data/BookmarkFolder';
import { IBookmarkFolder as IRawBookmarkFolder } from '../../types/raw/base/BookmarkFolder';

/**
 * The details of a single Bookmark Folder.
 *
 * @public
 */
export class BookmarkFolder implements IBookmarkFolder {
	/** The raw bookmark folder details. */
	private readonly _raw: IRawBookmarkFolder;

	public id: string;
	public name: string;

	/**
	 * @param folder - The raw bookmark folder details.
	 */
	public constructor(folder: IRawBookmarkFolder) {
		this._raw = { ...folder };
		this.id = folder.id;
		this.name = folder.name;
	}

	/** The raw bookmark folder details. */
	public get raw(): IRawBookmarkFolder {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes bookmark folders from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of bookmark folders.
	 */
	public static list(response: NonNullable<unknown>): BookmarkFolder[] {
		const folders: BookmarkFolder[] = [];

		// Extract items from the response structure
		const items = (response as any)?.data?.viewer?.user_results?.result?.bookmark_collections_slice?.items;

		if (!items || !Array.isArray(items)) {
			return folders;
		}

		// Deserialize valid folders
		for (const item of items) {
			if (item && item.id) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: item.id });

				folders.push(new BookmarkFolder(item));
			}
		}

		return folders;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IBookmarkFolder {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
