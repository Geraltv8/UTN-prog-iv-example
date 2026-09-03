import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
    razonSocial: {
        type: String,
        required: [true, 'La razón social es obligatoria'],
        trim: true,
        uppercase: true
    },
    cuit: {
        type: String,
        required: [true, 'El CUIT es obligatorio'],
        unique: true,
        match: [/^\d{11}$/, 'El CUIT debe tener exactamente 11 números sin guiones']
    },
    contacto: {
        email: {
            type: String,
            required: [true, 'El email de contacto es obligatorio'],
            lowercase: true
        },
        telefono: String
    },
    direccion: {
        calle: String,
        ciudad: String,
        pais: {
            type: String,
            default: 'Argentina'
        }
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 3
    },
    estadoActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Proveedor = mongoose.model('Proveedor', proveedorSchema);
