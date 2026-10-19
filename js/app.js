// Navegación entre pantallas y controles generales.
const App = (() => {
  const volver = document.getElementById('btn-volver');
  const sonido = document.getElementById('btn-sonido');
  const contador = document.getElementById('estrellas');
  let actual = 'bienvenida';
  const alEntrar = {};   // las actividades registran aquí su función de inicio
  const alSalir = {};

  function ir(nombre) {
    if (alSalir[actual]) alSalir[actual]();
    Audio_.parar();
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById('pantalla-' + nombre).classList.add('activa');
    actual = nombre;
    const enJuego = nombre !== 'bienvenida' && nombre !== 'menu';
    volver.classList.toggle('oculto', nombre === 'bienvenida' || nombre === 'menu');
    contador.classList.toggle('oculto', nombre === 'bienvenida');
    if (alEntrar[nombre]) alEntrar[nombre]();
    return enJuego;
  }

  // Todos los botones con data-ir="pantalla" navegan
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ir]');
    if (!b) return;
    Audio_.clic();
    ir(b.dataset.ir);
  });

  volver.addEventListener('click', () => { Audio_.clic(); ir('menu'); });

  sonido.addEventListener('click', () => {
    const mudo = Audio_.alternar();
    sonido.textContent = mudo ? '🔇' : '🔊';
    if (!mudo) Audio_.clic();
  });

  return { ir, alEntrar, alSalir };
})();
