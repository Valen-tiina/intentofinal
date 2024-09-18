document.addEventListener('DOMContentLoaded', () => {
    // Función para generar un código de referencia aleatorio
    function generarCodigo(length) {
        let result = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const caracteresLength = caracteres.length;
        for (let i = 0; i < length; i++) {
            result += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
        }
        return result;
    }

    // Obtener los datos de la compra desde el localStorage
    const datosCompra = JSON.parse(localStorage.getItem('datosCompra')) || {};
    const carrito = datosCompra.carrito || {}; // Obtener el carrito desde datosCompra

    // Generar un código de referencia
    const codigoReferencia = generarCodigo(10); // Puedes ajustar la longitud si es necesario
    document.getElementById('codigo').textContent = codigoReferencia;

    // Mostrar los artículos del carrito
    const listaCarrito = document.getElementById('lista-carrito');
    for (const [nombre, item] of Object.entries(carrito)) {
        const li = document.createElement('li');
        li.textContent = `${nombre} - $${item.precio} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    }

    // Guardar el código de referencia en el localStorage junto con los datos de compra
    datosCompra.codigoReferencia = codigoReferencia;
    localStorage.setItem('datosCompra', JSON.stringify(datosCompra));

    document.getElementById('boton-listo').addEventListener('click', () => {
      
        window.location.href = '/PANTALLAINICIO/inicio.html';
        alert('Compra exitosa');
    });
});
