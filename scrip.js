let bgMusic;

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const intro = document.getElementById('intro-overlay');

  // Inicializamos el audio local apuntando a la carpeta sound
  bgMusic = new Audio('sound/music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0; // Empezamos en silencio para el efecto fade-in

  // Al hacer clic en el corazón, iniciamos la página
  intro?.addEventListener('click', () => {
    // Agregamos la clase 'active' para mostrar y arrancar las animaciones
    body.classList.add('active');
    
    // Reproducir el archivo local con entrada suave de volumen
    if (bgMusic) {
      bgMusic.play().then(() => {
        // Efecto de fade-in para el volumen
        let vol = 0;
        const fadeInInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            bgMusic.volume = Math.min(vol, 1);
          } else {
            clearInterval(fadeInInterval);
          }
        }, 100);
      }).catch(error => {
        console.warn("La reproducción automática fue bloqueada o el archivo no existe:", error);
      });
    }

    intro.style.opacity = '0';
    setTimeout(() => {
      intro.remove();
    }, 500); // Espera a que termine el desvanecimiento
  });
});