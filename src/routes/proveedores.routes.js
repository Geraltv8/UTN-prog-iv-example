import { Router } from 'express';
import {
    crearProveedor,
    obtenerProveedores,
    actualizarCalificacion
} from '../controllers/proveedor.controller.js';

const router = Router();

router.post('/', crearProveedor);
router.get('/', obtenerProveedores);
router.patch('/:id/calificacion', actualizarCalificacion);

export default router;
