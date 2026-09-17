import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String, 
        required: true
    },
    rol: {
        type: String,
        enum: ['ADMIN', 'VENDEDOR'],
        default: 'VENDEDOR'
    }
}, {
    timestamps: true
});

usuarioSchema.pre('save', async function() {

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.compararPassword = async function(passwordIgresado) {
    return await bcrypt.compare(passwordIgresado, this.password);
};


export const Usuario = mongoose.model('Usuario', usuarioSchema);