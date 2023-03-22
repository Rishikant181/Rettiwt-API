// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min, validateSync, Max } from 'class-validator';

// TYPES
import { ListArgs } from '../interfaces/Args';
import { ArgumentValidationError } from '../data/Errors';

export class UserListArgs implements ListArgs {
    /** The number of data items to fetch.
     * 
     * @defaultValue 40
     * @remarks Must be >= 40 and <= 100
     */
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(40)
    @Max(100)
    count: number;

    /** The cursor to the batch of data to fetch. */
    @IsString()
    @IsOptional()
    cursor: string;

    /**
     * @param count The number of data items to fetch.
     * @param cursor The cursor to the batch of data to fetch.
     */
    constructor(count: number = 40, cursor: string = '') {
        this.count = count;
        this.cursor = cursor;

        // Validating the arguments
        const validationResult = validateSync(this);

        // If valiation error occured
        if (validationResult.length) {
            throw new ArgumentValidationError(validationResult);
        }
    }
}