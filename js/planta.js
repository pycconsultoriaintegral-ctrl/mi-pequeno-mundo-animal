// Juego "Riega la planta": cada riego hace crecer la planta una etapa hasta que florece.
(() => {
  const escena = document.getElementById('planta-svg');
  const gotas = document.getElementById('planta-gotas');
  const regadera = document.getElementById('planta-regadera');
  const otra = document.getElementById('planta-otra');
  const texto = document.getElementById('planta-texto');
  const MENSAJES = [
    'Toca la regadera para regar la semillita 💧',
    '¡Mira, sale un brotecito! 🌱 Riega otra vez',
    '¡Está creciendo! Sigue regando 💧',
    '¡Ya casi! Un riego más 🌼',
    '¡Floreció! 🌸'
  ];
  let etapa = 0;
  let ocupado = false;
  let temporizadores = [];
  const espera = (fn, ms) => { const t = setTimeout(fn, ms); temporizadores.push(t); };

  function mostrar() {
    escena.dataset.etapa = etapa;
    texto.textContent = MENSAJES[etapa];
    otra.classList.toggle('oculto', etapa < 4);
    regadera.classList.toggle('oculto', etapa >= 4);
  }

  function lluvia() {
    for (let i = 0; i < 7; i++) {
      const g = document.createElement('span');
      g.className = 'gota';
      g.style.left = (8 + Math.random() * 24) + 'px';
      g.style.animationDelay = (i * 0.09) + 's';
      gotas.appendChild(g);
      espera(() => g.remove(), 1600);
    }
    for (let i = 0; i < 6; i++) Audio_.nota(900 + Math.random() * 500, i * 0.09, 0.08, 'sine', 0.12);
  }

  function regar() {
    if (ocupado || etapa >= 4) return;
    ocupado = true;
    regadera.classList.add('inclinada');
    lluvia();
    espera(() => {
      etapa++;
      mostrar();
      Audio_.nota(520 + etapa * 90, 0, 0.3, 'triangle', 0.25);
      regadera.classList.remove('inclinada');
      if (etapa === 4) { espera(() => Premios.celebrar(3), 500); }
      ocupado = false;
    }, 900);
  }

  function reiniciar() { Audio_.clic(); etapa = 0; ocupado = false; mostrar(); }

  regadera.addEventListener('click', regar);
  otra.addEventListener('click', reiniciar);

  App.alEntrar.planta = () => { etapa = 0; ocupado = false; mostrar(); };
  App.alSalir.planta = () => {
    temporizadores.forEach(clearTimeout); temporizadores = [];
    gotas.innerHTML = ''; regadera.classList.remove('inclinada');
    if (window.speechSynthesis) speechSynthesis.cancel();
  };
})();
