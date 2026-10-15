import { dbFirestore } from "../config/firebase.js";
import { io } from "../../app.js"

export const initListenerFirebase = () => {
    console.log("🦻 Node.js esta escuchando Firebase Firestore...");

    dbFirestore.collection('alertas').onSnapshot((snapshot) => {
        
        snapshot.docChanges().forEach((cambio) => {
            if (cambio.type === 'added') {
                const nuevaAlerta = cambio.doc.data();
                console.log("Cambio en la nube de google detectado: ", nuevaAlerta);

                io.emit('nueva_alerta_urgente', nuevaAlerta);
            }
        });
    });
};