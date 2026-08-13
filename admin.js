import { Usuario } from "./usuario.js";

export class Admin extends Usuario {

    constructor(email, password, nivelAcceso) {
        super(email, password);
        this.nivelAcceso = nivelAcceso;
    }

    borrarBaseDeDatos() {
        if (this.nivelAcceso > 5) {
            console.log("ATENSION: base de datos eliminada.");
        } else {
            console.log("Acceso denegado");
        }
    }
}