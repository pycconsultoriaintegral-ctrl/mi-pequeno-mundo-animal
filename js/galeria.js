// Galería interactiva: tocar un animal -> salta, suena y se dice su nombre.
(() => {
  const cuadricula = document.getElementById('galeria-grid');
  const rotulo = document.getElementById('galeria-nombre');
  let conocidos = new Set();

  Animales.forEach(a => {
    const b = document.createElement('button');
    b.className = 'animal-card';
    b.style.background = a.color;
    b.setAttribute('aria-label', a.nombre);
    b.innerHTML = dibujoAnimal(a) + `<span>${a.nombre}</span>`;
    b.addEventListener('click', () => {
      b.classList.remove('salta'); void b.offsetWidth; b.classList.add('salta');
      rotulo.textContent = `${a.nombre}: ${a.texto}`;
      a.sonar();
      setTimeout(() => Audio_.decir(a.nombre), 3400);
      conocidos.add(a.id);
      if (conocidos.size === Animales.length) {
        conocidos = new Set();
        setTimeout(() => Premios.celebrar(3), 3800);
      }
    });
    cuadricula.appendChild(b);
  });

  App.alEntrar.galeria = () => {
    conocidos = new Set();
    rotulo.textContent = 'Toca un animal 👆';
  };
  App.alSalir.galeria = () => { if (window.speechSynthesis) speechSynthesis.cancel(); };
})();
