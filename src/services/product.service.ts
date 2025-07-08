import { Product } from "src/interfaces/product.interface";
import { db } from "../database";

export const getProducts = async(): Promise<Product[]> => {
    const products = await db.query('select * from products');
    return products as Product[];
};

export const addProduct = async (productData: Product): Promise<Product[]> => {
    const { name, amount, price, category, state, idUser } = productData;
    const result = await db.query(
        'insert into products (name, amount, price, category, state, idUser) values (?, ?, ?, ?, ?, ?)',
        [name, amount, price, category, state, idUser]
    );
    return [{ idProduct: (result as any).insertId, name, amount, price, category, state, idUser }];
};

export const updateProduct = async (productData: Product): Promise<Product[]> => {
    const { idProduct, name, amount, price, category, state, idUser } = productData;
    await db.query(
        'update products set name = ?, amount = ?, price = ?, category = ?, state = ?, idUser = ? where idProduct = ?',
        [name, amount, price, category, state, idUser, idProduct]
    );
    return [{ idProduct, name, amount, price, category, state, idUser }];
};