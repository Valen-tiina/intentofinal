let carro = {}; // Objeto para almacenar los productos del carrito

// Función para mostrar/ocultar la información de los paquetes
function toggleInfo(infoId) {
    // Obtiene el elemento de bienvenida por su ID
    var bienvenida = document.getElementById('mensaje-de-bienvenida');
    // Si el elemento de bienvenida existe, ocúltalo
    if (bienvenida) {
        bienvenida.style.display = 'none';
    }

    // Selecciona todos los elementos con la clase 'info'
    var infos = document.querySelectorAll('.info');
    // Oculta todos los elementos con la clase 'info'
    for (var i = 0; i < infos.length; i++) {
        infos[i].style.display = 'none';
    }

    // Muestra el elemento con el ID proporcionado
    var selectedInfo = document.getElementById(infoId);
    if (selectedInfo) {
        selectedInfo.style.display = 'block';
    }
}


// Función para agregar productos al carrito
function AgregarATuCarro(name, price) {
    // Si el producto no está en el carrito, lo añade con precio y cantidad inicial de 0
    if (!carro[name]) {
        carro[name] = { precio: price, cantidad: 0 };
    }
    // Aumenta la cantidad del producto en el carrito
    carro[name].cantidad += 1;
    // Actualiza la vista del carrito
    ActualizarCarro();
}

// Función para actualizar el carrito de compras
function ActualizarCarro() {
    // Obtiene el contenedor del carrito en el HTML
    const carritoItems = document.getElementById('elementos-carrito');
    // Limpia el contenido del contenedor
    carritoItems.innerHTML = '';
    // Variable para calcular el total del carrito
    let total = 0;

    // Itera sobre cada producto en el carrito
    for (const [name, item] of Object.entries(carro)) { //es una forma moderna y directa de obtener pares clave-valor, pero no es la única forma de hacerlo en JavaScript.
        // Calcula el total del producto (precio * cantidad)
        const itemTotal = item.precio * item.cantidad;
        // Añade el total del producto al total general
        total += itemTotal;

        // Crea un nuevo elemento div para mostrar el producto en el carrito
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${name} x <input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidad('${name}', this.value)"></span> 
            <span>$${itemTotal}</span>
            <button class="eliminar" onclick="eliminarDelCarro('${name}')"><i class='bx bxs-trash'></i></button>
        `;
        // Añade el nuevo div al contenedor del carrito
        carritoItems.appendChild(div);
    }

    // Actualiza el total del carrito en la página
    document.getElementById('total').textContent = total;
}

// Función para eliminar productos del carrito
function eliminarDelCarro(name) {
    // Elimina el producto del carrito
    delete carro[name];
    // Actualiza la vista del carrito
    ActualizarCarro();
}

// Función para cambiar la cantidad de productos en el carrito
function cambiarCantidad(name, cantidad) {
    // Si la cantidad es menor o igual a 0, elimina el producto del carrito
    if (cantidad <= 0) {
        eliminarDelCarro(name);
    } else {
        // Actualiza la cantidad del producto en el carrito
        carro[name].cantidad = parseInt(cantidad, 10);
        // Actualiza la vista del carrito
        ActualizarCarro();
    }
}

// Función para redirigir a la página de pago
function irAPagar() {
    // Guarda el carrito en localStorage como una cadena JSON
    localStorage.setItem('carrito', JSON.stringify(carro));
    // Redirige a la página de checkout
    window.location.href = '/FormularioPago/precios.html';
}

// Función para redirigir a la página de modificación del carrito
function modificarCarrito() {
    // Redirige a la página para modificar el carrito
    window.location.href = '/COMPRA/w1.html';
}
document.addEventListener('DOMContentLoaded', function () {
    //llamo a boton de tipo dato 
    const fechaCompra = document.getElementById('fecha-compra');
    //voy a crear un nuevo objeto para la fecha actual
    const FechaHoy = new Date();
    //otro objeto para la fecha de manana pero el manana inicia con la fecha de hoy
    const Fechatomorrow = new Date(FechaHoy);
    //setdate es para ajustar la fecha de manana
    //getdate Obtiene el día del mes de la fecha actual
    //le sumara 1 a fecha hoy para que se guarde en el manana
    Fechatomorrow.setDate(FechaHoy.getDate() + 1);

    // aqui se obtiene el año, mes,dia del manana
    const yyyy = Fechatomorrow.getFullYear();
    //get moth maneja que el 0 es enero y 11 diciembre asi que siempre habra que sumarle uno para que sea de 1 a 12
    let mm = Fechatomorrow.getMonth() + 1; 
    let dd = Fechatomorrow.getDate();

    // Asegurarse de que el mes y el día sean siempre de dos dígitos
    //si mes o dia es menor a 10 le agrega un cero a su izquierda
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    //forma para mostrar la fecha o la concatenacion
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    //se establece el atributo min del elemento fechaCompra con la fecha formateada. Esto limita
    // la fecha que el usuario puede seleccionar en el campo de entrada de fecha a partir de la 
    //fecha de mañana
    fechaCompra.setAttribute('min', formattedDate);

});

// Función para actualizar el carrito en la página de checkout
function ActualizarCarroCheckout() {
    // Obtiene el contenedor del carrito en el HTML
    const carritoItems = document.getElementById('elementos-carrito');
    // Limpia el contenido del contenedor
    carritoItems.innerHTML = '';
    // Variable para calcular el total del carrito
    let total = 0;

    // Itera sobre cada producto en el carrito
    for (const [nombre, articulo] of Object.entries(carro)) {
        // Calcula el total del producto (precio * cantidad)
        const itemTotal = articulo.precio * articulo.cantidad;
        // Añade el total del producto al total general
        total += itemTotal;
        // Crea un nuevo elemento div para mostrar el producto en el carrito
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${nombre} x <input type="number" value="${articulo.cantidad}" min="1" disabled></span>
            <span>$${itemTotal}</span>
            <button class="eliminar" disabled><i class='bx bxs-trash'></i></button>
        `;
        // Añade el nuevo div al contenedor del carrito
        carritoItems.appendChild(div);
    }

    // Actualiza el total del carrito en la página
    document.getElementById('total').textContent = total;
}

// Código para ejecutar en la página de checkout
// Código para ejecutar en la página de checkout
if (window.location.pathname.endsWith('/FormularioPago/precios.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        carro = JSON.parse(localStorage.getItem('carrito')) || {};
        ActualizarCarroCheckout();

        document.querySelector('.form-pago').addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre-completo').value;
            const fecha = document.getElementById('fecha-compra').value;
            const total = document.getElementById('total').textContent;

            localStorage.setItem('datosCompra', JSON.stringify({
                nombre: nombre,
                fecha: fecha,
                total: total.replace('$', ''),
                carrito: carro // Guarda el carrito aquí
            }));

            alert('Total a pagar: $' + total);
            localStorage.removeItem('carrito');
            carro = {};
            ActualizarCarroCheckout();

            window.location.href = '/METODOPAGO/p.html';
        });
    });
}

