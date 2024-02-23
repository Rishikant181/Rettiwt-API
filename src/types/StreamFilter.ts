import { TweetFilter } from 'rettiwt-core';

/**
 * Defines a filter for the streaming of tweets.
 *
 * @public
 */
export type StreamFilter = Omit<TweetFilter, 'startDate' | 'sinceId'>
