import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IJobLocation } from '../../types/data/JobLocation';
import { IJobLocation as IRawJobLocation } from '../../types/raw/base/JobLocation';
import { ILocationSelectorQueryResponse } from '../../types/raw/job/LocationSelectorQuery';

/**
 * The details of a single X Job location suggestion.
 *
 * @public
 */
export class JobLocation implements IJobLocation {
	/** The raw location details. */
	private readonly _raw: IRawJobLocation;

	public id: string;
	public name: string;

	/**
	 * @param location - The raw location details.
	 */
	public constructor(location: IRawJobLocation) {
		this._raw = { ...location };
		this.id = location.location_id;
		this.name = location.display_name;
	}

	/** The raw location details. */
	public get raw(): IRawJobLocation {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes job locations from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of job locations.
	 */
	public static list(response: ILocationSelectorQueryResponse): JobLocation[] {
		const locations: JobLocation[] = [];

		for (const item of response.data.location_type_ahead ?? []) {
			if (item.location_id) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: item.location_id });

				locations.push(new JobLocation(item));
			}
		}

		return locations;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IJobLocation {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
