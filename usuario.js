export class Usuario {
    #password;

    constructor(email, password) {
        this.email = email;
        this.#password = password;
    }

    login(pass) {
        if (pass === this.#password) {
            console.log(`Login exitoso para ${this.email}`);
            return true;
        }
        console.log("Contraseña incorrecta");
        return false 
    }
}