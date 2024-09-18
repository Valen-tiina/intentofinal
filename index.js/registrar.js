document.addEventListener('DOMContentLoaded', () => {
    const registrarForm = document.getElementById('RegisterForm');

    registrarForm.addEventListener('submit', e => {
        e.preventDefault(); // Evitar que se recargue la página

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Obtener usuarios existentes del localStorage
        let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];

        // Verificar si el usuario ya existe
        const userExists = usuarios.find(user => user.email === email);
        if (userExists) {
            alert("El usuario ya existe. Por favor, inicia sesión.");
        } else {
            // Agregar el nuevo usuario
            usuarios.push({ email, password });
            // Guardar los datos en localStorage  para mas adelante la ejecuciones 
            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
            alert("Registro valido, ahora inicia sesion");
            window.location.href = '/INICIOSESION/inicioSesion.html'; // Redirigir al inicio de sesión
        }
    });
});
