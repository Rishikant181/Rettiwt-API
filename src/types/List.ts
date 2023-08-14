/**
 * The details of a single Twitter List.
 * 
 * @public
 */
export interface IList {
    /** The rest id of the list. */
    id: string;

    /** The name of the list. */
    name: string;

    /** The date and time of creation of the list, int UTC string format. */
    createdAt: string;

    /** The list description. */
    description: string;

    /** The number of memeber of the list. */
    memberCount: string;

    /** The number of subscribers of the list. */
    subscriberCount: string;

    /** The rest id of the user who created the list. */
    createdBy: string;
}