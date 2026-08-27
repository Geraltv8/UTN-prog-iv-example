import { Proveedor } from '../models/Proveedor.js';

export const crearProveedor = async (req, res) => {

    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();

        res.status(201).json(proveedorGuardado);

    } catch (error) {
        res.status(400).json(
            { 
                mensaje: "Error al crear", 
                detalle: error.message
            }
        );
    }
};