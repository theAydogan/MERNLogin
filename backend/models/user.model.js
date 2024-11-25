/**
 * @fileoverview User model schema definition for MongoDB
 * @module models/user
 * @requires mongoose
 * 
 * @description Defines the schema for User documents in MongoDB.
 * Each user has a unique username that must be at least 5 characters long.
 * The schema includes automatic timestamp fields (createdAt, updatedAt).
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;