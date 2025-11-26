import { obtenerCarrito } from "./storage.js";
import { eliminarDelCarrito, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    const basePath = window.location.pathname.includes("/pages/") ? "../" : "";
    
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    
    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");
    
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "El carrito está vacío.";
        contenedor.appendChild(mensaje);
        return;
    }

    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = basePath + producto.img;  // ← Ruta corregida
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-eliminar-carrito");
        btnEliminar.textContent = "Eliminar del carrito";
        btnEliminar.addEventListener("click", () => {
            eliminarDelCarrito(indice);
            renderizarCarrito();
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(btnEliminar);

        contenedor.appendChild(tarjeta);
    });

    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn", "btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    });

    divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);

