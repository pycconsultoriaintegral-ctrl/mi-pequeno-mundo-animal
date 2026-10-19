// Datos de los animales: dibujo SVG, nombre y sonido (generado con Web Audio).
// Se reutiliza en la galería y en el juego de adivinar.
const ojos = (x1, x2, y, r = 9) =>
  `<circle cx="${x1}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#fff"/>` +
  `<circle cx="${x1}" cy="${y}" r="${r * 0.55}" fill="#222"/><circle cx="${x2}" cy="${y}" r="${r * 0.55}" fill="#222"/>` +
  `<circle cx="${x1 + 2}" cy="${y - 2}" r="${r * 0.2}" fill="#fff"/><circle cx="${x2 + 2}" cy="${y - 2}" r="${r * 0.2}" fill="#fff"/>`;
const mejillas = (x1, x2, y) =>
  `<circle cx="${x1}" cy="${y}" r="9" fill="#ff8f8f" opacity=".55"/><circle cx="${x2}" cy="${y}" r="9" fill="#ff8f8f" opacity=".55"/>`;
const sonrisa = (x, y, w = 14) =>
  `<path d="M${x - w} ${y} Q${x} ${y + 14} ${x + w} ${y}" stroke="#333" stroke-width="4" fill="none" stroke-linecap="round"/>`;

