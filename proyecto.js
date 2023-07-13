
let carrito = [] 
let stock = [{ nombre:"Estetoscopio", precio: 49000, marca: "Littmann" },
{nombre:"Tensiómetro", precio: 25000, marca: "Omron" },
{nombre:"Oxímetro", precio: 19500, marca: "Yonker" },
{nombre:"Termómetro", precio: 7300, marca: "Philco" },
{nombre:"PinzasQuirurgicas", precio: 14670, marca: "ARTMAN" },
{nombre:"Oximetro",precio: 18000, marca: "Beurer"},
{nombre:"Termometro",precio:7600, marca:"Buerer"},
{nombre:"Estetoscopio",precio:10000, marca:"Meliphal"},
{nombre:"Tensiometro",precio:24300,marca:"Medisana"}
]
 
localStorage.setItem('stock',JSON.stringify(stock));
 
const tabla = document.getElementById('items');
const selectProductos = document.getElementById('productos');
const btnAgregar = document.getElementById('agregar');
const btnOrdenar = document.getElementById('ordenar');
const btnVaciar = document.getElementById('vaciar');
const total = document.getElementById('total');

function traerItems()
{
    stock = JSON.parse(localStorage.getItem('stock')) || [];
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  popularDropdown();
}

function popularDropdown()
{
  stock.forEach(({nombre,precio,marca},index) => {
    let option = document.createElement('option');
    option.textContent = `${nombre}: ${precio}, marca: ${marca}`;
    option.value = index;
    selectProductos.appendChild(option);
  });
}

function actualizarTablaCarrito()
{
  tabla.innerHTML = '';
  total.innerText = 0;
  carrito.forEach((item,index) => {
    newRow(item,index);
  });
}

function newRow(item,index)
{
  const row = document.createElement('tr'); 
  let td = document.createElement('td');

  td.classList.add();
  td.textContent = item.producto.nombre;
  row.appendChild(td);
  
  td.classList.add();
  td = document.createElement('td');
  td.textContent = item.cantidad;
  row.appendChild(td);

  td.classList.add();
  td = document.createElement('td');
  td.textContent = item.producto.precio;
  row.appendChild(td);

  td.classList.add();
  td = document.createElement('td');
  td.textContent = item.producto.marca;
  row.appendChild(td);
  td = document.createElement('td');
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('btn', 'btn-danger');
  btnEliminar.textContent = 'Remove';

  btnEliminar.onclick = () => {
      carrito.splice(index,1);
      actualizarTablaCarrito();
      localStorage.setItem('carrito',JSON.stringify(carrito));
  }

  td.appendChild(btnEliminar);
  row.appendChild(td);
  tabla.appendChild(row);

  total.textContent = carrito.reduce((acc,item) => acc + item.producto.precio * item.cantidad, 0);
}

function allEventListeners()
{
  document.addEventListener('DOMContentLoaded', traerItems);

  btnAgregar.addEventListener('submit', (e) =>
  {
    e.preventDefault(); 
    const productoSeleccionado = stock[+selectProductos.value]; 
    const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === productoSeleccionado.nombre);
    

    if (indiceCarrito !== -1) { 
        carrito[indiceCarrito].cantidad++; 
    }else {
      const item = new Item(productoSeleccionado,1);
      carrito.push(item);
    }

    actualizarTablaCarrito();
    localStorage.setItem('carrito',JSON.stringify(carrito));
    
  });
}
allEventListeners();


