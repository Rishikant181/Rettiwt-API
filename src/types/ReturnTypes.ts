import { CursoredData } from '../models/data/CursoredData';
import { Tweet } from '../models/data/Tweet';
import { User } from '../models/data/User';

/**
 * Collection of all return types.
 *
 * @internal
 */
export type AllReturnTypes = boolean | CursoredData<Tweet> | CursoredData<User> | string | Tweet | User;

/**
 * Return type of fetch requests.
 *
 * @internal
 */
export type FetchReturnType = boolean | CursoredData<Tweet> | CursoredData<User> | Tweet | User;

/**
 * Return type of post requests.
 *
 * @internal
 */
export type PostReturnType = boolean;
