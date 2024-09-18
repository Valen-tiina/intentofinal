document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos del localStorage
    const datosCompra = JSON.parse(localStorage.getItem('datosCompra')) || {};

    // Obtener los elementos donde se mostrará la información
    const totalElement = document.getElementById('total');
    const nombreCompradorElement = document.getElementById('nombre-comprador');
    const fechaCompraElement = document.getElementById('fecha-compra');

    // Actualizar la información en la página
    if (datosCompra.total) {
        totalElement.textContent = `$${datosCompra.total}`;
    } else {
        totalElement.textContent = 'No disponible';
    }

    if (datosCompra.nombre) {
        nombreCompradorElement.textContent = datosCompra.nombre;
    } else {
        nombreCompradorElement.textContent = 'No disponible';
    }

    if (datosCompra.fecha) {
        fechaCompraElement.textContent = datosCompra.fecha;
    } else {
        fechaCompraElement.textContent = 'No disponible';
    }
    const pseButton = document.getElementById('pse-button');
    pseButton.addEventListener('click', function () {
        window.location.href = '/FINALIZARPAGO/finalizar.html';
    });
});
