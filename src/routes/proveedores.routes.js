import { Router } from 'express';
import {
    crearProveedor,
    obtenerProveedores,
    actualizarCalificacion
} from '../controllers/proveedor.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { verificarRolAdmin } from '../middlewares/rol.middleware.js';

const router = Router();

router.post('/', verificarToken, verificarRolAdmin, crearProveedor);
router.get('/', verificarToken, obtenerProveedores);
router.patch('/:id/calificacion', actualizarCalificacion);

export default router;
