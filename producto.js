export class Producto {
    #precio;

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.#precio = precio;
    }

    get precio() {
        return `$${this.#precio.toFixed(2)}`;
    }

    set precio(nuevoPrecio) {
        if (nuevoPrecio < 0) {
            console.error("Error: El precio no puede ser negativo");
            return;
        }
        this.#precio = nuevoPrecio;
    }
}