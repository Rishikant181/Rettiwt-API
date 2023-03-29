// PACKAGE
import { IsArray, IsBoolean, IsNumberString, IsString, IsOptional, IsDateString, validateSync } from 'class-validator';

// TYPES
import { TweetFilter as ITweetFilter } from '../../types/Args';
import { DataValidationError } from '../errors/DataValidationError';

/**
 * The filter to be used for fetching tweets from Twitter.
 * 
 * @internal
 */
export class TweetFilter implements ITweetFilter {
    /** The list of words to search. */
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    words?: string[];

    /** The list of hashtags to search.
     *
     * @remarks
     * '#' must be excluded from the hashtag!
     */
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    hashtags?: string[];

    /** The list of usernames whose tweets are to be searched.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    fromUsers?: string[];

    /** The list of username to whom the tweets to be searched, are adressed.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    toUsers?: string[];

    /** The list of username mentioned in the tweets to search.
     *
     * @remarks
     * '@' must be excluded from the username!
     */
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    mentions?: string[];

    /** The date starting from which tweets are to be searched.
     *
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    @IsOptional()
    @IsDateString()
    startDate?: string;

    /** The date upto which tweets are to be searched.
     *
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    @IsOptional()
    @IsDateString()
    endDate?: string;

    /** The id of the tweet, after which the tweets are to be searched. */
    @IsNumberString()
    @IsOptional()
    sinceId?: string;

    /** The id of the tweet which is quoted in the tweets to search. */
    @IsNumberString()
    @IsOptional()
    quoted?: string;
    
    /** Whether to fetch tweets that are links or not.
     *
     * @defaultValue false
     */
    @IsBoolean()
    @IsOptional()
    links?: boolean;

    /**
     * @param filter The incoming filter in JSON format.
     */
    constructor(filter: TweetFilter) {
        this.endDate = filter.endDate;
        this.fromUsers = filter.fromUsers;
        this.hashtags = filter.hashtags;
        this.links = filter.links;
        this.mentions = filter.mentions;
        this.quoted = filter.quoted;
        this.sinceId = filter.sinceId;
        this.startDate = filter.startDate;
        this.toUsers = filter.toUsers;
        this.words = filter.words;

        // Validating the filter
        const validationResult = validateSync(this);

        // If valiation error occured
        if (validationResult.length) {
            throw new DataValidationError(validationResult);
        }
    }
}