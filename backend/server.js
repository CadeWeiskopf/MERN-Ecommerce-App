import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/SeedRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import userRouter from './routes/UserRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('db connected');
}).catch((error) => {
    console.log(error.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((error, request, response, next) => {
    response.status(500).send({message: error.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});