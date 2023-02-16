/**
 * @returns The url for fetching a guest token
 */
export function guestTokenUrl(): string {
    return `https://api.twitter.com/1.1/guest/activate.json`;
}