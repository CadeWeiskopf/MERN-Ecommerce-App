import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        hash: {type: String, required: true},
        salt: {type: String, required: true},
        roles: {type: Array, default: [], required: true}
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
export default User;