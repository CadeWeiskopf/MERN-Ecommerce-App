import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, generateSalt } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/signin', 
    expressAsyncHandler(async (request, response) => {
        const user = await User.findOne({email: request.body.email});
        if (user) {
            if (bcrypt.compareSync(request.body.password + user.salt, user.hash)) {
                response.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    roles: user.roles,
                    token: generateToken(user)
                });
                return;
            }
        }

        response.status(401).send({message: 'Invalid email/password.'});
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (request, response) => {
        const salt = await generateSalt();
        const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            hash: bcrypt.hashSync(request.body.password + salt),
            salt: salt
        });
        const user = await newUser.save();
        console.log('new user =' + user);
        response.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            token: generateToken(user)
        });
    })
);

export default userRouter