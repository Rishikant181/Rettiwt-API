// PACKAGES
import { IsInt, IsString, IsOptional, Min, validateSync, Max, ValidateIf } from 'class-validator';
import { DataValidationError } from 'rettiwt-core';

// TYPES
import { IListArgs } from '../../types/Args';

/**
 * The arguments for fetching cursored list in TweetService.
 * 
 * @internal
 */
export class TweetListArgs implements IListArgs {
    /** The number of data items to fetch.
     * 
     * @defaultValue 10
     * @remarks Must be >= 10 and <= 100
     */
    @IsInt()
    @IsOptional()
    @Max(100)
    @ValidateIf(ob => ob.cursor.length == 0)
    @Min(10)
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
            throw new DataValidationError(validationResult);
        }
    }
}