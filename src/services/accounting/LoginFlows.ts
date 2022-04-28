/**
 * @summary Stores the different flows involved in login process
 */
export enum LoginFlows {
    GetLoginFlow = "GetLoginFlow",
    InitiateLogin = "InitiateLogin",
    VerifyEmail = "VerifyEmail",
    VerifyUsername = "VerifyUsername",
    VerifyPassword = "VerifyPassword",
    FinalizeLogin = "FinalizeLogin"
}