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
    // Animación de explosión del corazón
    const heart = intro.querySelector('.main-heart-3d');
    if (heart) heart.classList.add('heart-clicked');

    // Aseguramos que la página comience desde arriba para ver las flores
    window.scrollTo(0, 0);

    // Agregamos la clase 'active' para mostrar y arrancar las animaciones
    body.classList.add('active');
    
    // Habilitar el scroll después de que las animaciones de las flores terminen (aprox 7s)
    setTimeout(() => {
      body.classList.add('allow-scroll');
    }, 7000);

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

    setTimeout(() => {
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.remove();
      }, 500);
    }, 600); // Esperamos a que la animación del corazón esté casi lista
  });


  // Lógica para el botón final "¿lo mejor?"
  const finalBtn = document.getElementById('final-btn');
  const finalMsg = document.getElementById('final-message');

  finalBtn?.addEventListener('click', () => {
    finalBtn.style.opacity = '0';
    setTimeout(() => {
      finalBtn.style.display = 'none';
      if (finalMsg) finalMsg.style.display = 'block';
    }, 400);
  });

  // Efecto de paralaje para la sección de mensaje
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.f-icon, .sparkle').forEach(el => {
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});