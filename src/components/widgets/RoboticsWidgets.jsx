import { useState } from 'react';

function Slider({ id, label, display, value, min, max, step = 1, onChange, accent }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="flex items-center justify-between gap-2 text-xs text-slate-300">
        <span>{label}</span>
        <span className="font-bold text-slate-100">{display ?? value}</span>
      </label>
      <input
        id={id}
        type="range"
        className="codex-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: accent }}
      />
    </div>
  );
}

function Btn({ active, accent, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] flex-1 rounded-xl px-3 text-sm font-bold transition-colors"
      style={active ? { background: accent, color: '#10141f' } : { background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}
    >
      {children}
    </button>
  );
}

/* robotics-lesson-001 — Motor driver: tiny signal in, big power out */
function MotorDriverWidget({ accent }) {
  const [signal, setSignal] = useState(60);
  const signalMa = (20 * signal) / 100;
  const motorA = (2 * signal) / 100;
  const speedLabel = signal === 0 ? 'motor is still' : signal < 34 ? 'motor spins slowly' : signal < 67 ? 'motor spins fast' : 'motor at full blast!';
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="md-signal" label="Arduino control signal" display={`${signal}%`} value={signal} min={0} max={100} onChange={setSignal} accent={accent} />
      <div className="flex items-center justify-between gap-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="text-center">
          <p className="text-xs text-slate-300">Arduino sends</p>
          <p className="text-2xl font-black text-slate-100">{signalMa.toFixed(1)}<span className="text-sm"> mA</span></p>
          <p className="text-xs text-slate-400">a whisper</p>
        </div>
        <span aria-hidden="true" className="text-2xl">➡️🔋➡️</span>
        <div className="text-center">
          <p className="text-xs text-slate-300">Driver delivers</p>
          <p className="text-2xl font-black" style={{ color: accent }}>{motorA.toFixed(2)}<span className="text-sm"> A</span></p>
          <p className="text-xs text-slate-400">a shove — 100× more</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">
        <span aria-hidden="true">{signal === 0 ? '🛑' : '⚙️'}</span> <span className="font-black" style={{ color: accent }}>{speedLabel}</span> The driver copies the weak signal using the battery's muscle.
      </p>
    </div>
  );
}

/* robotics-lesson-002 — DC motor: voltage sets speed AND direction */
function DcMotorWidget({ accent }) {
  const [volts, setVolts] = useState(3);
  const speed = Math.round((Math.abs(volts) / 6) * 100);
  const stopped = volts === 0;
  const forward = volts > 0;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="dc-volts" label="Voltage applied" display={`${volts.toFixed(1)} V`} value={volts} min={-6} max={6} step={0.5} onChange={setVolts} accent={accent} />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-4xl" style={{ display: 'inline-block', transform: forward ? 'none' : 'scaleX(-1)', opacity: stopped ? 0.3 : 1 }}>
          {stopped ? '⏸️' : '🔄'}
        </span>
        <div>
          <p className="text-xs text-slate-300">Motor speed</p>
          <p className="text-3xl font-black" style={{ color: stopped ? '#64748b' : accent }}>{speed}%</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-slate-300">Direction</p>
          <p className="text-sm font-black text-slate-100">{stopped ? 'STOPPED' : forward ? 'CLOCKWISE ↻' : 'REVERSE ↺'}</p>
        </div>
      </div>
      <p className="text-xs text-slate-300">
        {stopped ? 'No voltage, no spin. Push the slider either way.' : forward ? 'Positive voltage spins it one way. Drag below 0 to flip the wires!' : 'Polarity reversed — same motor, opposite spin. That is how robots back up.'}
      </p>
    </div>
  );
}

