import { Producto } from '../models/Producto.js';

export const crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el producto', detalle: error.message });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        const filtro = req.query.categoria ? { categoria: req.query.categoria } : {};
        const productos = await Producto.find(filtro)
            .populate('proveedor', 'razonSocial cuit contacto.email calificacion');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor', detalle: error.message });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
            .populate('proveedor', 'razonSocial cuit contacto.email calificacion');

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'ID inválido', detalle: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('proveedor', 'razonSocial cuit contacto.email calificacion');

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', detalle: error.message });
    }
};

export const borrarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { estadoActivo: false },
            { new: true, runValidators: true }
        );

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al borrar el producto', detalle: error.message });
    }
};
