// This file contains various models for storing log data in mongodb database

// PACKAGE LIBS
import mongoose from 'mongoose';

/**
 * @summary Stores a single log entry
 */
export const Log = mongoose.model('Log', new mongoose.Schema({
    time: Date,
    message: String,
    data: JSON
}));