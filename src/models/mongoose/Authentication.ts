// This file contains various models for storing authentication data in mongodb database

// PACKAGE LIBS
import mongoose from "mongoose";

// CUSTOM LIBS

// URLS
import { mongodb_urls } from '../../config/urls';

// TYPES
import { AuthCredentials } from '../../types/Authentication';

// Creating connection to mongodb database
const auth = mongoose.createConnection(mongodb_urls.root);

/**
 * @summary Stores the credentials for authenticated/logged in users
 */
 export const AuthCredentialsModel = auth.model<AuthCredentials>('AuthCredentials', new mongoose.Schema({
    authToken: String,
    csrfToken: String,
    cookie: String
}));