import express from 'express';
import Product from '../models/ProductModel.js';

const productRouter = express.Router();

productRouter.get('/', async (request, response) => {
    const products = await Product.find();
    response.send(products);
});

productRouter.get('/slug/:slug', async (request, response) => {
    const product = await Product.findOne({slug:request.params.slug});
    if (product) {
        response.send(product);
    } else {
        response.status(404).send({message: 'Product not found.'});
    }
});
productRouter.get('/:id', async (request, response) => {
    const product = await Product.findById(request.params.id);
    if (product) {
        response.send(product);
    } else {
        response.status(404).send({message: 'Product not found.'});
    }
});

export default productRouter;
