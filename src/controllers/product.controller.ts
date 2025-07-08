import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { Product } from '../interfaces/product.interface';

export const getProduct = async (req: Request, res: Response) => {
    try{
        const product = await productService.getProducts();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const newProduct = req.body as Product;

    if (
        !newProduct.name ||
        !newProduct.amount ||
        !newProduct.price ||
        !newProduct.category ||
        !newProduct.state ||
        !newProduct.idUser
    ) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const createdProduct = await productService.addProduct(newProduct);
        res.status(201).json(createdProduct);
        return;
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        return;
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const idProduct = Number(req.params.id);
    const productData = req.body as Product;

    if (
        !productData.name ||
        !productData.amount ||
        !productData.price ||
        !productData.category ||
        !productData.state ||
        !productData.idUser
    ) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const updatedProduct = await productService.updateProduct({ ...productData, idProduct });
        res.json(updatedProduct);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};