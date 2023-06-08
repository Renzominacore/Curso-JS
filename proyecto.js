
const estetoscopio = 1;
const tensiometro = 2;
const oximetro = 3;
const termometro = 4;
const pinzasQuirurgicas = 5;
let precioEstetoscopio=49000;
let precioTensiometro= 25000;
let precioOximetro= 19500;
let precioTermometro=7300;
let precioPinzas= 14670;
let total = 0;
let opcion;
let terminarCompra;
let nombre;
nombre=prompt('Por favor, indique su nombre');
bienvenida(nombre);
function bienvenida (nombreCliente){
    alert ('Bienvenido '+nombreCliente+' a SAS insumos medicos');
}
function productos(totalProducto, costo, cantidad) {
   return totalProducto + costo * cantidad;
}
do {
    opcion = parseInt(prompt("Elija sus productos: 1.Estetoscopio 2.Tensiometro 3.Oximetro 4.Termometro 5.PinzasQuirurgicas "));
    switch (opcion) {
        case estetoscopio:
            cantidadProducto = parseInt(prompt("El costo del Estetoscopio es de $49.000, ingrese la cantidad deseada"));
            while (cantidadProducto <= 0) {
                cantidadProducto = parseInt(prompt('Cantidad invalida, ingrese otra'));
            } 
            total = productos(total, precioEstetoscopio,cantidadProducto);
            alert(total);
            break;
        case tensiometro:
            cantidadProducto = parseInt(prompt("El costo del Tensiometro es de $25.000, ingrese la cantidad deseada"));
            while (cantidadProducto <= 0) {
                cantidadProducto = parseInt(prompt('Cantidad invalida, ingrese otra'));
            } 
            total = productos(total, precioTensiometro,cantidadProducto);
            alert(total);
            break;
        case oximetro:
            cantidadProducto = parseInt(prompt("El costo del Oximetro es de $19500, ingrese la cantidad deseada"));
            while (cantidadProducto <= 0) {
                cantidadProducto = parseInt(prompt('Cantidad invalida, ingrese otra'));
            } 
            total = productos(total, precioOximetro,cantidadProducto);
            alert(total);
            break;
        case termometro:
            cantidadProducto = parseInt(prompt("El costo del Termometro es de $7300, ingrese la cantidad deseada"));
            while (cantidadProducto <= 0) {
                cantidadProducto = parseInt(prompt('Cantidad invalida, ingrese otra'));
            } 
            total = productos(total, precioTermometro,cantidadProducto);
            alert(total);
            break;
        case pinzasQuirurgicas:
            cantidadProducto = parseInt(prompt("El costo de las Pinzas quirurgicas es de $14670, ingrese la cantidad deseada"));
            while (cantidadProducto <= 0) {
                cantidadProducto = parseInt(prompt('Cantidad invalida, ingrese otra'));
            }  
            total = productoTienda(total, precioPinzas,cantidadProducto);
            alert(total);
            break;
        default:
            alert("Ingrese una opcion valida, por favor")
    }
    terminarCompra = prompt("desea continuar? si/no")
} while (terminarCompra == "si")
alert("El total de su compra es de: "+total+"");