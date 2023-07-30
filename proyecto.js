const contenedor = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaItems = document.querySelector('#lista-items');
let imgcarrito = document.getElementById("img-carrito")

let carritoCompras = [] 
let productos = [{ nombre:"Estetoscopio", precio: 49000, marca: "Littmann" },
{nombre:"Tensiómetro", precio: 25000, marca: "Omron" },
{nombre:"Oxímetro", precio: 19500, marca: "Yonker" },
{nombre:"Termómetro", precio: 7300, marca: "Philco" },
{nombre:"PinzasQuirurgicas", precio: 14670, marca: "ARTMAN" },
{nombre:"Oximetro",precio: 18000, marca: "Beurer"},
{nombre:"Termometro",precio:7600, marca:"Beurer"},
{nombre:"Estetoscopio",precio:10000, marca:"Melipal"},
{nombre:"Tensiometro",precio:24300,marca:"Medisana"}
]
 
cargarEventListeners();


function cargarEventListeners() {
    
    listaItems.addEventListener('click', agregarProducto);
    vaciarCarritobtn.addEventListener('click', vaciarCarrito);

    
    document.addEventListener('DOMContentLoaded', async () => {
        
        await traerProductos();
        dibujarProductos();
        carritoCompras = JSON.parse(localStorage.getItem('carrito')) || [];
        refreshCarrito();
    });

}
async function traerProductos() { 
  const response = await fetch('productos.json');
  if (response.ok) {
    productos = await response.json();
    console.log(productos);
  } else {
       Toastify({
           text: 'Hubo un problema en el servidor, intente nuevamente',
           className: "Error"
       }).showToast();
  }
}

function dibujarProductos() {
   let row = document.createElement('div');
   row.classList.add('row');
   row.innerHTML = ``;
   let counter = 1;
   console.log(productos);
  productos.forEach((producto) => {
    if (counter <= 3) {
       row.innerHTML += `
           <div class="four columns">
               <div class="card">
                   <img src="${producto.image}" class="imagen-item u-full-width">
                   <div class="info-card">
                       <h4>${producto.nombre}</h4>
                       <p>${producto.marca}</p>
                       <p class="precio">$${producto.precio}</p>
                       <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
                   </div>
               </div>
           </div>
       `;
       counter++;
    } else {
       listaItems.appendChild(row);
       row = document.createElement('div');
       row.classList.add('row');
       row.innerHTML = ``;
       counter=1;
    } 
  });
  listaItems.appendChild(row);
}
function agregarProducto(e) {
  if (e.target.classList.contains('agregar-carrito')) { 
      e.preventDefault();
      const id = e.target.dataset.id; 
      const producto = productos.find((product) => product.id === +id);
      if (producto) {
          agregarItem(producto);
      }
  }
}
function agregarItem({image, precio, nombre, id,}) {
  const index = carritoCompras.findIndex(item => item.id === id);
  if (index !== -1) { 
      carritoCompras[index].cantidad += 1;
  }
  else {
      const item = new Item(image,precio,nombre,id,1);
      carritoCompras.push(item);
 
  }
  refreshCarrito();
}

function refreshCarrito() {

  
  limpiarHTML();
  sincronizarCarrito();
  if (carritoCompras.length == 0)
  {
      imgcarrito.setAttribute('src',"img/carritovacio2.png")
  }
  else
  {
      imgcarrito.setAttribute('src',"img/carritolleno2.png")
      carritoCompras.forEach((element) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>
          <img src="${element.imagen}" width="100">
      </td>
      <td>
       ${element.titulo}
      </td>
      <td>
       ${element.precio}
       </td>
       <td>
       ${element.cantidad}
       </td>
       <td>
        <a href="#" class="borrar-item" data-id="${element.id}"> X </a>
       </td>
     `;
      contenedor.appendChild(row);
      row.querySelector("a").addEventListener('click', borrarItem);
  });
  }

}

function vaciarCarrito() {
  carritoCompras = [];
  limpiarHTML();
  refreshCarrito();
}

function limpiarHTML() {

  contenedor.innerHTML = '';

}
function sincronizarCarrito()
{
  localStorage.setItem('carrito',JSON.stringify(carritoCompras));
}

function borrarItem(e) {
  const element = e.target;
  element.remove(); 
  carritoCompras = carritoCompras.filter(e => e.id != element.getAttribute("data-id"));
  refreshCarrito();
}


