// This file contains various models for storing log data in mongodb database

// PACKAGE LIBS
import mongoose from 'mongoose';

// TYPES
import { Log } from '../../types/Logs';

/**
 * @summary Stores a single log entry
 */
export const LogModel = mongoose.model<Log>('Log', new mongoose.Schema({
    time: Date,
    message: String,
    data: JSON
}));