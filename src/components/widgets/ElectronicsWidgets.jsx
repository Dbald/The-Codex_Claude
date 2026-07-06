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

function ModeBtn({ active, accent, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] flex-1 rounded-xl px-3 text-sm font-bold transition-colors"
      style={active ? { background: accent, color: '#111118' } : { background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}
    >
      {children}
    </button>
  );
}

/* electronics-lesson-001 — Voltage: pick a power source, feel the pressure */
const SOURCES = [
  { label: 'AA battery', volts: 1.5, desc: 'A gentle push — enough for remotes and small toys.' },
  { label: '9V battery', volts: 9, desc: 'A firm push — 6× stronger than an AA. Powers smoke alarms.' },
  { label: 'Wall outlet', volts: 120, desc: 'A massive push — 80× an AA. Powers appliances. Never touch!' },
];

function VoltageWidget({ accent }) {
  const [pick, setPick] = useState(0);
  const src = SOURCES[pick];
  const pct = Math.max(6, (Math.log10(src.volts) / Math.log10(120)) * 100);
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-xs text-slate-300">Pick a power source</p>
      <div className="flex w-full gap-2">
        {SOURCES.map((s, i) => (
          <ModeBtn key={s.label} active={i === pick} accent={accent} onClick={() => setPick(i)}>
            {s.label}
          </ModeBtn>
        ))}
      </div>
      <div>
        <p className="text-xs text-slate-300">Electrical pressure</p>
        <p className="text-3xl font-black" style={{ color: src.volts > 50 ? '#f87171' : accent }}>{src.volts} V</p>
      </div>
      <div aria-hidden="true" className="h-4 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: src.volts > 50 ? '#f87171' : accent, transition: 'width 200ms' }} />
      </div>
      <p className="text-sm text-slate-300">{src.desc}</p>
    </div>
  );
}

/* electronics-lesson-002 — Current: more push, more electrons flowing */
function CurrentWidget({ accent }) {
  const [volts, setVolts] = useState(5);
  const mA = volts * 10; // fixed 100 Ω resistance
  const dots = Math.max(1, Math.round(mA / 10));
  const pace = mA < 40 ? 'a slow drift' : mA < 80 ? 'a steady flow' : 'a fast rush';
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="cur-v" label="Voltage (push)" display={`${volts} V`} value={volts} min={1} max={12} step={0.5} onChange={setVolts} accent={accent} />
      <p className="text-xs text-slate-300">Through a fixed 100 Ω wire, that push moves</p>
      <p className="text-3xl font-black" style={{ color: accent }}>{Math.round(mA)} mA</p>
      <div aria-hidden="true" className="flex min-h-[16px] items-center gap-1.5">
        {Array.from({ length: dots }).map((_, i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
        ))}
      </div>
      <p className="text-sm text-slate-300">
        Electrons are moving past in <span className="font-bold text-slate-100">{pace}</span>. Drag the push up and watch the flow grow.
      </p>
    </div>
  );
}

/* electronics-lesson-003 — Resistance: the pinch that narrows the flow */
function ResistanceWidget({ accent }) {
  const [ohms, setOhms] = useState(470);
  const mA = 9000 / ohms; // fixed 9 V battery
  const pct = Math.max(3, (mA / 90) * 100);
  const rLabel = ohms >= 1000 ? `${(ohms / 1000).toFixed(1)} kΩ` : `${ohms} Ω`;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="res-r" label="Resistance (the pinch)" display={rLabel} value={ohms} min={100} max={10000} step={100} onChange={setOhms} accent={accent} />
      <p className="text-xs text-slate-300">Current from a fixed 9 V battery</p>
      <p className="text-3xl font-black" style={{ color: accent }}>{mA.toFixed(1)} mA</p>
      <div aria-hidden="true" className="h-5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent, transition: 'width 150ms' }} />
      </div>
      <p className="text-sm text-slate-300">
        {ohms <= 300
          ? 'Barely any pinch — current gushes through.'
          : ohms <= 2000
            ? 'A sensible pinch — this is the range that keeps LEDs alive.'
            : 'A hard pinch — only a trickle gets past.'}
      </p>
    </div>
  );
}

