import numeroPi, { sumar, restar } from './math.js';
import asincrona from './asincronia.js';
import { Admin } from './admin.js';
import { Usuario } from './usuario.js';
import { Producto } from './producto.js';

console.log("---- Iniciando Sistema -----");

const productoNuevo = new Producto("Teclado", 300.3333);

console.log(productoNuevo.precio);

productoNuevo.precio = 1231.323223;
console.log(productoNuevo.precio);
productoNuevo.precio = -200;

/*const superAdmin = new Admin("admin@gmail.com", 1234567, 4);
const usuario1 = new Usuario("admin@gmail.com", "1234567");

superAdmin.login("1234567");
superAdmin.login("1111111");
superAdmin.borrarBaseDeDatos();

console.log(`El mail es ${superAdmin.email}`);
console.log(`la contraseña es ${superAdmin.password}`);

console.log(`la contraseña es ${usuario1.password}`); */

//asincrona();

//console.log("suma:", sumar(10, 5));
//console.log("el valor de PI es:", numeroPi);




//CREAR UN ARCHIVO usuario.js y una clase usuario 
// que reciba email y password (la pass debe ser privada)

//CREAR UN ARCHIVO Admin.js que importe usuario y crear una clase Admin que herede de Usuario
//y un metodo, que se llame borrarBaseDeDatos()

//app.js crear un objeto admin y probar el metodo