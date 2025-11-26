import { guardarCarrito, obtenerCarrito, vaciarCarritoStorage } from "./storage.js"
import { actualizarContador, mostrarMensaje } from "./ui.js"

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito()
    carrito.push(producto)
    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje(`Se agregó el producto al carrito.`)
}

export const eliminarDelCarrito = (indice) => {
    const carrito = obtenerCarrito()
    carrito.splice(indice, 1)
    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje(`Se eliminó el producto del carrito.`)
}

export const vaciarCarrito = () => {
    vaciarCarritoStorage()
    actualizarContador([])
    mostrarMensaje("Se vació el carrito.")
}
