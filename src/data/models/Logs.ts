// This file contains various models for storing log data in mongodb database

// PACKAGE LIBS
import mongoose, { Schema } from 'mongoose';

// Stores a single log entry
export const Log = mongoose.model('Log', new Schema({
    time: Date,
    data: JSON
}));