/* Electronics Level 2 (Intermediate) card visuals.
   Flat inline SVG, single accent color `a` with opacity layering.
   viewBox is always "0 0 320 110". No defs, no gradients, no ids. */

export default {

  /* ── LESSONS ── */

  'electronics-lesson-101': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Capacitor symbol: wire — plate | gap | plate — wire */}
      <line x1="30" y1="55" x2="105" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <line x1="105" y1="28" x2="105" y2="82" stroke={a} strokeWidth="4" opacity="0.9" />
      <line x1="121" y1="28" x2="121" y2="82" stroke={a} strokeWidth="4" opacity="0.9" />
      <line x1="121" y1="55" x2="190" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <text x="99" y="20" textAnchor="end" fontSize="8" fill={a} opacity="0.7">+</text>
      <text x="127" y="20" fontSize="8" fill={a} opacity="0.5">−</text>
      {/* Field lines between plates */}
      <line x1="108" y1="40" x2="118" y2="40" stroke={a} strokeWidth="1" opacity="0.35" />
      <line x1="108" y1="55" x2="118" y2="55" stroke={a} strokeWidth="1" opacity="0.35" />
      <line x1="108" y1="70" x2="118" y2="70" stroke={a} strokeWidth="1" opacity="0.35" />
      {/* Charge bucket: outline with fill level rising */}
      <rect x="225" y="25" width="46" height="60" rx="4" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
      <rect x="229" y="52" width="38" height="29" rx="3" fill={a} opacity="0.55" />
      <text x="248" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">e−</text>
      {/* Drip filling the bucket */}
      <circle cx="248" cy="16" r="3" fill={a} opacity="0.7" />
      <circle cx="248" cy="30" r="2.5" fill={a} opacity="0.5" />
      <circle cx="248" cy="42" r="2" fill={a} opacity="0.35" />
      <text x="248" y="99" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">filling…</text>
      <text x="110" y="99" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">capacitor · stores charge</text>
    </svg>
  ),

  'electronics-lesson-102': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Diode symbol as a one-way valve */}
      <line x1="30" y1="55" x2="130" y2="55" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <polygon points="130,35 130,75 165,55" fill={a} opacity="0.8" />
      <line x1="165" y1="35" x2="165" y2="75" stroke={a} strokeWidth="4" opacity="0.9" />
      <line x1="165" y1="55" x2="290" y2="55" stroke={a} strokeWidth="2.5" opacity="0.7" />
      {/* Forward arrow flowing through */}
      <line x1="45" y1="30" x2="105" y2="30" stroke={a} strokeWidth="2.5" opacity="0.85" />
      <polygon points="105,25 105,35 116,30" fill={a} opacity="0.85" />
      <text x="60" y="20" fontSize="8" fill={a} opacity="0.7">flows →</text>
      {/* Blocked arrow bouncing off the bar */}
      <line x1="265" y1="86" x2="200" y2="86" stroke={a} strokeWidth="2.5" opacity="0.4" />
      <polygon points="200,81 200,91 189,86" fill={a} opacity="0.4" />
      <path d="M182,86 Q172,86 176,74" fill="none" stroke={a} strokeWidth="2" opacity="0.35" />
      <polygon points="173,78 181,74 178,68" fill={a} opacity="0.35" />
      <text x="252" y="102" textAnchor="end" fontSize="8" fill={a} opacity="0.5">← blocked!</text>
      <text x="130" y="99" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">anode</text>
      <text x="176" y="99" fontSize="8" fill={a} opacity="0.6">cathode</text>
      <text x="290" y="40" textAnchor="end" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">one-way</text>
    </svg>
  ),

  'electronics-lesson-103': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* NPN transistor: circle, base bar, collector/emitter legs */}
      <circle cx="160" cy="55" r="30" fill={a} opacity="0.08" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
      <line x1="148" y1="38" x2="148" y2="72" stroke={a} strokeWidth="3.5" opacity="0.9" />
      {/* Base lead in from left */}
      <line x1="70" y1="55" x2="148" y2="55" stroke={a} strokeWidth="1.5" opacity="0.7" />
      {/* Collector (top-right) and emitter (bottom-right, arrow out) */}
      <line x1="148" y1="45" x2="176" y2="28" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <line x1="176" y1="28" x2="176" y2="14" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <line x1="148" y1="65" x2="176" y2="82" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <line x1="176" y1="82" x2="176" y2="96" stroke={a} strokeWidth="2.5" opacity="0.8" />
      <polygon points="176,82 165,72 171,68" fill={a} opacity="0.8" />
      {/* Tiny base signal arrow (thin) */}
      <line x1="30" y1="55" x2="60" y2="55" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <polygon points="60,52 60,58 68,55" fill={a} opacity="0.6" />
      <text x="46" y="46" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">tiny signal</text>
      {/* Big collector current arrow (thick) */}
      <line x1="230" y1="20" x2="230" y2="78" stroke={a} strokeWidth="7" opacity="0.75" />
      <polygon points="219,78 241,78 230,96" fill={a} opacity="0.75" />
      <text x="248" y="45" fontSize="8" fill={a} opacity="0.7">BIG</text>
      <text x="248" y="56" fontSize="8" fill={a} opacity="0.7">current</text>
      <text x="130" y="20" textAnchor="end" fontSize="7" fill={a} opacity="0.5">C</text>
      <text x="130" y="99" textAnchor="end" fontSize="7" fill={a} opacity="0.5">E</text>
      <text x="98" y="68" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">B</text>
      <text x="160" y="104" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">small in → big through</text>
    </svg>
  ),

  'electronics-lesson-104': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Voltage divider: 9V rail — R1 — tap — R2 — GND */}
      <text x="80" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">9V</text>
      <line x1="80" y1="20" x2="80" y2="30" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* R1 zigzag (vertical) */}
      <polyline points="80,30 72,34 88,40 72,46 88,52 80,56" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <text x="98" y="46" fontSize="8" fill={a} opacity="0.6">R1</text>
      {/* Tap node */}
      <circle cx="80" cy="62" r="3.5" fill={a} opacity="0.9" />
      <line x1="80" y1="56" x2="80" y2="62" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="83" y1="62" x2="160" y2="62" stroke={a} strokeWidth="2" opacity="0.7" />
      <polygon points="160,57 160,67 170,62" fill={a} opacity="0.7" />
      {/* R2 zigzag */}
      <line x1="80" y1="62" x2="80" y2="66" stroke={a} strokeWidth="2" opacity="0.7" />
      <polyline points="80,66 72,70 88,76 72,82 88,88 80,92" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <text x="98" y="82" fontSize="8" fill={a} opacity="0.6">R2</text>
      {/* Ground symbol */}
      <line x1="66" y1="96" x2="94" y2="96" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="72" y1="100" x2="88" y2="100" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="77" y1="104" x2="83" y2="104" stroke={a} strokeWidth="1" opacity="0.4" />
      <line x1="80" y1="92" x2="80" y2="96" stroke={a} strokeWidth="2" opacity="0.7" />
      <text x="60" y="102" textAnchor="end" fontSize="8" fill={a} opacity="0.5">GND</text>
      {/* Vout callout */}
      <rect x="185" y="44" width="105" height="36" rx="5" fill={a} opacity="0.12" stroke={a} strokeWidth="1.2" strokeOpacity="0.4" />
      <text x="237" y="60" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">Vout</text>
      <text x="237" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.8">9V → 4.5V</text>
      <text x="237" y="99" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">split in proportion</text>
    </svg>
  ),

  'electronics-lesson-105': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* MCU chip in the middle */}
      <rect x="130" y="38" width="60" height="40" rx="4" fill={a} opacity="0.6" />
      <text x="160" y="61" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">MCU</text>
      <line x1="130" y1="48" x2="118" y2="48" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="190" y1="68" x2="202" y2="68" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* Pull-up: pin — resistor up to V+ */}
      <text x="60" y="17" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">V+</text>
      <line x1="60" y1="20" x2="60" y2="26" stroke={a} strokeWidth="2" opacity="0.7" />
      <polyline points="60,26 53,30 67,35 53,40 67,45 60,49" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <line x1="60" y1="49" x2="60" y2="48" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="48" x2="118" y2="48" stroke={a} strokeWidth="2" opacity="0.7" />
      <circle cx="60" cy="48" r="3" fill={a} opacity="0.8" />
      <text x="18" y="38" fontSize="7" fill={a} opacity="0.6">PULL-UP</text>
      <text x="90" y="42" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">reads HIGH</text>
      {/* Pull-down: pin — resistor down to GND */}
      <line x1="202" y1="68" x2="260" y2="68" stroke={a} strokeWidth="2" opacity="0.7" />
      <circle cx="260" cy="68" r="3" fill={a} opacity="0.8" />
      <polyline points="260,68 253,72 267,77 253,82 267,87 260,91" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <line x1="248" y1="94" x2="272" y2="94" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="253" y1="98" x2="267" y2="98" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="257" y1="102" x2="263" y2="102" stroke={a} strokeWidth="1" opacity="0.4" />
      <line x1="260" y1="91" x2="260" y2="94" stroke={a} strokeWidth="2" opacity="0.7" />
      <text x="283" y="80" fontSize="7" fill={a} opacity="0.6">PULL-</text>
      <text x="283" y="89" fontSize="7" fill={a} opacity="0.6">DOWN</text>
      <text x="228" y="60" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">reads LOW</text>
      <text x="160" y="99" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">no floating pins</text>
    </svg>
  ),

  'electronics-lesson-106': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* AC: sine wave (left) vs DC: flat line (right) */}
      <text x="85" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">AC</text>
      <text x="240" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">DC</text>
      <line x1="160" y1="12" x2="160" y2="98" stroke={a} strokeWidth="1" opacity="0.15" strokeDasharray="4,4" />
      {/* Zero axes */}
      <line x1="20" y1="58" x2="150" y2="58" stroke={a} strokeWidth="1" opacity="0.25" />
      <line x1="172" y1="58" x2="302" y2="58" stroke={a} strokeWidth="1" opacity="0.25" />
      {/* Sine wave */}
      <path d="M22,58 Q38,24 54,58 Q70,92 86,58 Q102,24 118,58 Q134,92 148,58" fill="none" stroke={a} strokeWidth="2.5" opacity="0.85" />
      {/* Back-and-forth arrows */}
      <line x1="52" y1="98" x2="80" y2="98" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <polygon points="52,95 52,101 45,98" fill={a} opacity="0.5" />
      <polygon points="80,95 80,101 87,98" fill={a} opacity="0.5" />
      <text x="85" y="90" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">reverses 60×/sec</text>
      {/* DC flat line above axis */}
      <line x1="175" y1="34" x2="300" y2="34" stroke={a} strokeWidth="3" opacity="0.85" />
      {/* One-way arrow */}
      <line x1="212" y1="98" x2="262" y2="98" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <polygon points="262,95 262,101 270,98" fill={a} opacity="0.5" />
      <text x="240" y="90" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">steady one way</text>
      <text x="85" y="34" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">wall outlet</text>
      <text x="240" y="50" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">battery</text>
    </svg>
  ),

  'electronics-lesson-107': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Intact fuse (left): wire through a capsule */}
      <text x="80" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">FUSE OK</text>
      <line x1="20" y1="48" x2="48" y2="48" stroke={a} strokeWidth="2" opacity="0.7" />
      <rect x="48" y="38" width="64" height="20" rx="10" fill={a} opacity="0.1" stroke={a} strokeWidth="1.8" strokeOpacity="0.7" />
      <line x1="52" y1="48" x2="108" y2="48" stroke={a} strokeWidth="1.5" opacity="0.85" />
      <line x1="112" y1="48" x2="140" y2="48" stroke={a} strokeWidth="2" opacity="0.7" />
      <text x="80" y="72" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">current passes</text>
      {/* Blown fuse (right): broken wire with gap */}
      <text x="240" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">FUSE BLOWN</text>
      <line x1="180" y1="48" x2="208" y2="48" stroke={a} strokeWidth="2" opacity="0.5" />
      <rect x="208" y="38" width="64" height="20" rx="10" fill={a} opacity="0.06" stroke={a} strokeWidth="1.8" strokeOpacity="0.5" />
      <line x1="212" y1="48" x2="230" y2="44" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <line x1="250" y1="52" x2="268" y2="48" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <line x1="272" y1="48" x2="300" y2="48" stroke={a} strokeWidth="2" opacity="0.35" />
      <text x="240" y="72" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">circuit saved</text>
      {/* Lightning bolt warning between */}
      <polygon points="160,26 150,52 158,52 148,76 168,46 159,46 168,26" fill={a} opacity="0.85" />
      <text x="160" y="99" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">short circuit → fuse melts first</text>
    </svg>
  ),

  'electronics-lesson-108': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* PCB pad + component leg */}
      <line x1="40" y1="86" x2="280" y2="86" stroke={a} strokeWidth="2.5" opacity="0.35" />
      <ellipse cx="140" cy="86" rx="22" ry="7" fill={a} opacity="0.3" />
      <line x1="140" y1="86" x2="140" y2="40" stroke={a} strokeWidth="3" opacity="0.7" />
      {/* Solder fillet: little shiny volcano */}
      <path d="M118,86 Q132,84 136,66 L144,66 Q148,84 162,86 Z" fill={a} opacity="0.75" />
      {/* Iron tip approaching from the right at an angle */}
      <polygon points="168,78 178,68 232,26 244,38 190,80 178,88" fill={a} opacity="0.55" />
      <rect x="228" y="18" width="58" height="26" rx="13" transform="rotate(38 257 31)" fill={a} opacity="0.75" />
      <text x="252" y="16" fontSize="7" fill={a} opacity="0.6">iron 350°C</text>
      {/* Heat squiggles rising from joint */}
      <path d="M126,58 Q122,50 126,42 Q130,34 126,26" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" />
      <path d="M112,64 Q108,56 112,48 Q116,40 112,32" fill="none" stroke={a} strokeWidth="1.5" opacity="0.3" />
      {/* Solder wire feeding in from the left */}
      <line x1="46" y1="42" x2="116" y2="70" stroke={a} strokeWidth="2.5" opacity="0.6" />
      <text x="44" y="34" fontSize="7" fill={a} opacity="0.6">solder wire</text>
      <text x="160" y="102" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">heat the joint · feed the solder</text>
    </svg>
  ),

  'electronics-lesson-109': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* 555 chip body with notch */}
      <rect x="90" y="26" width="90" height="60" rx="4" fill={a} opacity="0.7" />
      <path d="M128,26 A7,7 0 0 0 142,26" fill="#fff" opacity="0.5" />
      <text x="135" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">555</text>
      <text x="135" y="74" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">TIMER</text>
      {/* 4 pins each side */}
      <line x1="90" y1="34" x2="76" y2="34" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="90" y1="48" x2="76" y2="48" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="90" y1="62" x2="76" y2="62" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="90" y1="76" x2="76" y2="76" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="180" y1="34" x2="194" y2="34" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="180" y1="48" x2="194" y2="48" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="180" y1="62" x2="194" y2="62" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="180" y1="76" x2="194" y2="76" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <text x="70" y="37" textAnchor="end" fontSize="6" fill={a} opacity="0.5">1</text>
      <text x="70" y="79" textAnchor="end" fontSize="6" fill={a} opacity="0.5">4</text>
      <text x="200" y="79" fontSize="6" fill={a} opacity="0.5">5</text>
      <text x="200" y="37" fontSize="6" fill={a} opacity="0.5">8</text>
      {/* Square wave coming out of the output pin */}
      <polyline points="210,48 222,48 222,32 240,32 240,48 258,48 258,32 276,32 276,48 292,48" fill="none" stroke={a} strokeWidth="2.5" opacity="0.85" />
      <text x="251" y="62" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">OUT · blink blink</text>
      <text x="40" y="59" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">8 pins</text>
      <text x="160" y="103" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">25 transistors inside one chip</text>
    </svg>
  ),

  'electronics-lesson-110': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Mini legend: battery / resistor / LED / switch */}
      <text x="160" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">SCHEMATIC SYMBOLS</text>
      {/* Battery */}
      <line x1="30" y1="42" x2="46" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <line x1="46" y1="30" x2="46" y2="54" stroke={a} strokeWidth="3.5" opacity="0.9" />
      <line x1="53" y1="36" x2="53" y2="48" stroke={a} strokeWidth="1.5" opacity="0.7" />
      <line x1="53" y1="42" x2="69" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <text x="49" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">battery</text>
      {/* Resistor */}
      <line x1="98" y1="42" x2="108" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <polyline points="108,42 113,34 121,50 129,34 137,50 145,34 150,42" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <line x1="150" y1="42" x2="160" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <text x="129" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">resistor</text>
      {/* LED */}
      <line x1="186" y1="42" x2="198" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <polygon points="198,32 198,52 214,42" fill={a} opacity="0.8" />
      <line x1="214" y1="32" x2="214" y2="52" stroke={a} strokeWidth="2.5" opacity="0.9" />
      <line x1="214" y1="42" x2="226" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <line x1="216" y1="28" x2="224" y2="21" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="222" y1="33" x2="231" y2="28" stroke={a} strokeWidth="1.5" opacity="0.4" />
      <text x="206" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">LED</text>
      {/* Switch */}
      <line x1="252" y1="42" x2="262" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <circle cx="265" cy="42" r="3" fill={a} opacity="0.85" />
      <circle cx="291" cy="42" r="3" fill={a} opacity="0.85" />
      <line x1="268" y1="41" x2="290" y2="30" stroke={a} strokeWidth="2" opacity="0.75" />
      <line x1="294" y1="42" x2="304" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <text x="278" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">switch</text>
      {/* Wire connection rule */}
      <line x1="80" y1="88" x2="120" y2="88" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <line x1="100" y1="78" x2="100" y2="98" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="88" r="3" fill={a} opacity="0.85" />
      <text x="135" y="91" fontSize="7" fill={a} opacity="0.55">dot = connected</text>
      <line x1="210" y1="88" x2="250" y2="88" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <path d="M230,98 L230,93 A5,5 0 0 1 230,83 L230,78" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
      <text x="258" y="91" fontSize="7" fill={a} opacity="0.55">hop = not</text>
    </svg>
  ),

  /* ── QUIZZES ── */

  'electronics-quiz-101': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Big capacitor symbol + question mark */}
      <line x1="40" y1="55" x2="118" y2="55" stroke={a} strokeWidth="3" opacity="0.8" />
      <line x1="118" y1="22" x2="118" y2="88" stroke={a} strokeWidth="5" opacity="0.9" />
      <line x1="138" y1="22" x2="138" y2="88" stroke={a} strokeWidth="5" opacity="0.9" />
      <line x1="138" y1="55" x2="216" y2="55" stroke={a} strokeWidth="3" opacity="0.8" />
      <line x1="122" y1="38" x2="134" y2="38" stroke={a} strokeWidth="1" opacity="0.35" />
      <line x1="122" y1="55" x2="134" y2="55" stroke={a} strokeWidth="1" opacity="0.35" />
      <line x1="122" y1="72" x2="134" y2="72" stroke={a} strokeWidth="1" opacity="0.35" />
      <text x="255" y="66" textAnchor="middle" fontSize="46" fontWeight="bold" fill={a} opacity="0.75">?</text>
      <text x="255" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">what does it store?</text>
      <text x="128" y="103" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">capacitor</text>
    </svg>
  ),

  'electronics-quiz-102': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Diode with a through-arrow and a blocked arrow */}
      <line x1="40" y1="50" x2="128" y2="50" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <polygon points="128,30 128,70 162,50" fill={a} opacity="0.8" />
      <line x1="162" y1="30" x2="162" y2="70" stroke={a} strokeWidth="4" opacity="0.9" />
      <line x1="162" y1="50" x2="250" y2="50" stroke={a} strokeWidth="2.5" opacity="0.7" />
      {/* Arrow going through (top) */}
      <line x1="58" y1="24" x2="112" y2="24" stroke={a} strokeWidth="2.5" opacity="0.85" />
      <polygon points="112,19 112,29 123,24" fill={a} opacity="0.85" />
      <text x="42" y="14" fontSize="7" fill={a} opacity="0.6">this way?</text>
      {/* Arrow blocked (bottom) with X */}
      <line x1="236" y1="80" x2="186" y2="80" stroke={a} strokeWidth="2.5" opacity="0.45" />
      <polygon points="186,75 186,85 175,80" fill={a} opacity="0.45" />
      <line x1="166" y1="73" x2="180" y2="87" stroke={a} strokeWidth="2" opacity="0.55" />
      <line x1="180" y1="73" x2="166" y2="87" stroke={a} strokeWidth="2" opacity="0.55" />
      <text x="244" y="92" textAnchor="end" fontSize="7" fill={a} opacity="0.5">or this way?</text>
      <text x="286" y="58" textAnchor="middle" fontSize="26" fontWeight="bold" fill={a} opacity="0.75">?</text>
      <text x="160" y="104" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">which way does current flow?</text>
    </svg>
  ),

  'electronics-quiz-103': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Divider with values, Vout unknown */}
      <text x="70" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">10V</text>
      <line x1="70" y1="20" x2="70" y2="28" stroke={a} strokeWidth="2" opacity="0.7" />
      <polyline points="70,28 62,32 78,38 62,44 78,50 70,54" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <text x="88" y="44" fontSize="8" fill={a} opacity="0.65">R1 = 3kΩ</text>
      <circle cx="70" cy="60" r="3.5" fill={a} opacity="0.9" />
      <line x1="70" y1="54" x2="70" y2="60" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="73" y1="60" x2="150" y2="60" stroke={a} strokeWidth="2" opacity="0.7" />
      <polygon points="150,55 150,65 160,60" fill={a} opacity="0.7" />
      <line x1="70" y1="60" x2="70" y2="64" stroke={a} strokeWidth="2" opacity="0.7" />
      <polyline points="70,64 62,68 78,74 62,80 78,86 70,90" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <text x="88" y="80" fontSize="8" fill={a} opacity="0.65">R2 = 2kΩ</text>
      <line x1="56" y1="94" x2="84" y2="94" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="62" y1="98" x2="78" y2="98" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="67" y1="102" x2="73" y2="102" stroke={a} strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="90" x2="70" y2="94" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* Big question */}
      <rect x="180" y="38" width="118" height="44" rx="6" fill={a} opacity="0.12" stroke={a} strokeWidth="1.5" strokeOpacity="0.45" />
      <text x="239" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill={a} opacity="0.9">Vout = ?</text>
      <text x="239" y="99" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">Vin × R2 / (R1 + R2)</text>
    </svg>
  ),

  'electronics-quiz-104': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Left: floating pin with static noise */}
      <text x="80" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">FLOATING</text>
      <rect x="26" y="40" width="44" height="32" rx="4" fill={a} opacity="0.55" />
      <text x="48" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">MCU</text>
      <line x1="70" y1="56" x2="100" y2="56" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* Dangling wire end + noise */}
      <path d="M100,56 Q110,50 116,58 Q122,66 130,60" fill="none" stroke={a} strokeWidth="2" opacity="0.45" strokeDasharray="3,3" />
      <text x="120" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill={a} opacity="0.8">??</text>
      <polyline points="96,80 102,72 108,86 114,72 120,86 126,78" fill="none" stroke={a} strokeWidth="1.5" opacity="0.35" />
      <text x="80" y="99" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">random noise</text>
      <line x1="160" y1="14" x2="160" y2="96" stroke={a} strokeWidth="1" opacity="0.15" strokeDasharray="4,4" />
      {/* Right: pulled-up pin, stable */}
      <text x="240" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">WITH RESISTOR</text>
      <rect x="186" y="40" width="44" height="32" rx="4" fill={a} opacity="0.7" />
      <text x="208" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">MCU</text>
      <line x1="230" y1="56" x2="258" y2="56" stroke={a} strokeWidth="2" opacity="0.8" />
      <circle cx="258" cy="56" r="3" fill={a} opacity="0.85" />
      <polyline points="258,56 264,52 270,60 276,52 282,60 288,56" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <line x1="288" y1="56" x2="298" y2="56" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="298" y1="56" x2="298" y2="36" stroke={a} strokeWidth="2" opacity="0.7" />
      <text x="298" y="30" textAnchor="end" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">V+</text>
      <text x="240" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">steady HIGH ✓</text>
      <text x="160" y="106" textAnchor="middle" fontSize="8" fill={a} opacity="0.6" fontStyle="italic">why the resistor?</text>
    </svg>
  ),

  'electronics-quiz-105': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Blown fuse center stage */}
      <line x1="30" y1="52" x2="86" y2="52" stroke={a} strokeWidth="2.5" opacity="0.6" />
      <rect x="86" y="38" width="90" height="28" rx="14" fill={a} opacity="0.08" stroke={a} strokeWidth="2" strokeOpacity="0.65" />
      {/* Melted wire with gap */}
      <line x1="92" y1="52" x2="120" y2="46" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="142" y1="58" x2="170" y2="52" stroke={a} strokeWidth="2" opacity="0.7" />
      <circle cx="123" cy="46" r="2" fill={a} opacity="0.6" />
      <circle cx="139" cy="58" r="2" fill={a} opacity="0.6" />
      <line x1="176" y1="52" x2="232" y2="52" stroke={a} strokeWidth="2.5" opacity="0.4" />
      {/* Little melt puff */}
      <path d="M128,38 Q126,30 132,26" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" />
      <path d="M136,38 Q138,30 132,26 Q128,22 133,16" fill="none" stroke={a} strokeWidth="1.5" opacity="0.3" />
      <text x="131" y="82" textAnchor="middle" fontSize="8" fill={a} opacity="0.65">melted on purpose</text>
      {/* Lightning + question */}
      <polygon points="262,18 254,40 261,40 252,60 268,35 261,35 268,18" fill={a} opacity="0.75" />
      <text x="284" y="52" fontSize="22" fontWeight="bold" fill={a} opacity="0.8">?</text>
      <text x="160" y="103" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">what saved the circuit?</text>
    </svg>
  ),

  /* ── CHALLENGES ── */

  'electronics-challenge-101': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Compact divider on the left */}
      <line x1="50" y1="16" x2="50" y2="24" stroke={a} strokeWidth="2" opacity="0.7" />
      <text x="60" y="22" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">Vin</text>
      <polyline points="50,24 43,28 57,34 43,40 57,46 50,50" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx="50" cy="56" r="3" fill={a} opacity="0.9" />
      <line x1="50" y1="50" x2="50" y2="56" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="53" y1="56" x2="80" y2="56" stroke={a} strokeWidth="2" opacity="0.7" />
      <polygon points="80,52 80,60 88,56" fill={a} opacity="0.7" />
      <line x1="50" y1="56" x2="50" y2="60" stroke={a} strokeWidth="2" opacity="0.7" />
      <polyline points="50,60 43,64 57,70 43,76 57,82 50,86" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <line x1="38" y1="92" x2="62" y2="92" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="43" y1="96" x2="57" y2="96" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="47" y1="100" x2="53" y2="100" stroke={a} strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="86" x2="50" y2="92" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* Three worked problems as slider-style rows */}
      <text x="205" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">CALCULATE ALL THREE</text>
      <rect x="110" y="28" width="190" height="20" rx="4" fill={a} opacity="0.1" stroke={a} strokeWidth="1" strokeOpacity="0.35" />
      <text x="118" y="41" fontSize="8" fill={a} opacity="0.75">9V · R1=6k · R2=3k</text>
      <text x="292" y="41" textAnchor="end" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">Vout=?</text>
      <rect x="110" y="54" width="190" height="20" rx="4" fill={a} opacity="0.1" stroke={a} strokeWidth="1" strokeOpacity="0.35" />
      <text x="118" y="67" fontSize="8" fill={a} opacity="0.75">12V · R1=10k · R2=10k</text>
      <text x="292" y="67" textAnchor="end" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">Vout=?</text>
      <rect x="110" y="80" width="190" height="20" rx="4" fill={a} opacity="0.1" stroke={a} strokeWidth="1" strokeOpacity="0.35" />
      <text x="118" y="93" fontSize="8" fill={a} opacity="0.75">5V · R1=1k · R2=4k</text>
      <text x="292" y="93" textAnchor="end" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">Vout=?</text>
    </svg>
  ),

  'electronics-challenge-102': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Circuit board outline with parts to identify */}
      <rect x="30" y="14" width="200" height="86" rx="6" fill={a} opacity="0.07" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
      {/* Traces */}
      <polyline points="42,90 42,60 78,60" fill="none" stroke={a} strokeWidth="1.2" opacity="0.25" />
      <polyline points="220,24 190,24 190,44" fill="none" stroke={a} strokeWidth="1.2" opacity="0.25" />
      <polyline points="60,24 60,40 100,40" fill="none" stroke={a} strokeWidth="1.2" opacity="0.25" />
      {/* Capacitor: cylinder */}
      <circle cx="70" cy="72" r="13" fill={a} opacity="0.55" />
      <circle cx="70" cy="72" r="13" fill="none" stroke={a} strokeWidth="1.5" opacity="0.7" />
      <line x1="70" y1="62" x2="70" y2="82" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
      <text x="70" y="99" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">cap</text>
      {/* Resistor: striped tube */}
      <rect x="112" y="28" width="40" height="13" rx="6" fill={a} opacity="0.45" />
      <line x1="122" y1="28" x2="122" y2="41" stroke="#fff" strokeWidth="2" opacity="0.6" />
      <line x1="132" y1="28" x2="132" y2="41" stroke="#fff" strokeWidth="2" opacity="0.6" />
      <line x1="142" y1="28" x2="142" y2="41" stroke="#fff" strokeWidth="2" opacity="0.6" />
      <text x="132" y="54" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">resistor</text>
      {/* IC: black rectangle with legs */}
      <rect x="150" y="62" width="56" height="26" rx="3" fill={a} opacity="0.8" />
      <text x="178" y="79" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">IC</text>
      <line x1="158" y1="62" x2="158" y2="56" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="170" y1="62" x2="170" y2="56" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="182" y1="62" x2="182" y2="56" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="194" y1="62" x2="194" y2="56" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="158" y1="88" x2="158" y2="94" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="170" y1="88" x2="170" y2="94" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="182" y1="88" x2="182" y2="94" stroke={a} strokeWidth="2" opacity="0.6" />
      <line x1="194" y1="88" x2="194" y2="94" stroke={a} strokeWidth="2" opacity="0.6" />
      {/* Diode with stripe */}
      <rect x="94" y="70" width="26" height="10" rx="5" fill={a} opacity="0.4" />
      <line x1="112" y1="70" x2="112" y2="80" stroke="#fff" strokeWidth="2" opacity="0.7" />
      <text x="107" y="94" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">diode</text>
      {/* Magnifier + task */}
      <circle cx="265" cy="45" r="20" fill="none" stroke={a} strokeWidth="2.5" opacity="0.7" />
      <line x1="280" y1="60" x2="296" y2="76" stroke={a} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <text x="272" y="94" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">find</text>
      <text x="272" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">these</text>
    </svg>
  ),

  'electronics-challenge-103': (a) => (
    <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
      {/* Small schematic loop: battery → switch → resistor → LED */}
      <line x1="30" y1="28" x2="200" y2="28" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="30" y1="28" x2="30" y2="84" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="30" y1="84" x2="200" y2="84" stroke={a} strokeWidth="2" opacity="0.7" />
      <line x1="200" y1="28" x2="200" y2="84" stroke={a} strokeWidth="2" opacity="0.7" />
      {/* Battery left */}
      <line x1="20" y1="48" x2="40" y2="48" stroke={a} strokeWidth="3.5" opacity="0.9" />
      <line x1="24" y1="57" x2="36" y2="57" stroke={a} strokeWidth="1.5" opacity="0.7" />
      <text x="14" y="46" fontSize="7" fill={a} opacity="0.7">+</text>
      {/* Resistor top */}
      <polyline points="85,28 91,20 97,36 103,20 109,36 115,28" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      {/* LED right */}
      <polygon points="190,50 190,66 202,58" fill={a} opacity="0.75" />
      <line x1="202" y1="50" x2="202" y2="66" stroke={a} strokeWidth="2.5" opacity="0.9" />
      {/* Traced path highlight (colored pencil line) */}
      <path d="M34,44 Q34,32 48,32 L150,32" fill="none" stroke={a} strokeWidth="4" strokeLinecap="round" opacity="0.25" />
      <polygon points="150,26 150,38 162,32" fill={a} opacity="0.3" />
      {/* Pencil drawing on the loop */}
      <polygon points="228,86 300,32 310,45 238,99" fill={a} opacity="0.55" />
      <polygon points="228,86 238,99 222,102" fill={a} opacity="0.85" />
      <rect x="295" y="28" width="16" height="14" rx="2" transform="rotate(37 303 35)" fill={a} opacity="0.35" />
      {/* Wobbly hand-drawn stroke coming off the pencil tip */}
      <path d="M218,100 Q200,104 186,98 Q172,92 158,98" fill="none" stroke={a} strokeWidth="2" opacity="0.45" strokeDasharray="5,4" />
      <text x="115" y="102" textAnchor="middle" fontSize="9" fill={a} opacity="0.65">trace it on paper</text>
      <text x="115" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">FOLLOW THE PATH</text>
    </svg>
  ),

};
