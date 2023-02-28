import mongoose from 'mongoose';

/**
 * User Schema for MongoDB
 */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    contactInfo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', UserSchema);
