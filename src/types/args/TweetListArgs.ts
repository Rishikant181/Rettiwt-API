// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min, validateSync, Max } from 'class-validator';

// TYPES
import { ListArgs } from '../interfaces/Args';
import { ArgumentValidationError } from '../data/Errors';

/**
 * @param count The number of data items to fetch.
 * @param cursor The cursor to the next batch of data.
 */
export class TweetListArgs implements ListArgs {
    /** The number of data items to fetch.
     * 
     * @defaultValue 10
     * @remarks Must be >= 10 and <= 100
     */
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(10)
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
    constructor(count: number = 10, cursor: string = '') {
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