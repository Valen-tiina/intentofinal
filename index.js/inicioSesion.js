document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener("submit", e => {
        e.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Obtener usuarios del localStorage
        let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];

        // Verificar si el usuario existe y la contraseña es correcta
        const userExists = usuarios.find(user => user.email === email);
        if (userExists && userExists.password === password) {
            alert("Cuenta encontrada");
            window.location.href = '/COMPRA/w1.html'; 
        } else {
            alert("Los Datos encontrados no son correctos");
        }
    });
});