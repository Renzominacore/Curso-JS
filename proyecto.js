const productos = [
    { nombre: "Estetoscopio", precio: 49000, marca: "Littmann" },
    { nombre: "Tensiómetro", precio: 25000, marca: "Omron" },
    { nombre: "Oxímetro", precio: 19500, marca: "Yonker" },
    { nombre: "Termómetro", precio: 7300, marca: "Philco" },
    { nombre: "PinzasQuirurgicas", precio: 14670, marca: "ARTMAN" }
];

const detalleFactura = []; 

let cantidad;
//let total = 0;
let opcion;
let agregar;
let nombrePersona;

nombrePersona=prompt('Por favor, indique su nombre');
bienvenida(nombrePersona);
function bienvenida (nombreCliente){
    alert ('Bienvenido '+nombreCliente+' a SAS insumos medicos');
}

do {
    const listaStringProductos = productos.map(
        (product, index) => `${index + 1}: ${product.nombre} precio: ${product.precio}`);
    opcion = parseInt(
        prompt("Que producto desea elegir?" + "\n" + listaStringProductos.join('\n')));
    while (opcion <= 0 || opcion > productos.length) {
        opcion=parseInt(prompt("Por favor, ingrese una opcion válida" + "\n" + listaStringProductos.join('\n')));
    }
    cantidad = parseInt(prompt("Ingrese la cantidad que desea"));
    while(cantidad<=0){
        cantidad = parseInt(prompt('Cantidad invalida, ingrese otra'));
    }
    detalleFactura.push({
        nombre: productos[opcion-1].nombre, 
        precioUnitario: productos[opcion-1].precio, 
        cantidad, 
        subtotal: productos[opcion - 1].precio*cantidad});
    agregar = prompt("Deseas agregar mas productos? si/no")
} while (agregar == "si")
total = detalleFactura.reduce((acc, itemFactura) => acc + itemFactura.precioUnitario*itemFactura.cantidad, 0); 
alert("El total de su compra es de: $" + total)