const Animales = [
  {
    id: 'perro', nombre: 'Perro', color: '#ffe0b8', texto: '¡Guau guau!',
    svg: `<ellipse cx="45" cy="95" rx="22" ry="48" fill="#8a5a2b" transform="rotate(12 45 95)"/>
      <ellipse cx="155" cy="95" rx="22" ry="48" fill="#8a5a2b" transform="rotate(-12 155 95)"/>
      <circle cx="100" cy="100" r="60" fill="#c98a4b"/>
      <ellipse cx="100" cy="128" rx="32" ry="24" fill="#f3d9b1"/>
      ${ojos(78, 122, 90)}<ellipse cx="100" cy="118" rx="13" ry="9" fill="#222"/>
      ${sonrisa(100, 134)}${mejillas(62, 138, 118)}`,
    sonar() { Audio_.barrido(420, 260, 0, 0.22, 'sawtooth', 0.22); Audio_.barrido(420, 260, 0.32, 0.22, 'sawtooth', 0.22); }
  },
  {
    id: 'gato', nombre: 'Gato', color: '#ffe9c2', texto: '¡Miau!',
    svg: `<polygon points="45,70 55,15 95,50" fill="#ff9f43"/><polygon points="155,70 145,15 105,50" fill="#ff9f43"/>
      <polygon points="55,58 58,32 78,50" fill="#ffb3b3"/><polygon points="145,58 142,32 122,50" fill="#ffb3b3"/>
      <circle cx="100" cy="105" r="60" fill="#ffa94d"/>
      <path d="M85 55 L88 72 M100 52 L100 70 M115 55 L112 72" stroke="#e07b1a" stroke-width="5" stroke-linecap="round"/>
      ${ojos(76, 124, 98)}<polygon points="92,116 108,116 100,126" fill="#ff7b9c"/>
      ${sonrisa(88, 128, 12)}${sonrisa(112, 128, 12)}
      <path d="M30 118 L70 124 M30 135 L70 130 M170 118 L130 124 M170 135 L130 130" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>
      ${mejillas(58, 142, 122)}`,
    sonar() { Audio_.barrido(500, 950, 0, 0.3, 'triangle', 0.3); Audio_.barrido(950, 520, 0.3, 0.45, 'triangle', 0.3); }
  },
  {
    id: 'vaca', nombre: 'Vaca', color: '#e3f3d6', texto: '¡Muuu!',
    svg: `<ellipse cx="38" cy="78" rx="26" ry="14" fill="#fff" stroke="#bbb" stroke-width="3" transform="rotate(-20 38 78)"/>
      <ellipse cx="162" cy="78" rx="26" ry="14" fill="#fff" stroke="#bbb" stroke-width="3" transform="rotate(20 162 78)"/>
      <path d="M70 48 Q62 20 78 22" stroke="#e8d8a8" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M130 48 Q138 20 122 22" stroke="#e8d8a8" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="60" fill="#fff" stroke="#ddd" stroke-width="3"/>
      <circle cx="68" cy="68" r="20" fill="#333"/><circle cx="140" cy="125" r="12" fill="#333"/>
      <ellipse cx="100" cy="132" rx="38" ry="26" fill="#ffb3c1"/>
      <ellipse cx="88" cy="132" rx="6" ry="8" fill="#c8627a"/><ellipse cx="112" cy="132" rx="6" ry="8" fill="#c8627a"/>
      ${ojos(80, 120, 92)}${mejillas(58, 142, 108)}`,
    sonar() { Audio_.barrido(170, 130, 0, 1.3, 'sawtooth', 0.28); }
  },
  {
    id: 'cerdo', nombre: 'Cerdito', color: '#ffe3ec', texto: '¡Oink oink!',
    svg: `<polygon points="52,70 40,28 88,50" fill="#ff9ab5"/><polygon points="148,70 160,28 112,50" fill="#ff9ab5"/>
      <circle cx="100" cy="102" r="62" fill="#ffb3c6"/>
      <ellipse cx="100" cy="122" rx="30" ry="22" fill="#ff8fab"/>
      <ellipse cx="90" cy="122" rx="5" ry="8" fill="#b84a6a"/><ellipse cx="110" cy="122" rx="5" ry="8" fill="#b84a6a"/>
      ${ojos(76, 124, 88)}${mejillas(55, 145, 112)}`,
    sonar() { Audio_.barrido(260, 150, 0, 0.2, 'square', 0.14); Audio_.barrido(260, 150, 0.3, 0.2, 'square', 0.14); }
  },
  {
    id: 'pato', nombre: 'Patito', color: '#fff6c2', texto: '¡Cuac cuac!',
    svg: `<circle cx="100" cy="100" r="62" fill="#ffe14d"/>
      <path d="M90 40 Q100 22 110 40" stroke="#ffe14d" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="128" rx="38" ry="16" fill="#ff9f1c"/>
      <path d="M62 128 Q100 150 138 128" fill="#f08400"/>
      ${ojos(76, 124, 90)}${mejillas(52, 148, 112)}`,
    sonar() { Audio_.barrido(650, 420, 0, 0.18, 'sawtooth', 0.2); Audio_.barrido(650, 420, 0.25, 0.18, 'sawtooth', 0.2); }
  },
  {
    id: 'rana', nombre: 'Ranita', color: '#d9f7c8', texto: '¡Croac croac!',
    svg: `<circle cx="65" cy="52" r="26" fill="#5fcf5f"/><circle cx="135" cy="52" r="26" fill="#5fcf5f"/>
      <ellipse cx="100" cy="115" rx="72" ry="55" fill="#6fdc6f"/>
      ${ojos(65, 135, 52, 15)}
      <path d="M45 120 Q100 175 155 120" stroke="#2f7a2f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="88" cy="100" r="3" fill="#2f7a2f"/><circle cx="112" cy="100" r="3" fill="#2f7a2f"/>
      ${mejillas(45, 155, 118)}`,
    sonar() { for (let i = 0; i < 6; i++) Audio_.barrido(140, 110, i * 0.07, 0.06, 'square', 0.16); for (let i = 0; i < 6; i++) Audio_.barrido(140, 110, 0.6 + i * 0.07, 0.06, 'square', 0.16); }
  },
  {
    id: 'leon', nombre: 'León', color: '#ffe8b0', texto: '¡Roaaar!',
    svg: `<circle cx="100" cy="100" r="82" fill="#d9822b"/>
      <circle cx="100" cy="30" r="22" fill="#d9822b"/><circle cx="20" cy="95" r="22" fill="#d9822b"/><circle cx="180" cy="95" r="22" fill="#d9822b"/><circle cx="45" cy="160" r="22" fill="#d9822b"/><circle cx="155" cy="160" r="22" fill="#d9822b"/>
      <circle cx="58" cy="52" r="14" fill="#ffc46b"/><circle cx="142" cy="52" r="14" fill="#ffc46b"/>
      <circle cx="100" cy="105" r="55" fill="#ffc46b"/>
      <ellipse cx="100" cy="125" rx="24" ry="17" fill="#fff0cf"/>
      <polygon points="90,112 110,112 100,124" fill="#7a3b1d"/>
      ${ojos(78, 122, 92)}${sonrisa(100, 132, 14)}${mejillas(60, 140, 115)}`,
    sonar() { Audio_.barrido(260, 80, 0, 1.4, 'sawtooth', 0.3); Audio_.barrido(200, 70, 0.1, 1.3, 'square', 0.12); }
  },
  {
    id: 'elefante', nombre: 'Elefante', color: '#e1eaf5', texto: '¡Fuuuu!',
    svg: `<ellipse cx="38" cy="105" rx="34" ry="46" fill="#9bb0c9"/><ellipse cx="162" cy="105" rx="34" ry="46" fill="#9bb0c9"/>
      <ellipse cx="38" cy="105" rx="20" ry="32" fill="#c7d6e8"/><ellipse cx="162" cy="105" rx="20" ry="32" fill="#c7d6e8"/>
      <circle cx="100" cy="90" r="55" fill="#b3c5db"/>
      <path d="M85 120 Q80 175 112 178 Q125 178 122 165" stroke="#b3c5db" stroke-width="32" fill="none" stroke-linecap="round"/>
      ${ojos(78, 122, 80)}${mejillas(62, 138, 105)}`,
    sonar() { Audio_.barrido(300, 750, 0, 0.5, 'sawtooth', 0.22); Audio_.barrido(750, 420, 0.5, 0.6, 'sawtooth', 0.22); }
  }
];

// Grabaciones reales (audio/), duración máxima en segundos. El sonido de código queda como respaldo.
const GRABACIONES = {
  perro: ['audio/perro.ogg', 3], gato: ['audio/gato.ogg', 3], vaca: ['audio/vaca.ogg', 4], cerdo: ['audio/cerdo.ogg', 3],
  pato: ['audio/pato.ogg', 3.5], rana: ['audio/rana.ogg', 3], leon: ['audio/leon.ogg', 4], elefante: ['audio/elefante.ogg', 3]
};
Animales.forEach(a => {
  const sintetico = a.sonar;
  const [archivo, max] = GRABACIONES[a.id];
  a.sonar = () => Audio_.animal(archivo, max, sintetico);
});

function dibujoAnimal(a) {
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${a.nombre}">${a.svg}</svg>`;
}
