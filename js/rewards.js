// Recompensas: estrellas, confeti y mensajes positivos.
const Premios = (() => {
  const mensajes = ['¡Muy bien!', '¡Genial!', '¡Eres un campeón!', '¡Fantástico!', '¡Lo lograste!', '¡Bravo!'];
  const colores = ['#ff6b6b', '#ffd166', '#4cc46a', '#5f9df7', '#c77dff', '#ff9f43'];
  let estrellas = 0;
  let particulas = [];
  let animando = false;

  const lienzo = () => document.getElementById('confeti');

  function ajustar() {
    const c = lienzo();
    c.width = c.clientWidth; c.height = c.clientHeight;
  }

  function dibujar() {
    const c = lienzo(), g = c.getContext('2d');
    g.clearRect(0, 0, c.width, c.height);
    particulas.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.giro += p.vg; p.vida--;
      g.save(); g.translate(p.x, p.y); g.rotate(p.giro);
      g.fillStyle = p.color; g.fillRect(-p.t / 2, -p.t / 4, p.t, p.t / 2);
      g.restore();
    });
    particulas = particulas.filter(p => p.vida > 0 && p.y < c.height + 20);
    if (particulas.length) requestAnimationFrame(dibujar);
    else { animando = false; g.clearRect(0, 0, c.width, c.height); }
  }

  function confeti() {
    ajustar();
    const c = lienzo();
    for (let i = 0; i < 140; i++) {
      particulas.push({
        x: c.width / 2, y: c.height * 0.4,
        vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 14 - 3,
        t: 10 + Math.random() * 12, giro: Math.random() * 6, vg: (Math.random() - 0.5) * 0.4,
        color: colores[i % colores.length], vida: 160
      });
    }
    if (!animando) { animando = true; requestAnimationFrame(dibujar); }
  }

  function mostrarMensaje(texto) {
    const m = document.getElementById('mensaje-premio');
    m.textContent = texto;
    m.classList.remove('ver'); void m.offsetWidth; m.classList.add('ver');
  }

  return {
    // Llamar cuando el niño logra algo. sumar = estrellas que gana.
    celebrar(sumar = 1) {
      estrellas += sumar;
      document.getElementById('num-estrellas').textContent = estrellas;
      confeti();
      const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
      mostrarMensaje('⭐ ' + msg);
      Audio_.acierto();
      Audio_.decir(msg);
    },
    total: () => estrellas
  };
})();