/* electronics-lesson-004 — Ohm's Law: I = V / R, live */
function OhmsLawWidget({ accent }) {
  const [volts, setVolts] = useState(9);
  const [ohms, setOhms] = useState(470);
  const mA = (volts / ohms) * 1000;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="ohm-v" label="Voltage V" display={`${volts} V`} value={volts} min={1} max={24} step={0.5} onChange={setVolts} accent={accent} />
      <Slider id="ohm-r" label="Resistance R" display={`${ohms} Ω`} value={ohms} min={50} max={2000} step={10} onChange={setOhms} accent={accent} />
      <div className="rounded-xl px-3 py-2 font-mono text-sm text-slate-300" style={{ background: 'rgba(255,255,255,0.06)' }}>
        I = V / R = {volts} / {ohms}
      </div>
      <div>
        <p className="text-xs text-slate-300">Current I</p>
        <p className="text-3xl font-black" style={{ color: accent }}>{mA.toFixed(1)} mA</p>
      </div>
      <p className="text-sm text-slate-300">
        {mA <= 25
          ? 'Gentle — safe for a small LED.'
          : mA <= 100
            ? 'Moderate — fine for motors and bigger loads.'
            : 'Heavy flow — small components would cook at this level.'}
      </p>
    </div>
  );
}

/* electronics-lesson-005 — Circuit: close the loop, light the LED */
function CircuitWidget({ accent }) {
  const [closed, setClosed] = useState(false);
  const wire = closed ? accent : '#475569';
  return (
    <div className="flex w-full flex-col gap-3">
      <svg aria-hidden="true" viewBox="0 0 220 110" className="w-full max-w-[280px] self-center">
        {/* loop wires with a gap at the top for the switch */}
        <path d="M85 20 H20 V90 H200 V20 H120" fill="none" stroke={wire} strokeWidth="4" strokeLinecap="round" />
        {/* switch lever */}
        {closed ? (
          <line x1="85" y1="20" x2="120" y2="20" stroke={wire} strokeWidth="4" strokeLinecap="round" />
        ) : (
          <line x1="85" y1="20" x2="115" y2="4" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        )}
        {/* battery on the left side */}
        <line x1="8" y1="45" x2="32" y2="45" stroke={wire} strokeWidth="5" />
        <line x1="14" y1="60" x2="26" y2="60" stroke={wire} strokeWidth="5" />
        {/* LED at the bottom */}
        <circle cx="110" cy="90" r="13" fill={closed ? '#fbbf24' : '#1e293b'} stroke={wire} strokeWidth="3" />
        {closed && <circle cx="110" cy="90" r="20" fill="#fbbf24" opacity="0.25" />}
      </svg>
      <button
        type="button"
        onClick={() => setClosed((c) => !c)}
        className="min-h-[44px] w-full rounded-xl px-3 text-sm font-bold transition-colors"
        style={closed ? { background: accent, color: '#111118' } : { background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}
      >
        {closed ? 'Switch: ON — tap to open the loop' : 'Switch: OFF — tap to close the loop'}
      </button>
      <p className="text-2xl font-black" style={{ color: closed ? accent : '#f87171' }}>
        {closed ? 'Current flows' : 'Current stopped'}
      </p>
      <p className="text-sm text-slate-300">
        {closed
          ? 'The loop is complete: battery → switch → LED → back to battery. The LED lights up.'
          : 'The loop is broken at the switch, so no current can travel anywhere — the LED stays dark.'}
      </p>
    </div>
  );
}

/* electronics-lesson-006 — Breadboard: holes in the same row are connected */
function BreadboardWidget({ accent }) {
  const [sameRow, setSameRow] = useState(true);
  const lit = sameRow;
  const cols = [30, 70, 110, 150, 190];
  const rows = [24, 52, 80];
  const legY = sameRow ? 24 : 52;
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-xs text-slate-300">Where do you plug the LED leg?</p>
      <div className="flex w-full gap-2">
        <ModeBtn active={sameRow} accent={accent} onClick={() => setSameRow(true)}>Same row as power</ModeBtn>
        <ModeBtn active={!sameRow} accent={accent} onClick={() => setSameRow(false)}>Different row</ModeBtn>
      </div>
      <svg aria-hidden="true" viewBox="0 0 220 104" className="w-full max-w-[280px] self-center rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {/* hidden metal strip under row 1 */}
        <rect x="18" y="14" width="184" height="20" rx="10" fill={accent} opacity={lit ? 0.3 : 0.15} />
        {rows.map((y) =>
          cols.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />)
        )}
        {/* battery wire plugged into row 1, column 1 */}
        <circle cx="30" cy="24" r="6" fill="#f87171" />
        {/* LED leg */}
        <circle cx="150" cy={legY} r="6" fill={lit ? '#fbbf24' : '#94a3b8'} />
      </svg>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl" style={{ opacity: lit ? 1 : 0.25 }}>💡</span>
        <p className="text-2xl font-black" style={{ color: lit ? accent : '#f87171' }}>{lit ? 'LED lights up' : 'LED stays dark'}</p>
      </div>
      <p className="text-sm text-slate-300">
        {lit
          ? 'A metal strip under the board connects every hole in a row — power reaches the LED.'
          : 'Different rows are separate strips. No connection, no current, no light.'}
      </p>
    </div>
  );
}

