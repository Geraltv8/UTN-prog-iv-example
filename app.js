import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { conectarDB } from './src/config/db.js';
import 'dotenv/config';
import authRoutes from './src/routes/auth.routes.js'
import proveedoresRoutes from './src/routes/proveedores.routes.js';
import productosRoutes from './src/routes/productos.routes.js';
import { limitadorGlobal } from './src/middlewares/rateLimit.middleware.js';

const app = express();

//Middlewares globales
//Oculata los headers
app.use(helmet());

//whitelist de paginas permitidas
const originesPermitidos = ['http://localhost:5173', 'https://mi-pagina.com']

app.use(cors({
    origin: function (origen, callback) {
        if (!origen || originesPermitidos.includes(origen)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por politicas CORS'));
        }
    }
}));

app.use(morgan('dev'));
app.use(limitadorGlobal);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/login', authRoutes)
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
