import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './src/routes/auth.routes.js'
import proveedoresRoutes from './src/routes/proveedores.routes.js';
import productosRoutes from './src/routes/productos.routes.js';
import climaRoutes from './src/routes/externo.routes.js'
import { limitadorGlobal } from './src/middlewares/rateLimit.middleware.js';
import iaRoutes from './src/routes/ia.routes.js'

const app = express();

app.use(helmet());

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

app.use('/api/login', authRoutes)
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/externa/clima', climaRoutes);
app.use('/api/ia', iaRoutes);

export default app;
