import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({mensaje: "Lista de todos los proveedores"});
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: "Detelles del proveedor ID:" + id});
});

router.post('/', (req, res) => {
    const nuevoProveedor = req.body;
    res.status(201).json({ mensaje: "Proveedor registrado", data: nuevoProveedor});
});

export default router;