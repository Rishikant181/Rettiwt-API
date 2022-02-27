export enum UIDTYPE{//universal UIDTYPE
    USER=0,
    TWEET=1,
    UNDEFINED=2
}
export enum TWEETTYPE{
    TWEET=0,
    COMMENT=1,
    REPLY=2,
    RETWEET=3,

}
export type UID={
    restID:string,
    screenName:string,
    TYPE:UIDTYPE
}