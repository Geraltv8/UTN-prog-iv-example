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

export const obtenerProveedores = async (req, res) => {
    try {

        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);

    } catch (error) {
        res.status(500).json(
            { 
                mensaje: "error del servidor"
            }
        );
    }
};

export const obtenerProveedorPorId = async (req, res) => {
    try {

        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json(
                {
                    mensaje: "Proveedor no encontrado"
                }
            );
        }

        res.status(200).json(proveedor);

    } catch (error) {
        res.status(400).json(
            {
                mensaje: "ID invalido"
            }
        );
    }
};

export const actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const datosNuevos = req.body;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(
            id,
            datosNuevos,
            { new: true, runValidators: true}
        );

        if (!proveedorActualizado) {
            return res.status(404).json(
                {
                    mensaje: "Proveedor no encontrado"
                }
            );
        }

          res.status(200).json(proveedorActualizado);
    } catch (error) {
        res.status(400).json(
            {
                mensaje: "Error al actualizar", 
                detalle: error.message
            }
        )
    }
};

export const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedorBorrado = await Proveedor.findByIdAndDelete(id);

        if (!proveedorBorrado) {
            return res.status(404).json(
                {
                    mensaje: "Proveedor no encontrado"
                }
            );
        }

        res.status(200).json(
            {
                mensaje: "Proveedor eliminado con existo"
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                mensaje: "error al eliminar"
            }
        );
    }
};