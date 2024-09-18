document.addEventListener('DOMContentLoaded', () => {
    let cuentas = [
        {
            NumeroCuenta: '1212',
            password: '1240',
            saldo: 2000000,
        },
        {
            NumeroCuenta: '1313',
            password: '1340',
            saldo: 200000,
        }
    ];

    const Form = document.getElementById('formpago');
    Form.addEventListener("submit", e => {
        e.preventDefault(); // Evitar que se recargue la página

        const numcuenta = document.getElementById('account-number').value;
        const password = document.getElementById('password').value;

        const cuentaExists = cuentas.find(account => account.NumeroCuenta === numcuenta);
        if (cuentaExists && cuentaExists.password === password) {
            // Recuperar el total de los datos de compra en lugar del carrito
            const datosCompra = JSON.parse(localStorage.getItem('datosCompra')) || {};
            const total = parseFloat(datosCompra.total) || 0;

            if (cuentaExists.saldo >= total) {
                alert("Saldo suficiente");

                // **Guardar los datos del carrito en localStorage antes de redirigir**
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                datosCompra.productos = carrito; // Agregar productos al objeto de compra
                localStorage.setItem('datosCompra', JSON.stringify(datosCompra));

                // Redirigir a la página de generación de código
                window.location.href = '/GENERARCODIGOS/cod.html';
                alert('guarda a continuacion el codigo de compra');
            } else {
                alert("Saldo insuficiente");
            }
        } else {
            alert("Cuenta no encontrada o contraseña incorrecta");
        }
    });
});
