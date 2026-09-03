import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { conectarDB } from './src/config/db.js';
import 'dotenv/config';
import proveedoresRoutes from './src/routes/proveedores.routes.js';
import productosRoutes from './src/routes/productos.routes.js';

const app = express();

//Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);

try {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`Servidor Express listo en http://localhost:${PORT}`);
    });
} catch (error) {
    process.exitCode = 1;
}

export default app;
