class Persona {

    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
    }

}

class Empleado extends Persona {
    #sueldo;

    constructor(nombre, edad, cargo, sueldo) {
        super(nombre, edad);
        this.cargo = cargo;
        this.#sueldo = sueldo
    }

    mostrarDetalles() {
        console.log(`${this.nombre} es ${this.cargo} y cobra ${this.#sueldo}`);
    }
}

class Boton {

    constructor(nombre) {
        this.nombre = nombre;
    }

    hacerClic() {
        setTimeout(function() {
            console.log("Clic tradicional en: " + this.nombre);
        }, 1000);
    }

    hacerClickArrow() {
        setTimeout(() => {
            console.log("Clic arrow en: " + this.nombre);
        }, 1000);
    }
}

const miBoton = new Boton("aceptar");
miBoton.hacerClic();
miBoton.hacerClickArrow();

const empleado1 = new Empleado("juan", 35, "desarrollador", 1500);
enpleado1.mostrarDetalles();

const persona1 = new Persona("juan", 20);
persona1.saludar();

