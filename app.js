import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import exampleRoutes from './routes/example.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';

const app = express();

//Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/ejemplos', exampleRoutes)
app.use('/api/proveedores', proveedoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Express listo en http://localhost:${PORT}`);
});