import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import {
	IUnderTheHoodAccountLabel,
	IUnderTheHoodPostLabel,
	IUnderTheHoodReport,
} from '../../types/data/UnderTheHoodReport';
import {
	IRawUnderTheHoodAccountLabel,
	IRawUnderTheHoodPostLabel,
	IUserUnderTheHoodDownloadResponse,
} from '../../types/raw/user/UnderTheHoodDownload';

/**
 * The "Under the hood" transparency report of the logged-in user.
 *
 * @public
 */
export class UnderTheHoodReport implements IUnderTheHoodReport {
	/** The raw report details. */
	private readonly _raw: IUserUnderTheHoodDownloadResponse;

	public accountLabels: IUnderTheHoodAccountLabel[];
	public endDate: string;
	public generatedAt: string;
	public notes?: string;
	public postCount: number;
	public postLabels: IUnderTheHoodPostLabel[];
	public startDate: string;
	public timezone: string;

	/**
	 * @param report - The raw report details.
	 */
	public constructor(report: IUserUnderTheHoodDownloadResponse) {
		this._raw = { ...report };

		this.startDate = report.period?.startDate ?? '';
		this.endDate = report.period?.endDate ?? '';
		this.timezone = report.period?.timezone ?? 'UTC';
		this.generatedAt = report.generatedAt ?? '';
		this.postCount = UnderTheHoodReport._toNumber(report.postCount);
		this.notes = report.notes;
		this.postLabels = (report.postLabels ?? [])
			.filter((label) => label.label)
			.map((label) => UnderTheHoodReport._buildPostLabel(label));
		this.accountLabels = (report.accountLabels ?? [])
			.filter((label) => label.label)
			.map((label) => UnderTheHoodReport._buildAccountLabel(label));
	}

	/** The raw report details. */
	public get raw(): IUserUnderTheHoodDownloadResponse {
		return { ...this._raw };
	}

	private static _buildAccountLabel(label: IRawUnderTheHoodAccountLabel): IUnderTheHoodAccountLabel {
		return {
			label: label.label ?? '',
			about: label.about ?? '',
			effect: label.effect ?? '',
			days: UnderTheHoodReport._toNumber(label.days),
			totalDays: UnderTheHoodReport._toNumber(label.daysInPeriod),
			percentage: label.percentageOfDays ?? '',
			howToAppeal: label.howToAppeal,
		};
	}

	private static _buildPostLabel(label: IRawUnderTheHoodPostLabel): IUnderTheHoodPostLabel {
		return {
			label: label.label ?? '',
			about: label.about ?? '',
			effect: label.effect ?? '',
			posts: UnderTheHoodReport._toNumber(label.posts),
			totalPosts: UnderTheHoodReport._toNumber(label.totalPostsInMonth),
			percentage: label.percentageOfPosts ?? '',
			howToAppeal: label.howToAppeal,
			postIds: (label.postIds ?? []).map((id) => String(id)),
			postIdsMostRecentNote: label.postIdsMostRecentNote,
			postIdsNotShownNote: label.postIdsNotShownNote,
		};
	}

	private static _toNumber(value?: string | number): number {
		const parsed = typeof value === 'number' ? value : Number(value ?? 0);

		return Number.isFinite(parsed) ? parsed : 0;
	}

	/**
	 * Extracts and deserializes the report from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized report.
	 */
	public static single(response: NonNullable<unknown>): UnderTheHoodReport | undefined {
		const report = response as IUserUnderTheHoodDownloadResponse;

		if (!report?.period) {
			LogService.log(LogActions.WARNING, {
				action: LogActions.DESERIALIZE,
				message: `Under the hood report not found, skipping`,
			});
			return undefined;
		}

		// Logging
		LogService.log(LogActions.DESERIALIZE, { id: report.period.startDate });

		return new UnderTheHoodReport(report);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IUnderTheHoodReport {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			timezone: this.timezone,
			generatedAt: this.generatedAt,
			postCount: this.postCount,
			notes: this.notes,
			postLabels: this.postLabels,
			accountLabels: this.accountLabels,
		};
	}
}
