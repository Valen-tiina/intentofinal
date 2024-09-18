document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el modal de Bootstrap
    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false
    });
  
    // Muestra el modal
    myModal.show();
  
    // Obtén el botón de adquirir
    const adquirirboton = document.getElementById('adquirir');
  
    // Define la URL a la que quieres redirigir
    const dirigirUrl = '/INICIOSESION/inicioSesion.html'; // Cambia esto a la URL que deseas
  
    // Agrega un manejador de eventos para el clic en el botón de adquirir
    adquirirboton.addEventListener('click', () => {
      const confirmar = confirm("Para comprar productos hay que iniciar sesión. ¿Quieres iniciar sesión ahora?");
  
      // Si el usuario acepta, redirige a la página de inicio de sesión
      if (confirmar) {
        window.location.href = dirigirUrl;
      }
    });
  });
  