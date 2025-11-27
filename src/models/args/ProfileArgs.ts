import { IProfileUpdateOptions } from '../../types/args/ProfileArgs';

/**
 * Configuration for profile update.
 *
 * @public
 */
export class ProfileUpdateOptions implements IProfileUpdateOptions {
	public description?: string;
	public location?: string;
	public name?: string;
	public url?: string;

	/**
	 * @param options - The options specifying the profile fields to update.
	 */
	public constructor(options: IProfileUpdateOptions) {
		this.description = options.description;
		this.location = options.location;
		this.name = options.name;
		this.url = options.url;

		// At least one field must be provided
		if (
			this.name === undefined &&
			this.url === undefined &&
			this.location === undefined &&
			this.description === undefined
		) {
			throw new Error('At least one profile field must be provided');
		}

		// Name validation
		if (this.name !== undefined) {
			if (this.name.trim().length === 0) {
				throw new Error('Name cannot be empty');
			}
			if (this.name.length > 50) {
				throw new Error('Name cannot exceed 50 characters');
			}
		}

		// URL validation (minimal - just check if not empty when provided)
		if (this.url !== undefined && this.url.trim().length === 0) {
			throw new Error('URL cannot be empty');
		}

		// Location validation
		if (this.location !== undefined) {
			if (this.location.trim().length === 0) {
				throw new Error('Location cannot be empty');
			}
			if (this.location.length > 30) {
				throw new Error('Location cannot exceed 30 characters');
			}
		}

		// Description validation
		if (this.description !== undefined) {
			if (this.description.trim().length === 0) {
				throw new Error('Description cannot be empty');
			}
			if (this.description.length > 160) {
				throw new Error('Description cannot exceed 160 characters');
			}
		}
	}
}
