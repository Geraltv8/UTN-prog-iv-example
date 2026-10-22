import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { conectarDB } from './src/config/db.js';
import { initListenerFirebase } from './src/services/firebaseListener.js';

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: { origin: '*' }
});
/*
io.on('connection', (socket) => {
    console.log(`🟢 Nuevo cliente conectado al WebSocket, ID: ${socket.id}`);

    socket.on('aviso_frontend', (data) => {
        console.log('mensaje del frontend:', data);

        io.emit('notificacion_global', {
            mensaje: "Alguien hizo click"
        });
    });

    socket.on('disconnect', () => {
        console.log(`🔴 Cliente desconectado. ID: ${socket.id}`)
    });
});
*/
try {
    await conectarDB();
    initListenerFirebase(io);
    httpServer.listen(PORT, () => {
        console.log(`Servidor Express y WebSockets listos en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exitCode = 1;
}