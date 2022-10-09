import express from 'express';
import Product from '../models/ProductModel.js';
import data from '../data.js';

const seedRouter = express.Router();
seedRouter.get('/', async (request, response) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    response.send({createdProducts});
});

export default seedRouter;