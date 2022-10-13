import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: '30d'
        }
    );
};

export const generateSalt = async () => {
    return bcrypt.genSalt();
}