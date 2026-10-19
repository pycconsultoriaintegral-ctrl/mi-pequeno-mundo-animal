// Audio: todos los sonidos se generan con código (Web Audio), sin archivos externos.
const Audio_ = (() => {
  let ctx = null;
  let silenciado = false;

  function contexto() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Una nota simple: frecuencia (Hz), inicio (s desde ahora), duración (s)
  function nota(freq, inicio, dur, tipo = 'sine', vol = 0.25) {
    const c = contexto();
    if (!c || silenciado) return;
    const o = c.createOscillator();
    const g = c.createGain();
    const t = c.currentTime + inicio;
    o.type = tipo;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  // Nota cuyo tono cambia de f0 a f1 (sirve para imitar voces de animales)
  function barrido(f0, f1, inicio, dur, tipo = 'sawtooth', vol = 0.25) {
    const c = contexto();
    if (!c || silenciado) return;
    const o = c.createOscillator();
    const g = c.createGain();
    const t = c.currentTime + inicio;
    o.type = tipo;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  // Grabaciones reales de animales (carpeta audio/). Se cortan con fundido a los "max" segundos.
  const grabaciones = {};
  let sonando = null;
  let fundido = null;

  function pararGrabacion() {
    clearInterval(fundido); clearTimeout(pararGrabacion.t);
    if (sonando) { sonando.pause(); sonando.currentTime = 0; sonando.volume = 1; sonando = null; }
  }

  function animal(archivo, max, respaldo) {
    if (silenciado) return;
    pararGrabacion();
    let a = grabaciones[archivo];
    if (!a) { a = grabaciones[archivo] = new window.Audio(archivo); a.preload = 'auto'; }
    a.currentTime = 0; a.volume = 1;
    sonando = a;
    a.play().catch(() => { if (respaldo) respaldo(); });
    pararGrabacion.t = setTimeout(() => {
      fundido = setInterval(() => {
        if (!sonando || sonando.volume <= 0.1) { pararGrabacion(); return; }
        sonando.volume = Math.max(0, sonando.volume - 0.1);
      }, 60);
    }, max * 1000);
  }

  return {
    barrido,
    animal,
    parar: pararGrabacion,
    clic() { nota(660, 0, 0.12, 'triangle'); },
    acierto() { [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.1, 0.25, 'triangle')); },
    suave() { nota(330, 0, 0.25, 'sine', 0.2); nota(262, 0.15, 0.3, 'sine', 0.2); },
    nota,
    silenciado: () => silenciado,
    alternar() { silenciado = !silenciado; if (silenciado) { pararGrabacion(); if (window.speechSynthesis) speechSynthesis.cancel(); } return silenciado; },
    // Voz en español para decir el nombre de los animales
    decir(texto) {
      if (silenciado || !window.speechSynthesis) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'es-ES'; u.rate = 0.85; u.pitch = 1.3;
      speechSynthesis.speak(u);
    }
  };
})();