/* robotics-lesson-003 — Servo: an angle you command, a needle that obeys */
function ServoWidget({ accent }) {
  const [angle, setAngle] = useState(90);
  const pulse = Math.round(1000 + (angle / 180) * 1000);
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="servo-angle" label="Commanded angle" display={`${angle}°`} value={angle} min={0} max={180} onChange={setAngle} accent={accent} />
      <svg aria-hidden="true" viewBox="0 0 100 58" className="mx-auto w-full max-w-[220px]">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="50" x2="50" y2="16" stroke={accent} strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle - 90} 50 50)`} style={{ transition: 'transform 120ms' }} />
        <circle cx="50" cy="50" r="5" fill={accent} />
        <text x="8" y="57" fontSize="7" fill="#94a3b8">0°</text>
        <text x="46" y="8" fontSize="7" fill="#94a3b8">90°</text>
        <text x="82" y="57" fontSize="7" fill="#94a3b8">180°</text>
      </svg>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate-300">Servo holds position at</p>
          <p className="text-2xl font-black" style={{ color: accent }}>{angle}°</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-300">PWM pulse width</p>
          <p className="text-2xl font-black text-slate-100">{pulse} µs</p>
        </div>
      </div>
      <p className="text-xs text-slate-300">1000 µs pulses mean 0°, 2000 µs mean 180°. The servo reads the pulse and locks onto that exact angle.</p>
    </div>
  );
}

/* robotics-lesson-004 — Microcontroller: sensors in, decisions out */
const MCU_INPUTS = [
  { key: 'button', label: '🔘 Button pressed', rule: 'if (buttonPressed)', code: 'ledOn()', action: 'turn LED ON 💡' },
  { key: 'dark', label: '🌙 Room is dark', rule: 'if (light < 200)', code: 'lampOn()', action: 'switch lamp ON 🔆' },
  { key: 'obstacle', label: '🧱 Obstacle ahead', rule: 'if (distance < 20)', code: 'stopMotors()', action: 'STOP the motors 🛑' },
];

function MicrocontrollerWidget({ accent }) {
  const [picked, setPicked] = useState('button');
  const current = MCU_INPUTS.find((i) => i.key === picked);
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-xs text-slate-300">Feed the chip an input — watch it run your code:</p>
      <div className="flex flex-col gap-2">
        {MCU_INPUTS.map((i) => (
          <Btn key={i.key} active={picked === i.key} accent={accent} onClick={() => setPicked(i.key)}>{i.label}</Btn>
        ))}
      </div>
      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <p className="text-xs text-slate-400">Code running on the chip <span aria-hidden="true">🧠</span></p>
        <p className="font-mono text-sm text-slate-100">{current.rule} {'{'}</p>
        <p className="pl-4 font-mono text-sm" style={{ color: accent }}>{current.code};</p>
        <p className="font-mono text-sm text-slate-100">{'}'}</p>
      </div>
      <div>
        <p className="text-xs text-slate-300">Output fired</p>
        <p className="text-2xl font-black" style={{ color: accent }}>{current.action}</p>
      </div>
      <p className="text-xs text-slate-300">Input pin → your code decides → output pin. That loop is the whole job of a microcontroller.</p>
    </div>
  );
}

/* robotics-lesson-005 — Arduino: setup() once, loop() forever */
function ArduinoWidget({ accent }) {
  const [powered, setPowered] = useState(false);
  const [loops, setLoops] = useState(0);
  const ledOn = loops % 2 === 1;
  const powerOn = () => { setPowered(true); setLoops(0); };
  const powerOff = () => { setPowered(false); setLoops(0); };
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex gap-2">
        <Btn active={powered} accent={accent} onClick={powered ? powerOff : powerOn}>{powered ? '🔌 Power off (reset)' : '⚡ Power on'}</Btn>
        <Btn active={false} accent={accent} onClick={() => powered && setLoops((n) => n + 1)}>▶ Run loop()</Btn>
      </div>
      <div className="flex flex-col gap-1 rounded-xl p-3 font-mono text-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <p className={powered ? 'text-slate-100' : 'text-slate-500'}>
          setup() <span style={{ color: powered ? accent : undefined }}>{powered ? '✓ ran once at boot' : '· waiting for power'}</span>
        </p>
        <p className={powered ? 'text-slate-100' : 'text-slate-500'}>
          loop() <span style={{ color: powered && loops > 0 ? accent : undefined }}>{!powered ? '· waiting' : loops === 0 ? '· ready — tap Run loop()' : `× ${loops} — LED ${ledOn ? 'ON' : 'OFF'}`}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="inline-block h-6 w-6 rounded-full" style={{ background: accent, opacity: powered && ledOn ? 1 : 0.15, boxShadow: powered && ledOn ? `0 0 14px ${accent}` : 'none' }} />
        <p className="text-2xl font-black text-slate-100">{powered ? `loop() ran ${loops}×` : 'board is off'}</p>
      </div>
      <p className="text-xs text-slate-300">Every Arduino sketch: setup() runs once, then loop() repeats forever — here each pass blinks the LED.</p>
    </div>
  );
}

/* robotics-lesson-006 — PWM: duty cycle fakes analog power */
function PwmWidget({ accent }) {
  const [duty, setDuty] = useState(50);
  const d = duty / 2; // one period is 50 units wide, drawn twice
  const wave = `0,6 ${d},6 ${d},26 50,26 50,6 ${50 + d},6 ${50 + d},26 100,26`;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="pwm-duty" label="Duty cycle (ON time)" display={`${duty}%`} value={duty} min={0} max={100} onChange={setDuty} accent={accent} />
      <svg aria-hidden="true" viewBox="0 0 100 32" className="w-full rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <polyline points={wave} fill="none" stroke={accent} strokeWidth="2" />
      </svg>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden="true" className="inline-block h-8 w-8 rounded-full" style={{ background: accent, opacity: Math.max(0.06, duty / 100), boxShadow: duty > 5 ? `0 0 ${duty / 5}px ${accent}` : 'none' }} />
          <p className="text-xs text-slate-300">LED brightness</p>
        </div>
        <div>
          <p className="text-xs text-slate-300">Motor feels like it got</p>
          <p className="text-3xl font-black" style={{ color: accent }}>{duty}% power</p>
        </div>
      </div>
      <p className="text-xs text-slate-300">
        The pin is only ever fully ON or OFF — but switched thousands of times a second, {duty}% ON-time acts like {duty}% voltage.
      </p>
    </div>
  );
}

/* robotics-lesson-007 — Distance sensor: shout, listen for the echo */
function DistanceSensorWidget({ accent }) {
  const [dist, setDist] = useState(100);
  const echoUs = Math.round(dist * 58.3); // round trip at ~343 m/s
  const danger = dist < 20;
  const wallPos = 8 + (dist / 400) * 84;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="ds-dist" label="Distance to obstacle" display={`${dist} cm`} value={dist} min={2} max={400} onChange={setDist} accent={accent} />
      <svg aria-hidden="true" viewBox="0 0 100 20" className="w-full rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <text x="1" y="14" fontSize="9">🦇</text>
        <line x1="10" y1="10" x2={wallPos - 1} y2="10" stroke={danger ? '#f87171' : accent} strokeWidth="1.5" strokeDasharray="3 2" />
        <rect x={wallPos} y="3" width="4" height="14" rx="1" fill="#94a3b8" />
      </svg>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate-300">Echo comes back after</p>
          <p className="text-3xl font-black text-slate-100">{echoUs.toLocaleString('en-US')} µs</p>
        </div>
        <p className="text-2xl font-black" style={{ color: danger ? '#f87171' : accent }}>
          {danger ? '⚠️ OBSTACLE!' : 'path clear'}
        </p>
      </div>
      <p className="text-xs text-slate-300">
        Sound travels out and back at 343 m/s — the sensor just times the round trip. {danger ? 'Under 20 cm: the robot should react NOW.' : 'Slide under 20 cm to trip the obstacle alarm.'}
      </p>
    </div>
  );
}

/* robotics-lesson-008 — Raspberry Pi: which brain does the job need? */
const PI_TASKS = [
  { key: 'blink', label: '💡 Blink an LED', pi: false, why: 'One output pin and a loop — a tiny Arduino chip does this in its sleep.' },
  { key: 'face', label: '🙂 Recognize a face', pi: true, why: 'Camera images + AI vision need a full computer with real processing power.' },
  { key: 'video', label: '🎬 Play a video', pi: true, why: 'Decoding video needs an operating system, RAM, and a fast processor.' },
];

function RaspberryPiWidget({ accent }) {
  const [picked, setPicked] = useState('blink');
  const task = PI_TASKS.find((t) => t.key === picked);
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-xs text-slate-300">Pick a job for your robot:</p>
      <div className="flex flex-col gap-2">
        {PI_TASKS.map((t) => (
          <Btn key={t.key} active={picked === t.key} accent={accent} onClick={() => setPicked(t.key)}>{t.label}</Btn>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl">{task.pi ? '🍓' : '🔌'}</span>
        <div>
          <p className="text-xs text-slate-300">Verdict</p>
          <p className="text-2xl font-black" style={{ color: accent }}>{task.pi ? 'Needs a Raspberry Pi' : 'Arduino is enough'}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">{task.why}</p>
      <p className="text-xs text-slate-400">Rule of thumb: simple in/out → Arduino. Seeing, thinking, internet → Pi. Big robots often use both.</p>
    </div>
  );
}

/* robotics-lesson-009 — Behavior: the sense → decide → act loop, live */
function BehaviorWidget({ accent }) {
  const [dist, setDist] = useState(60);
  const blocked = dist < 20;
  const color = blocked ? '#f87171' : accent;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="bh-dist" label="What the sensor sees" display={`${dist} cm`} value={dist} min={2} max={100} onChange={setDist} accent={accent} />
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-slate-400">SENSE <span aria-hidden="true">👀</span></p>
          <p className="text-sm font-black text-slate-100">{dist} cm</p>
        </div>
        <div className="rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-slate-400">DECIDE <span aria-hidden="true">🧠</span></p>
          <p className="font-mono text-xs font-bold text-slate-100">{blocked ? 'dist < 20 ✓' : 'dist < 20 ✗'}</p>
        </div>
        <div className="rounded-xl p-2" style={{ background: `${color}22` }}>
          <p className="text-xs text-slate-400">ACT <span aria-hidden="true">⚙️</span></p>
          <p className="text-sm font-black" style={{ color }}>{blocked ? 'STOP+TURN' : 'GO'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl">{blocked ? '🛑' : '🤖💨'}</span>
        <p className="text-2xl font-black" style={{ color }}>{blocked ? 'Rule fired: stop, turn right' : 'No rule fired: drive forward'}</p>
      </div>
      <p className="text-xs text-slate-300">One if-then rule, checked many times a second, and the robot never hits a wall. That is robot behavior.</p>
    </div>
  );
}

/* robotics-lesson-010 — Power system: one battery, three hungry parts */
function PowerSystemWidget({ accent }) {
  const [volts, setVolts] = useState(7.5);
  const parts = [
    volts >= 6
      ? { name: '⚙️ Motors (want 6V+)', mark: '✓', color: accent, note: 'full torque, straight off the battery' }
      : volts >= 4
        ? { name: '⚙️ Motors (want 6V+)', mark: '⚠', color: '#fbbf24', note: 'sluggish — not enough voltage' }
        : { name: '⚙️ Motors (want 6V+)', mark: '✗', color: '#f87171', note: 'too weak, wheels barely move' },
    volts >= 6.5
      ? { name: '🧠 Arduino (needs 5V)', mark: '✓', color: accent, note: 'regulator steps it down to a clean 5V' }
      : volts >= 5
        ? { name: '🧠 Arduino (needs 5V)', mark: '⚠', color: '#fbbf24', note: 'regulator has no headroom — flaky' }
        : { name: '🧠 Arduino (needs 5V)', mark: '✗', color: '#f87171', note: 'brownout! the brain keeps resetting' },
    volts >= 6.5
      ? { name: '📡 Sensor (needs 5V)', mark: '✓', color: accent, note: 'steady readings on the 5V rail' }
      : { name: '📡 Sensor (needs 5V)', mark: '✗', color: '#f87171', note: 'noisy 5V rail — garbage readings' },
  ];
  const happy = parts.filter((p) => p.mark === '✓').length;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="pw-volts" label="Battery voltage" display={`${volts.toFixed(1)} V`} value={volts} min={3} max={12} step={0.5} onChange={setVolts} accent={accent} />
      <p className="text-2xl font-black" style={{ color: happy === 3 ? accent : happy >= 2 ? '#fbbf24' : '#f87171' }}>
        {happy}/3 parts happy {happy === 3 ? '— robot runs great!' : happy >= 2 ? '— it will act weird' : '— nothing works right'}
      </p>
      <ul className="flex flex-col gap-2">
        {parts.map((p) => (
          <li key={p.name} className="flex items-start gap-2 rounded-xl p-2 text-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="font-black" style={{ color: p.color }}>{p.mark}</span>
            <span className="text-slate-100 font-bold">{p.name}</span>
            <span className="ml-auto text-right text-xs text-slate-300">{p.note}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-300">Around 7.4V (a 2-cell LiPo) everyone is happy: motors drink it raw, a regulator serves the 5V parts.</p>
    </div>
  );
}

export default {
  'robotics-lesson-001': MotorDriverWidget,
  'robotics-lesson-002': DcMotorWidget,
  'robotics-lesson-003': ServoWidget,
  'robotics-lesson-004': MicrocontrollerWidget,
  'robotics-lesson-005': ArduinoWidget,
  'robotics-lesson-006': PwmWidget,
  'robotics-lesson-007': DistanceSensorWidget,
  'robotics-lesson-008': RaspberryPiWidget,
  'robotics-lesson-009': BehaviorWidget,
  'robotics-lesson-010': PowerSystemWidget,
};
