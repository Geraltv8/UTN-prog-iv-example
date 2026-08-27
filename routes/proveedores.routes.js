import { Router } from 'express';

import {
    crearProveedor,
    obtenerProveedores,
    actualizarProveedor,
    obtenerProveedorPorId,
    eliminarProveedor
} from '../controllers/proveedor.controller.js'

const router = Router();

router.post('/', crearProveedor);
router.get('/', obtenerProveedores);
router.get('/:id', obtenerProveedorPorId);
router.put('/:id', actualizarProveedor);
router.delete('/:id', eliminarProveedor);

export default router;


