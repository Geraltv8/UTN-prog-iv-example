import { Router } from 'express';
import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
} from '../controllers/producto.controller.js';

const router = Router();

router.post('/', crearProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', actualizarProducto);
router.delete('/:id', borrarProducto);

export default router;
