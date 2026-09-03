import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    codigoSKU: {
        type: String,
        required: [true, 'El código SKU es obligatorio'],
        unique: true,
        uppercase: true,
        match: [/^[A-Z]{3}-\d{3}$/, 'El SKU debe tener el formato ABC-123']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    categoria: {
        type: String,
        enum: ['PERIFERICOS', 'MONITORES', 'COMPONENTES', 'ACCESORIOS']
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: [true, 'El proveedor es obligatorio']
    },
    estadoActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Producto = mongoose.model('Producto', productoSchema);
