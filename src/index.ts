import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/product.routes';
import configurationRoutes from './routes/configuration.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/config', configurationRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
