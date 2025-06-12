import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
});

// Use capital 'User' for consistency
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
