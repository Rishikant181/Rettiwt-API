// PACKAGES
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min, validateSync } from 'class-validator';

// TYPES
import { ListArgs } from '../interfaces/Args';
import { ArgumentValidationError } from '../data/Errors';

export class TweetListArgs implements ListArgs {
    /** The number of data items to fetch.
     * 
     * @defaultValue 10
     * @remarks Must be >= 10
     */
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(10)
    count?: number = 10;

    /** The cursor to the batch of data to fetch. */
    @IsString()
    @IsOptional()
    cursor?: string = '';

    /**
     * @param args The list arguments in JSON format.
     */
    constructor(args: TweetListArgs) {
        this.count = args.count;
        this.cursor = args.cursor;

        // Validating the arguments
        const validationResult = validateSync(this);

        // If valiation error occured
        if (validationResult.length) {
            throw new ArgumentValidationError(validationResult);
        }
    }
}