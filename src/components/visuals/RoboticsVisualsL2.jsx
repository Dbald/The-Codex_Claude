/* Robotics Level 2 visuals — flat inline SVG registry keyed by card id.
   Each entry is a render function taking the accent color string `a`. */

const V = (children) => (
  <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
    {children}
  </svg>
);

export default {
  /* ── LESSONS ── */

  'robotics-lesson-101': (a) => V(<>
    {/* Encoder: motor + slotted disc on shaft + optical sensor + pulse train */}
    <rect x="16" y="38" width="56" height="40" rx="5" fill={a} opacity="0.55" />
    <text x="44" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">M</text>
    {/* Shaft */}
    <line x1="72" y1="58" x2="108" y2="58" stroke={a} strokeWidth="3" opacity="0.7" />
    {/* Slotted disc */}
    <circle cx="130" cy="58" r="32" fill={a} opacity="0.15" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
    <circle cx="130" cy="58" r="6" fill={a} opacity="0.8" />
    {/* Slots around rim */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={130 + 20 * Math.cos(rad)}
          y1={58 + 20 * Math.sin(rad)}
          x2={130 + 30 * Math.cos(rad)}
          y2={58 + 30 * Math.sin(rad)}
          stroke={a}
          strokeWidth="3.5"
          opacity="0.6"
        />
      );
    })}
    {/* Optical sensor reading the rim */}
    <rect x="168" y="46" width="26" height="24" rx="3" fill={a} opacity="0.7" />
    <text x="181" y="61" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">EYE</text>
    <line x1="163" y1="58" x2="168" y2="58" stroke={a} strokeWidth="1.5" opacity="0.5" strokeDasharray="2,2" />
    {/* Pulse train output */}
    <polyline points="200,80 208,80 208,64 218,64 218,80 228,80 228,64 238,64 238,80 248,80 248,64 258,64 258,80 268,80" fill="none" stroke={a} strokeWidth="2" opacity="0.85" strokeLinecap="square" />
    <text x="234" y="94" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">pulses</text>
    <text x="234" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">1,024 ticks/rev</text>
    <text x="130" y="16" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">ENCODER = feedback</text>
  </>),

  'robotics-lesson-102': (a) => V(<>
    {/* Stepper: motor circle ringed by discrete step positions */}
    <circle cx="120" cy="58" r="30" fill="none" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <circle cx="120" cy="58" r="20" fill={a} opacity="0.12" />
    <text x="120" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">M</text>
    {/* Step position dots at fixed angles */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return (
        <circle
          key={i}
          cx={120 + 40 * Math.cos(rad)}
          cy={58 + 40 * Math.sin(rad)}
          r="3"
          fill={a}
          opacity={i === 2 ? 0.95 : 0.35}
        />
      );
    })}
    {/* Needle pointing at the active step */}
    <line x1="120" y1="58" x2="146" y2="32" stroke={a} strokeWidth="2.5" opacity="0.9" strokeLinecap="round" />
    {/* Step arc arrow between two dots */}
    <path d="M158,36 A44,44 0 0,1 163,52" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <polygon points="159,52 166,56 165,47" fill={a} opacity="0.7" />
    <text x="240" y="42" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">1.8° per step</text>
    <text x="240" y="58" textAnchor="middle" fontSize="8" fill={a} opacity="0.65">200 steps = 1 rev</text>
    <text x="240" y="74" textAnchor="middle" fontSize="8" fill={a} opacity="0.55">count clicks →</text>
    <text x="240" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.55">know position</text>
    <text x="120" y="15" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">STEPPER</text>
  </>),

  'robotics-lesson-103': (a) => V(<>
    {/* Serial: two chips, TX→RX / RX←TX with data bits traveling */}
    <rect x="24" y="26" width="70" height="60" rx="5" fill={a} opacity="0.5" stroke={a} strokeWidth="1.5" strokeOpacity="0.8" />
    <text x="59" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">MCU</text>
    <text x="59" y="66" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">UART</text>
    <rect x="226" y="26" width="70" height="60" rx="5" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="261" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">SENSOR</text>
    <text x="261" y="66" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">0x68</text>
    {/* TX → RX line */}
    <line x1="94" y1="42" x2="216" y2="42" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <polygon points="216,37 226,42 216,47" fill={a} opacity="0.8" />
    <text x="100" y="38" fontSize="7" fill={a} opacity="0.7">TX</text>
    <text x="212" y="38" textAnchor="end" fontSize="7" fill={a} opacity="0.7">RX</text>
    {/* Data bits traveling on the TX line */}
    <text x="125" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.95">1</text>
    <text x="145" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.5">0</text>
    <text x="165" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.95">1</text>
    <text x="185" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.95">1</text>
    {/* RX ← TX return line */}
    <line x1="226" y1="72" x2="104" y2="72" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <polygon points="104,67 94,72 104,77" fill={a} opacity="0.6" />
    <text x="100" y="84" fontSize="7" fill={a} opacity="0.6">RX</text>
    <text x="212" y="84" textAnchor="end" fontSize="7" fill={a} opacity="0.6">TX</text>
    <text x="160" y="103" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">one bit at a time · UART / I2C / SPI</text>
    <text x="160" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">SERIAL COMMUNICATION</text>
  </>),

  'robotics-lesson-104': (a) => V(<>
    {/* IMU: chip with X/Y/Z axis arrows + tilt readout */}
    <rect x="90" y="34" width="66" height="50" rx="5" fill={a} opacity="0.55" stroke={a} strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(-8 123 59)" />
    <text x="123" y="57" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff" transform="rotate(-8 123 59)">IMU</text>
    <text x="123" y="70" textAnchor="middle" fontSize="6" fill="#fff" opacity="0.8" transform="rotate(-8 123 59)">MPU-6050</text>
    {/* Chip pins */}
    {[42, 54, 66, 78].map((y, i) => (
      <line key={i} x1="80" y1={y} x2="90" y2={y + 1} stroke={a} strokeWidth="1.5" opacity="0.5" />
    ))}
    {/* Axis arrows from chip center */}
    <line x1="180" y1="60" x2="230" y2="60" stroke={a} strokeWidth="2" opacity="0.85" />
    <polygon points="230,55 240,60 230,65" fill={a} opacity="0.85" />
    <text x="248" y="63" fontSize="9" fontWeight="bold" fill={a} opacity="0.85">X</text>
    <line x1="180" y1="60" x2="180" y2="20" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="175,20 180,10 185,20" fill={a} opacity="0.7" />
    <text x="190" y="18" fontSize="9" fontWeight="bold" fill={a} opacity="0.7">Y</text>
    <line x1="180" y1="60" x2="212" y2="90" stroke={a} strokeWidth="2" opacity="0.5" />
    <polygon points="205,90 218,96 212,83" fill={a} opacity="0.5" />
    <text x="226" y="98" fontSize="9" fontWeight="bold" fill={a} opacity="0.5">Z</text>
    {/* Tilt angle arc */}
    <path d="M42,92 A34,34 0 0,1 52,68" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="20" y1="92" x2="70" y2="92" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <line x1="20" y1="92" x2="62" y2="62" stroke={a} strokeWidth="2" opacity="0.8" />
    <text x="60" y="86" fontSize="8" fontWeight="bold" fill={a} opacity="0.85">3°</text>
    <text x="44" y="104" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">tilt</text>
    <text x="278" y="34" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">accel + gyro</text>
  </>),

  'robotics-lesson-105': (a) => V(<>
    {/* PID: dashed setpoint, oscillating curve converging onto it */}
    <text x="160" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">PID CONTROL</text>
    {/* Axes */}
    <line x1="26" y1="96" x2="300" y2="96" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="26" y1="96" x2="26" y2="22" stroke={a} strokeWidth="1" opacity="0.25" />
    {/* Setpoint dashed line */}
    <line x1="26" y1="50" x2="300" y2="50" stroke={a} strokeWidth="1.5" opacity="0.5" strokeDasharray="6,4" />
    <text x="298" y="44" textAnchor="end" fontSize="7" fill={a} opacity="0.7">SETPOINT</text>
    {/* Converging oscillation */}
    <path d="M26,94 C50,94 58,30 84,30 C104,30 108,64 128,64 C146,64 150,42 168,42 C184,42 188,55 204,55 C220,55 226,48 244,49 C264,50 280,50 298,50" fill="none" stroke={a} strokeWidth="2.5" opacity="0.9" />
    {/* Term labels */}
    <text x="60" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">P</text>
    <text x="60" y="98" textAnchor="middle" fontSize="6" fill={a} opacity="0.5">big push</text>
    <text x="150" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">D</text>
    <text x="150" y="98" textAnchor="middle" fontSize="6" fill={a} opacity="0.5">brakes it</text>
    <text x="250" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">I</text>
    <text x="250" y="98" textAnchor="middle" fontSize="6" fill={a} opacity="0.5">last bit</text>
    <text x="14" y="53" fontSize="7" fill={a} opacity="0.5">err</text>
  </>),

  'robotics-lesson-106': (a) => V(<>
    {/* Differential drive: top-view robot, fast left / slow right, curved path */}
    {/* Robot body (top view) */}
    <rect x="34" y="34" width="66" height="50" rx="10" fill={a} opacity="0.3" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="67" cy="59" r="6" fill={a} opacity="0.6" />
    {/* Left wheel — fast */}
    <rect x="24" y="38" width="10" height="26" rx="3" fill={a} opacity="0.85" />
    <text x="29" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">100%</text>
    <text x="29" y="92" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">FAST</text>
    {/* Right wheel — slow */}
    <rect x="100" y="38" width="10" height="26" rx="3" fill={a} opacity="0.4" />
    <text x="105" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.6">50%</text>
    <text x="105" y="92" textAnchor="middle" fontSize="7" fill={a} opacity="0.45">slow</text>
    {/* Heading nose */}
    <polygon points="60,34 67,24 74,34" fill={a} opacity="0.6" />
    {/* Curved path toward slow (right) side */}
    <path d="M67,26 C90,14 170,14 230,50 C258,68 272,82 282,94" fill="none" stroke={a} strokeWidth="2.5" opacity="0.7" strokeDasharray="7,5" />
    <polygon points="272,90 286,99 282,84" fill={a} opacity="0.85" />
    <text x="200" y="44" textAnchor="middle" fontSize="8" fill={a} opacity="0.65">curves toward slow wheel</text>
    <text x="160" y="106" textAnchor="middle" fontSize="8" fill={a} opacity="0.55">left = throttle + steering · right = throttle − steering</text>
    <text x="160" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">DIFFERENTIAL DRIVE</text>
  </>),

  'robotics-lesson-107': (a) => V(<>
    {/* Line following: curved line on ground, robot with 2 sensors — one on, one off */}
    {/* The line (curving) */}
    <path d="M30,104 C70,80 100,78 150,60 C200,42 240,44 296,20" fill="none" stroke={a} strokeWidth="8" opacity="0.35" strokeLinecap="round" />
    {/* Robot body top-view straddling the line */}
    <rect x="118" y="30" width="84" height="56" rx="10" fill={a} opacity="0.25" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" transform="rotate(-16 160 58)" />
    {/* Wheels */}
    <rect x="112" y="38" width="9" height="24" rx="3" fill={a} opacity="0.55" transform="rotate(-16 160 58)" />
    <rect x="199" y="38" width="9" height="24" rx="3" fill={a} opacity="0.55" transform="rotate(-16 160 58)" />
    {/* Sensors under the front edge */}
    <circle cx="146" cy="66" r="9" fill={a} opacity="0.9" />
    <text x="146" y="69" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#fff">ON</text>
    <circle cx="182" cy="54" r="9" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="182" y="57" textAnchor="middle" fontSize="6" fill={a} opacity="0.6">off</text>
    {/* Correction hint */}
    <text x="70" y="30" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">left sensor sees line</text>
    <text x="70" y="42" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">→ steer left</text>
    <text x="262" y="88" textAnchor="middle" fontSize="8" fill={a} opacity="0.55">fix it 100×/sec</text>
    <text x="160" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">LINE FOLLOWING</text>
  </>),

  'robotics-lesson-108': (a) => V(<>
    {/* State machine: three state bubbles with labeled transitions */}
    <text x="160" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">STATE MACHINE — one state at a time</text>
    {/* SEARCH */}
    <rect x="18" y="42" width="76" height="28" rx="14" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    <text x="56" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">SEARCH</text>
    {/* FOLLOW (active) */}
    <rect x="122" y="42" width="76" height="28" rx="14" fill={a} opacity="0.8" />
    <text x="160" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">FOLLOW</text>
    {/* AVOID */}
    <rect x="226" y="42" width="76" height="28" rx="14" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    <text x="264" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">AVOID</text>
    {/* SEARCH → FOLLOW */}
    <line x1="94" y1="50" x2="114" y2="50" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="114,45 122,50 114,55" fill={a} opacity="0.8" />
    <text x="108" y="38" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">line found</text>
    {/* FOLLOW → AVOID */}
    <line x1="198" y1="50" x2="218" y2="50" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="218,45 226,50 218,55" fill={a} opacity="0.8" />
    <text x="212" y="38" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">obstacle!</text>
    {/* AVOID → SEARCH (return path underneath) */}
    <path d="M264,70 C264,94 56,94 56,70" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" strokeDasharray="5,4" />
    <polygon points="51,74 56,66 61,74" fill={a} opacity="0.7" />
    <text x="160" y="102" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">path clear → search again</text>
  </>),

  'robotics-lesson-109': (a) => V(<>
    {/* LiPo safety: battery + warning triangle + rule checklist */}
    {/* Battery */}
    <rect x="24" y="34" width="72" height="48" rx="6" fill={a} opacity="0.6" />
    <rect x="96" y="46" width="8" height="24" rx="2" fill={a} opacity="0.5" />
    <text x="60" y="55" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">LiPo</text>
    <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.85">7.4V 2S</text>
    {/* Warning triangle */}
    <polygon points="60,10 78,28 42,28" fill="none" stroke={a} strokeWidth="2" opacity="0.85" strokeLinejoin="round" />
    <text x="60" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">!</text>
    {/* Checklist */}
    <text x="130" y="34" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">✓</text>
    <text x="144" y="34" fontSize="8" fill={a} opacity="0.7">charge in a fireproof bag</text>
    <text x="130" y="54" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">✓</text>
    <text x="144" y="54" fontSize="8" fill={a} opacity="0.7">never below 3.0V per cell</text>
    <text x="130" y="74" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">✓</text>
    <text x="144" y="74" fontSize="8" fill={a} opacity="0.7">watch it while charging</text>
    <text x="130" y="94" fontSize="10" fontWeight="bold" fill={a} opacity="0.85">✓</text>
    <text x="144" y="94" fontSize="8" fill={a} opacity="0.7">puffy pack = retire it</text>
    <text x="60" y="98" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">respect the pack</text>
  </>),

  'robotics-lesson-110': (a) => V(<>
    {/* Full robot build: exploded stack of subsystems with connecting lines */}
    <text x="160" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">BUILD IT SUBSYSTEM BY SUBSYSTEM</text>
    {/* Sensor (top) */}
    <rect x="130" y="18" width="60" height="14" rx="3" fill={a} opacity="0.3" />
    <text x="160" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill={a} opacity="0.8">SENSOR</text>
    <line x1="160" y1="32" x2="160" y2="37" stroke={a} strokeWidth="1.5" opacity="0.4" />
    {/* MCU */}
    <rect x="122" y="37" width="76" height="14" rx="3" fill={a} opacity="0.75" />
    <text x="160" y="47" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MCU (brain)</text>
    <line x1="160" y1="51" x2="160" y2="56" stroke={a} strokeWidth="1.5" opacity="0.4" />
    {/* Driver */}
    <rect x="114" y="56" width="92" height="14" rx="3" fill={a} opacity="0.5" />
    <text x="160" y="66" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MOTOR DRIVER</text>
    <line x1="160" y1="70" x2="160" y2="75" stroke={a} strokeWidth="1.5" opacity="0.4" />
    {/* Chassis with motors */}
    <rect x="102" y="75" width="116" height="16" rx="4" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    <text x="160" y="86" textAnchor="middle" fontSize="7" fontWeight="bold" fill={a} opacity="0.85">CHASSIS + MOTORS</text>
    <circle cx="112" cy="98" r="6" fill={a} opacity="0.55" />
    <circle cx="208" cy="98" r="6" fill={a} opacity="0.55" />
    {/* Battery feeding the side */}
    <rect x="34" y="48" width="44" height="26" rx="4" fill={a} opacity="0.6" />
    <text x="56" y="64" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">BATTERY</text>
    <line x1="78" y1="61" x2="114" y2="61" stroke={a} strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3" />
    {/* Test-each-part note */}
    <text x="262" y="46" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">test each</text>
    <text x="262" y="57" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">part alone,</text>
    <text x="262" y="68" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">then connect</text>
    <text x="262" y="79" textAnchor="middle" fontSize="7" fill={a} opacity="0.65">one at a time</text>
  </>),

  /* ── QUIZZES ── */

  'robotics-quiz-101': (a) => V(<>
    {/* Encoder quiz: slotted disc + question */}
    <circle cx="90" cy="52" r="34" fill={a} opacity="0.12" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
    <circle cx="90" cy="52" r="6" fill={a} opacity="0.8" />
    {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={90 + 22 * Math.cos(rad)}
          y1={52 + 22 * Math.sin(rad)}
          x2={90 + 32 * Math.cos(rad)}
          y2={52 + 32 * Math.sin(rad)}
          stroke={a}
          strokeWidth="4"
          opacity="0.6"
        />
      );
    })}
    {/* Sensor + pulses */}
    <rect x="132" y="42" width="22" height="20" rx="3" fill={a} opacity="0.7" />
    <polyline points="162,60 170,60 170,46 180,46 180,60 190,60 190,46 200,46 200,60 210,60 210,46 220,46 220,60 228,60" fill="none" stroke={a} strokeWidth="2" opacity="0.85" strokeLinecap="square" />
    <text x="264" y="42" textAnchor="middle" fontSize="16" fontWeight="bold" fill={a} opacity="0.85">?</text>
    <text x="264" y="60" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">tick... tick...</text>
    <text x="160" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">how does the robot know how far it went?</text>
  </>),

  'robotics-quiz-102': (a) => V(<>
    {/* PID quiz: overshooting vs smooth curve */}
    <line x1="20" y1="44" x2="300" y2="44" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="6,4" />
    <text x="298" y="38" textAnchor="end" fontSize="7" fill={a} opacity="0.6">target</text>
    {/* Overshooting curve (left) */}
    <path d="M24,92 C40,92 44,20 62,20 C78,20 80,62 96,62 C110,62 112,34 126,36 C136,38 142,44 148,44" fill="none" stroke={a} strokeWidth="2" opacity="0.45" />
    <text x="86" y="94" textAnchor="middle" fontSize="8" fill={a} opacity="0.55">overshoots</text>
    {/* Divider */}
    <line x1="160" y1="16" x2="160" y2="86" stroke={a} strokeWidth="1" opacity="0.2" />
    {/* Smooth curve (right) */}
    <path d="M172,92 C200,92 210,50 236,45 C260,42 280,44 296,44" fill="none" stroke={a} strokeWidth="2.5" opacity="0.9" />
    <text x="240" y="94" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">smooth</text>
    <text x="160" y="106" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">which term damps the overshoot: P, I, or D?</text>
    <text x="160" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">P · I · D ?</text>
  </>),

  'robotics-quiz-103': (a) => V(<>
    {/* Differential drive quiz: wheels in opposite directions */}
    <rect x="120" y="30" width="80" height="56" rx="10" fill={a} opacity="0.3" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <polygon points="152,30 160,20 168,30" fill={a} opacity="0.6" />
    {/* Left wheel forward */}
    <rect x="108" y="38" width="11" height="28" rx="3" fill={a} opacity="0.8" />
    <line x1="113" y1="70" x2="113" y2="90" stroke={a} strokeWidth="2" opacity="0.8" />
    <polygon points="108,74 113,64 118,74" fill={a} opacity="0.85" />
    <text x="88" y="56" textAnchor="end" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">+100%</text>
    {/* Right wheel backward */}
    <rect x="201" y="38" width="11" height="28" rx="3" fill={a} opacity="0.8" />
    <line x1="206" y1="34" x2="206" y2="14" stroke={a} strokeWidth="2" opacity="0.8" />
    <polygon points="201,30 206,40 211,30" fill={a} opacity="0.85" />
    <text x="232" y="56" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">−100%</text>
    {/* Spin arc around center */}
    <path d="M160,44 A16,16 0 1,1 145,60" fill="none" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="140,56 146,66 151,55" fill={a} opacity="0.8" />
    <text x="160" y="102" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">opposite directions — what does the robot do?</text>
  </>),

  'robotics-quiz-104': (a) => V(<>
    {/* State machine quiz: two states active = X, one active = check */}
    <text x="160" y="13" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">HOW MANY STATES CAN BE ACTIVE?</text>
    {/* Left pair: both highlighted — wrong */}
    <rect x="24" y="30" width="58" height="22" rx="11" fill={a} opacity="0.75" />
    <text x="53" y="45" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">CLEAN</text>
    <rect x="24" y="60" width="58" height="22" rx="11" fill={a} opacity="0.75" />
    <text x="53" y="75" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">CHARGE</text>
    <text x="110" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill={a} opacity="0.55">✕</text>
    <text x="67" y="100" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">both on?</text>
    {/* Divider */}
    <line x1="150" y1="24" x2="150" y2="88" stroke={a} strokeWidth="1" opacity="0.2" />
    {/* Right pair: one highlighted — correct */}
    <rect x="176" y="30" width="58" height="22" rx="11" fill={a} opacity="0.85" />
    <text x="205" y="45" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">CLEAN</text>
    <rect x="176" y="60" width="58" height="22" rx="11" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <text x="205" y="75" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">CHARGE</text>
    <text x="262" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill={a} opacity="0.9">✓</text>
    <text x="220" y="100" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">just one?</text>
    <text x="292" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.8">?</text>
  </>),

  'robotics-quiz-105': (a) => V(<>
    {/* LiPo quiz: battery + flame + safe or not */}
    <rect x="60" y="36" width="80" height="50" rx="6" fill={a} opacity="0.6" />
    <rect x="140" y="48" width="9" height="26" rx="2" fill={a} opacity="0.5" />
    <text x="100" y="58" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">LiPo</text>
    <text x="100" y="74" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.85">2.4V ⚠</text>
    {/* Flame icon */}
    <path d="M210,72 C198,60 202,44 212,34 C210,46 220,48 222,40 C230,50 232,64 222,74 C218,78 214,76 210,72 Z" fill={a} opacity="0.8" />
    <path d="M212,68 C208,62 212,54 216,50 C215,58 222,60 220,66 C218,71 214,71 212,68 Z" fill={a} opacity="0.4" />
    {/* Big question */}
    <text x="268" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill={a} opacity="0.85">?</text>
    <text x="160" y="24" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.75">CELL AT 2.4V — KEEP USING IT?</text>
    <text x="160" y="102" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">safe or not? which rule protects the pack?</text>
  </>),

  /* ── CHALLENGES ── */

  'robotics-challenge-101': (a) => V(<>
    {/* Vacuum robot state diagram sketch */}
    <text x="160" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">DESIGN THE VACUUM'S BRAIN</text>
    {/* CLEAN */}
    <ellipse cx="62" cy="46" rx="40" ry="17" fill={a} opacity="0.7" />
    <text x="62" y="50" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">CLEAN</text>
    {/* DOCK */}
    <ellipse cx="258" cy="46" rx="40" ry="17" fill={a} opacity="0.4" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    <text x="258" y="50" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.95">DOCK</text>
    {/* STUCK */}
    <ellipse cx="160" cy="86" rx="40" ry="15" fill={a} opacity="0.3" stroke={a} strokeWidth="1.5" strokeOpacity="0.55" strokeDasharray="4,3" />
    <text x="160" y="90" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.85">STUCK</text>
    {/* CLEAN → DOCK: battery low */}
    <line x1="102" y1="42" x2="212" y2="42" stroke={a} strokeWidth="2" opacity="0.65" />
    <polygon points="212,37 220,42 212,47" fill={a} opacity="0.8" />
    <text x="160" y="36" textAnchor="middle" fontSize="7" fill={a} opacity="0.7">battery low</text>
    {/* DOCK → CLEAN: charged */}
    <line x1="212" y1="54" x2="106" y2="54" stroke={a} strokeWidth="1.5" opacity="0.45" strokeDasharray="4,3" />
    <polygon points="106,49 98,54 106,59" fill={a} opacity="0.6" />
    <text x="160" y="66" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">charged</text>
    {/* CLEAN → STUCK: bumper */}
    <path d="M78,62 Q100,76 122,82" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <polygon points="116,85 126,84 119,77" fill={a} opacity="0.65" />
    <text x="76" y="80" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">bumper!</text>
    {/* STUCK → DOCK: freed */}
    <path d="M198,82 Q222,76 244,62" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <polygon points="238,61 248,59 242,69" fill={a} opacity="0.65" />
    <text x="246" y="80" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">freed</text>
    <text x="160" y="106" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">label every arrow — no dead ends</text>
  </>),

  'robotics-challenge-102': (a) => V(<>
    {/* PID line-follow pseudocode: line + sensor array + code block */}
    {/* Line under sensor array */}
    <path d="M20,96 C50,84 70,80 96,72" fill="none" stroke={a} strokeWidth="7" opacity="0.35" strokeLinecap="round" />
    {/* 5-sensor array bar */}
    <rect x="24" y="34" width="110" height="18" rx="4" fill={a} opacity="0.25" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={40 + i * 20} cy="43" r="5" fill={a} opacity={i === 1 ? 0.95 : 0.35} />
    ))}
    <text x="40" y="26" textAnchor="middle" fontSize="6" fill={a} opacity="0.55">-2</text>
    <text x="60" y="26" textAnchor="middle" fontSize="6" fontWeight="bold" fill={a} opacity="0.9">-1</text>
    <text x="80" y="26" textAnchor="middle" fontSize="6" fill={a} opacity="0.55">0</text>
    <text x="100" y="26" textAnchor="middle" fontSize="6" fill={a} opacity="0.55">+1</text>
    <text x="120" y="26" textAnchor="middle" fontSize="6" fill={a} opacity="0.55">+2</text>
    <line x1="60" y1="52" x2="72" y2="70" stroke={a} strokeWidth="1.5" opacity="0.5" strokeDasharray="3,2" />
    {/* Pseudocode block */}
    <rect x="158" y="20" width="148" height="76" rx="5" fill={a} opacity="0.1" stroke={a} strokeWidth="1.5" strokeOpacity="0.5" />
    <text x="168" y="36" fontSize="8" fontFamily="monospace" fill={a} opacity="0.9">error = pos - center</text>
    <text x="168" y="50" fontSize="8" fontFamily="monospace" fill={a} opacity="0.75">out = Kp·e + Ki·Σe + Kd·Δe</text>
    <text x="168" y="64" fontSize="8" fontFamily="monospace" fill={a} opacity="0.75">left  = base + out</text>
    <text x="168" y="78" fontSize="8" fontFamily="monospace" fill={a} opacity="0.75">right = base - out</text>
    <text x="168" y="91" fontSize="7" fontFamily="monospace" fill={a} opacity="0.5">if lost: search()</text>
    <text x="79" y="106" textAnchor="middle" fontSize="7" fill={a} opacity="0.55">error = -1 → steer left</text>
  </>),

  'robotics-challenge-103': (a) => V(<>
    {/* Parts list receipt with prices + robot silhouette */}
    {/* Receipt */}
    <rect x="30" y="12" width="140" height="90" rx="4" fill={a} opacity="0.1" stroke={a} strokeWidth="1.5" strokeOpacity="0.55" />
    <text x="40" y="26" fontSize="8" fontWeight="bold" fill={a} opacity="0.85">PARTS LIST</text>
    <line x1="40" y1="31" x2="160" y2="31" stroke={a} strokeWidth="1" opacity="0.3" />
    <text x="40" y="42" fontSize="7" fill={a} opacity="0.7">MCU (Uno clone)</text>
    <text x="160" y="42" textAnchor="end" fontSize="7" fill={a} opacity="0.7">$9</text>
    <text x="40" y="53" fontSize="7" fill={a} opacity="0.7">2× motors + wheels</text>
    <text x="160" y="53" textAnchor="end" fontSize="7" fill={a} opacity="0.7">$12</text>
    <text x="40" y="64" fontSize="7" fill={a} opacity="0.7">Motor driver</text>
    <text x="160" y="64" textAnchor="end" fontSize="7" fill={a} opacity="0.7">$5</text>
    <text x="40" y="75" fontSize="7" fill={a} opacity="0.7">Sensor + battery + chassis</text>
    <text x="160" y="75" textAnchor="end" fontSize="7" fill={a} opacity="0.7">$26</text>
    <line x1="40" y1="81" x2="160" y2="81" stroke={a} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
    <text x="40" y="94" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">TOTAL</text>
    <text x="160" y="94" textAnchor="end" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">$52</text>
    {/* Robot silhouette */}
    <rect x="212" y="42" width="76" height="34" rx="8" fill={a} opacity="0.55" />
    <circle cx="228" cy="82" r="10" fill={a} opacity="0.7" />
    <circle cx="272" cy="82" r="10" fill={a} opacity="0.7" />
    <rect x="238" y="30" width="24" height="14" rx="3" fill={a} opacity="0.4" />
    <line x1="250" y1="30" x2="250" y2="20" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <circle cx="250" cy="18" r="3" fill={a} opacity="0.6" />
    <text x="250" y="64" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">YOUR BOT</text>
    <text x="250" y="102" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">plan → price → build</text>
    {/* Arrow receipt → robot */}
    <line x1="176" y1="58" x2="200" y2="58" stroke={a} strokeWidth="2" opacity="0.6" />
    <polygon points="200,53 210,58 200,63" fill={a} opacity="0.75" />
  </>),
};
