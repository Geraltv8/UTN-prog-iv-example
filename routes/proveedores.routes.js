import { Router } from 'express';

import {
    crearProveedor,
    obtenerProveedores
} from '../controllers/proveedor.controller.js'

const router = Router();

router.post('/', crearProveedor);
router.get('/', obtenerProveedores);

export default router;


