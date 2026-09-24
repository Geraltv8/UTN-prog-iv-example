import { Router } from 'express';
import { check } from 'express-validator';
import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
} from '../controllers/producto.controller.js';
import { validarCampos } from '../middlewares/validarCampos.middleware.js';

const router = Router();

const checksProducto = [
    check('nombre', 'El nombre debe ser un texto').optional().isString(),
    check('precio', 'El precio debe ser un numero').optional().isNumeric(),
    check('precio', 'El precio no puede ser negativo').optional().isFloat({ min: 0 }),
    check('stock', 'El stock debe ser un numero').optional().isNumeric(),
    check('stock', 'El stock no puede ser negativo').optional().isFloat({ min: 0 }),
    check('codigoSKU', 'El formato del SKU debe ser AAA-111').optional().matches(/^[A-Z]{3}-\d{3}$/),
    check('categoria', 'Categoria no valida').optional().isIn(['PERIFERICOS', 'MONITORES', 'COMPONENTES', 'ACCESORIOS']),
    check('proveedor', 'El proveedor debe ser un ID válido').optional().isMongoId(),
    check('estadoActivo', 'El estadoActivo debe ser booleano').optional().isBoolean(),
];

const checksProductoObligatorios = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('codigoSKU', 'El código SKU es obligatorio').not().isEmpty(),
    check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
];

router.post('/', [
    ...checksProductoObligatorios,
    ...checksProducto,
    validarCampos,
], crearProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', [
    ...checksProducto,
    validarCampos,
], actualizarProducto);
router.delete('/:id', borrarProducto);

export default router;