/* electronics-lesson-007 — LEDs: pick the resistor, don't fry the light */
function LedWidget({ accent }) {
  const [volts, setVolts] = useState(5);
  const neededR = volts > 2 ? Math.round((volts - 2) / 0.02) : 0;
  const mA = volts > 2 ? ((volts - 2) / 150) * 1000 : 0; // fixed 150 Ω fitted
  const fried = mA > 30;
  const dark = volts < 2.5;
  const glow = fried || dark ? 0 : Math.min(1, mA / 20);
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="led-v" label="Supply voltage" display={`${volts} V`} value={volts} min={0} max={15} step={0.5} onChange={setVolts} accent={accent} />
      <div>
        <p className="text-xs text-slate-300">Resistor needed for a safe 20 mA: R = (V − 2) / 0.02</p>
        <p className="text-2xl font-black" style={{ color: accent }}>{volts > 2 ? `${neededR} Ω` : '—'}</p>
      </div>
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-block h-10 w-10 rounded-full"
          style={{
            background: fried ? '#334155' : `rgba(239,68,68,${0.15 + glow * 0.85})`,
            boxShadow: glow > 0 ? `0 0 ${Math.round(glow * 24)}px rgba(239,68,68,${glow * 0.8})` : 'none',
          }}
        />
        <div>
          <p className="text-xs text-slate-300">Current with the fitted 150 Ω resistor</p>
          <p className="text-2xl font-black" style={{ color: fried ? '#f87171' : accent }}>{mA.toFixed(0)} mA</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">
        {dark
          ? 'Below about 2.5 V the LED can’t switch on — it stays dark.'
          : fried
            ? `Fried! ${mA.toFixed(0)} mA is way over the 20 mA limit. This voltage needs a bigger resistor (${neededR} Ω).`
            : 'Glowing safely — the resistor is soaking up the extra voltage.'}
      </p>
    </div>
  );
}

/* electronics-lesson-008 — Multimeter: one tool, three measurements */
const MODES = [
  { key: 'V', reading: '9.06', unit: 'V', name: 'Voltage', what: 'How hard the electricity is pushing between the two probes.', sample: 'Probes across a 9V battery — it reads slightly above 9 when fresh.' },
  { key: 'A', reading: '0.019', unit: 'A', name: 'Current', what: 'How much electricity is flowing through the circuit.', sample: 'In line with an LED circuit — 0.019 A is 19 mA, a healthy LED current.' },
  { key: 'Ω', reading: '467', unit: 'Ω', name: 'Resistance', what: 'How much the part between the probes resists the flow.', sample: 'Probes on a "470 Ω" resistor — real parts read a little off their label.' },
];

function MultimeterWidget({ accent }) {
  const [mode, setMode] = useState(0);
  const m = MODES[mode];
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-xs text-slate-300">Turn the dial — what do you want to measure?</p>
      <div className="flex w-full gap-2">
        {MODES.map((x, i) => (
          <ModeBtn key={x.key} active={i === mode} accent={accent} onClick={() => setMode(i)}>
            {x.key}
          </ModeBtn>
        ))}
      </div>
      <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <p className="text-xs text-slate-300">{m.name}</p>
        <p className="font-mono text-3xl font-black" style={{ color: accent }}>
          {m.reading} <span className="text-xl">{m.unit}</span>
        </p>
      </div>
      <p className="text-sm text-slate-300">
        <span className="font-bold text-slate-100">{m.name} mode:</span> {m.what}
      </p>
      <p className="text-xs text-slate-300">{m.sample}</p>
    </div>
  );
}

