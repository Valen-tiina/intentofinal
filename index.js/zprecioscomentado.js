let carro = {}; // Objeto para almacenar los productos del carrito

// Función para mostrar/ocultar la información de los paquetes
function toggleInfo(infoId) {
    const infos = document.querySelectorAll('.info');
    infos.forEach(info => info.style.display = 'none');
    const bienvenida = document.getElementById('mensaje-de-bienvenida');
    if (bienvenida) {
        bienvenida.style.display = 'none';
    }
    const selectedInfo = document.getElementById(infoId);
    if (selectedInfo) {
        selectedInfo.style.display = 'block';
    }
}

// Función para agregar productos al carrito
function AgregarATuCarro(name, price) {
    if (!carro[name]) {
        carro[name] = { price: price, cantidad: 0 };
    }
    carro[name].cantidad += 1;
    ActualizarCarro();
}

// Función para actualizar el carrito de compras
function ActualizarCarro() {
    const carritoItems = document.getElementById('elementos-carrito');
    carritoItems.innerHTML = '';
    let total = 0;

    for (const [name, item] of Object.entries(carro)) {
        const itemTotal = item.price * item.cantidad;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${name} x <input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidad('${name}', this.value)"></span> 
            <span>$${itemTotal}</span>
            <button class="eliminar" onclick="eliminarDelCarro('${name}')"><i class='bx bxs-trash'></i></button>
        `;
        carritoItems.appendChild(div);
    }

    document.getElementById('total').textContent = total;
}

// Función para eliminar productos del carrito
function eliminarDelCarro(name) {
    delete carro[name];
    ActualizarCarro();
}

// Función para cambiar la cantidad de productos en el carrito
function cambiarCantidad(name, cantidad) {
    if (cantidad <= 0) {
        eliminarDelCarro(name);
    } else {
        carro[name].cantidad = parseInt(cantidad, 10);
        ActualizarCarro();
    }
}

// Función para redirigir a la página de pago
function irAPagar() {
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carro));
    // Redirigir a la página de checkout
    window.location.href = '/FormularioPago/precios.html';
}

// Función para redirigir a la página de modificación del carrito
function modificarCarrito() {
    window.location.href = '/COMPRA/w1.html';
}

// Función para actualizar el carrito en la página de checkout
function ActualizarCarroCheckout() {
    const carritoItems = document.getElementById('elementos-carrito');
    carritoItems.innerHTML = '';
    let total = 0;

    for (const [name, item] of Object.entries(carro)) {
        const itemTotal = item.price * item.cantidad;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${name} x <input type="number" value="${item.cantidad}" min="1" disabled></span> 
            <span>$${itemTotal}</span>
            <button class="eliminar" disabled><i class='bx bxs-trash'></i></button>
        `;
        carritoItems.appendChild(div);
    }

    document.getElementById('total').textContent = total;
}

// Código para ejecutar en la página de checkout
if (window.location.pathname.endsWith('checkout.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        carro = JSON.parse(localStorage.getItem('carrito')) || {};
        ActualizarCarroCheckout();
        
        document.getElementById('form-pago').addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Gracias por tu compra. Total a pagar: $' + document.getElementById('total').textContent);
            localStorage.removeItem('carrito');
            carro = {};
            ActualizarCarroCheckout();
        });
    });
}
