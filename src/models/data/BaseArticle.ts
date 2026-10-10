import { IBaseArticle } from '../../types/data/Article';
import { IArticle as IRawArticle } from '../../types/raw/base/Article';
import { IPublishedArticle as IRawPublishedArticle } from '../../types/raw/base/PublishedArticle';

/**
 * Fields shared by lifecycle and published Articles.
 *
 * @public
 */
export abstract class BaseArticle implements IBaseArticle {
	/** The raw Article details. */
	protected readonly _raw: IRawArticle | IRawPublishedArticle;

	public id: string;
	public previewText?: string;
	public title?: string;

	/**
	 * @param article - The raw Article details.
	 * @param id - The identifier selected by the concrete Article model.
	 */
	protected constructor(article: IRawArticle | IRawPublishedArticle, id: string) {
		this._raw = { ...article };
		this.id = id;
		this.title = article.title;
		this.previewText = article.preview_text;
	}

	/** The raw Article details. */
	public get raw(): IRawArticle | IRawPublishedArticle {
		return { ...this._raw };
	}

	/** @returns Fields shared by all serialized Article models. */
	protected _toBaseJSON(): IBaseArticle {
		return {
			id: this.id,
			previewText: this.previewText,
			title: this.title,
		};
	}

	/** @returns A serializable JSON representation of this Article. */
	public abstract toJSON(): IBaseArticle;
}
