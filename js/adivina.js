// Juego "¿Quién suena así?": se oye un animal y hay que tocar su dibujo entre 3 opciones.
(() => {
  const pista = document.getElementById('adivina-texto');
  const opciones = document.getElementById('adivina-opciones');
  const btnOir = document.getElementById('adivina-oir');
  let objetivo = null;
  let bloqueado = false;
  let temporizadores = [];

  const espera = (fn, ms) => { const t = setTimeout(fn, ms); temporizadores.push(t); };
  const azar = lista => lista[Math.floor(Math.random() * lista.length)];

  function escuchar() {
    if (objetivo) objetivo.sonar();
  }

  function nuevaRonda() {
    bloqueado = false;
    const otros = Animales.filter(a => a !== objetivo);
    objetivo = azar(otros);
    const falsos = [...otros.filter(a => a !== objetivo)].sort(() => Math.random() - 0.5).slice(0, 2);
    const grupo = [objetivo, ...falsos].sort(() => Math.random() - 0.5);

    pista.textContent = '¿Quién suena así? 👂';
    opciones.innerHTML = '';
    grupo.forEach(a => {
      const b = document.createElement('button');
      b.className = 'animal-card opcion';
      b.style.background = a.color;
      b.setAttribute('aria-label', a.nombre);
      b.innerHTML = dibujoAnimal(a);
      b.addEventListener('click', () => elegir(a, b));
      opciones.appendChild(b);
    });
    espera(escuchar, 500);
  }

  function elegir(animal, boton) {
    if (bloqueado) return;
    if (animal === objetivo) {
      bloqueado = true;
      boton.classList.add('salta');
      pista.textContent = `¡Sí! Es el ${animal.nombre.toLowerCase()} 🎉`;
      Premios.celebrar(1);
      espera(nuevaRonda, 3200);
    } else {
      boton.classList.remove('tiembla'); void boton.offsetWidth; boton.classList.add('tiembla');
      pista.textContent = '¡Casi! Escucha otra vez 💛';
      Audio_.suave();
      espera(escuchar, 900);
    }
  }

  btnOir.addEventListener('click', () => { Audio_.clic(); escuchar(); });

  App.alEntrar.adivina = () => { objetivo = null; nuevaRonda(); };
  App.alSalir.adivina = () => {
    temporizadores.forEach(clearTimeout); temporizadores = [];
    if (window.speechSynthesis) speechSynthesis.cancel();
  };
})();