/* electronics-lesson-009 — Series vs parallel: break a bulb, see what survives */
function SeriesParallelWidget({ accent }) {
  const [parallel, setParallel] = useState(false);
  const [broken, setBroken] = useState(false);
  const bulb1 = !broken;
  const bulb2 = parallel || !broken;
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full gap-2">
        <ModeBtn active={!parallel} accent={accent} onClick={() => setParallel(false)}>Series (one chain)</ModeBtn>
        <ModeBtn active={parallel} accent={accent} onClick={() => setParallel(true)}>Parallel (own lanes)</ModeBtn>
      </div>
      <div aria-hidden="true" className={`flex items-center justify-center rounded-xl py-4 ${parallel ? 'flex-col gap-3' : 'flex-row gap-6'}`} style={{ background: 'rgba(255,255,255,0.05)' }}>
        <span className="text-4xl" style={{ opacity: bulb1 ? 1 : 0.9 }}>{broken ? '💥' : '💡'}</span>
        {!parallel && <span className="text-lg text-slate-500">—</span>}
        <span className="text-4xl" style={{ opacity: bulb2 ? 1 : 0.25 }}>💡</span>
      </div>
      <button
        type="button"
        onClick={() => setBroken((b) => !b)}
        className="min-h-[44px] w-full rounded-xl px-3 text-sm font-bold"
        style={broken ? { background: accent, color: '#111118' } : { background: 'rgba(248,113,113,0.15)', color: '#f87171' }}
      >
        {broken ? 'Replace bulb 1' : 'Break bulb 1'}
      </button>
      <p className="text-2xl font-black" style={{ color: bulb2 ? accent : '#f87171' }}>
        {broken ? (bulb2 ? 'Bulb 2 stays lit!' : 'Bulb 2 goes dark too') : 'Both bulbs lit'}
      </p>
      <p className="text-sm text-slate-300">
        {parallel
          ? 'Each bulb has its own lane to the battery, so one failure never blocks the other.'
          : broken
            ? 'The chain is cut — current can’t reach bulb 2 either. This is why one dead bulb killed old string lights.'
            : 'One single loop: the same current runs through both bulbs. Try breaking bulb 1.'}
      </p>
    </div>
  );
}

/* electronics-lesson-010 — Sensors: temperature in, millivolts out, fan reacts */
function SensorWidget({ accent }) {
  const [temp, setTemp] = useState(22);
  const mV = temp * 10; // LM35: 10 mV per °C
  const fanOn = temp > 28;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="sen-t" label="Room temperature" display={`${temp}°C`} value={temp} min={10} max={40} step={1} onChange={setTemp} accent={accent} />
      <div>
        <p className="text-xs text-slate-300">Sensor output (10 mV per °C, like an LM35)</p>
        <p className="text-3xl font-black" style={{ color: accent }}>{mV} mV</p>
      </div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl" style={{ opacity: fanOn ? 1 : 0.25 }}>🌀</span>
        <p className="text-2xl font-black" style={{ color: fanOn ? accent : '#64748b' }}>Fan {fanOn ? 'ON' : 'OFF'}</p>
      </div>
      <p className="text-sm text-slate-300">
        The circuit’s rule: switch the fan on above 28°C ({'>'}280 mV).{' '}
        {fanOn
          ? 'The sensor’s signal crossed the line, so the fan is spinning.'
          : `Still ${28 - temp}°C below the trigger point — drag the room warmer.`}
      </p>
    </div>
  );
}

export default {
  'electronics-lesson-001': VoltageWidget,
  'electronics-lesson-002': CurrentWidget,
  'electronics-lesson-003': ResistanceWidget,
  'electronics-lesson-004': OhmsLawWidget,
  'electronics-lesson-005': CircuitWidget,
  'electronics-lesson-006': BreadboardWidget,
  'electronics-lesson-007': LedWidget,
  'electronics-lesson-008': MultimeterWidget,
  'electronics-lesson-009': SeriesParallelWidget,
  'electronics-lesson-010': SensorWidget,
};
