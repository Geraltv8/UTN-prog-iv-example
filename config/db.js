import mongoose from "mongoose";

export const conectarDB = async () => {
    try {

        const conexion = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[🟢] Base de datos conectada: ${conexion.connection.name}`);

    } catch (error) {

        console.error(`[🔴] Error al conectar a Mongo DB: ${error.message}`);
        process.exit(1);
    }
};