let youtubePlayer;

// Esta función es llamada automáticamente por la API de YouTube al cargar
window.onYouTubeIframeAPIReady = function() {
  youtubePlayer = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: 'GxldQ9eX2wo', // ID de "Until I Found You" de Stephen Sanchez
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'disablekb': 1,
      'showinfo': 0,
      'modestbranding': 1,
      'loop': 1,
      'origin': window.location.origin // Ayuda a evitar errores de dominio local
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const intro = document.getElementById('intro-overlay');

  // Al hacer clic en el corazón, iniciamos la página
  intro?.addEventListener('click', () => {
    // Agregamos la clase 'active' para mostrar y arrancar las animaciones
    body.classList.add('active');
    
    // Reproducir desde YouTube si el reproductor está listo
    if (youtubePlayer && youtubePlayer.playVideo) {
      youtubePlayer.playVideo();
    }

    intro.style.opacity = '0';
    setTimeout(() => {
      intro.remove();
    }, 500); // Espera a que termine el desvanecimiento
  });
});