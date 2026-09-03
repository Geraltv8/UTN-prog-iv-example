import { Proveedor } from '../models/Proveedor.js';

export const crearProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.create(req.body);
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el proveedor', detalle: error.message });
    }
};

export const obtenerProveedores = async (req, res) => {
    try {
        const filtro = req.query.ciudad
            ? { 'direccion.ciudad': req.query.ciudad }
            : {};
        const proveedores = await Proveedor.find(filtro);
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor', detalle: error.message });
    }
};

export const actualizarCalificacion = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(
            req.params.id,
            { calificacion: req.body.calificacion },
            { new: true, runValidators: true }
        );

        if (!proveedor) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }

        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la calificación', detalle: error.message });
    }
};
