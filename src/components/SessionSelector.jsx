import { useState } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';

const DURATIONS = [
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: '20 min', value: 20 },
  { label: 'Deep session', value: 60 },
];

const CHANNELS = ['Finance', 'Electronics', 'Robotics', 'Mixed'];

const MODES = [
  { value: 'watch', label: '▶ Watch', hint: 'Full-screen videos + cards' },
  { value: 'read', label: '📖 Read', hint: 'Scrollable card feed' },
];

export default function SessionSelector({ onStart, onBack }) {
  const [duration, setDuration] = useState(10);
  const [channel, setChannel] = useState('Mixed');
  const [mode, setMode] = useState('watch');

  function handleStart() {
    onStart({ duration, channel, mode });
  }

  return (
    <div className="flex flex-col min-h-full px-5 py-6 max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 text-sm mb-6 hover:text-slate-300 transition-colors w-fit"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-black text-white mb-1">Set your intention.</h1>
      <p className="text-slate-500 text-sm mb-8">Instagram doesn’t ask you why you’re opening it. The Codex does.</p>

      <div className="mb-8">
        <p id="mode-label" className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">How do you want to learn?</p>
        <div role="group" aria-labelledby="mode-label" className="grid grid-cols-2 gap-3">
          {MODES.map(m => {
            const active = mode === m.value;
            return (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                aria-pressed={active}
                className="rounded-xl px-3 py-3 text-left transition-all duration-200 border"
                style={{
                  minHeight: 64,
                  background: active ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.03)',
                  borderColor: active ? '#a78bfa' : 'rgba(255,255,255,0.08)',
                  color: active ? '#a78bfa' : 'var(--muted)',
                }}
              >
                <div className="text-sm font-bold">{m.label}</div>
                <div className="text-xs opacity-75 font-normal mt-0.5">{m.hint}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">How long are you learning?</p>
        <div className="grid grid-cols-2 gap-3">
          {DURATIONS.map(d => (
            <button
              key={d.value}
              onClick={() => setDuration(d.value)}
              className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 border"
              style={{
                background: duration === d.value ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.03)',
                borderColor: duration === d.value ? '#a78bfa' : 'rgba(255,255,255,0.08)',
                color: duration === d.value ? '#a78bfa' : 'var(--muted)',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">What are you learning?</p>
        <div className="flex flex-col gap-2.5">
          {CHANNELS.map(ch => {
            const config = ch === 'Mixed' ? null : CHANNEL_CONFIG[ch];
            const isSelected = channel === ch;
            return (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 border text-left"
                style={{
                  background: isSelected
                    ? (config ? config.accentLight : 'rgba(167,139,250,0.12)')
                    : 'rgba(255,255,255,0.03)',
                  borderColor: isSelected
                    ? (config ? config.accent : '#a78bfa')
                    : 'rgba(255,255,255,0.08)',
                  color: isSelected
                    ? (config ? config.accent : '#a78bfa')
                    : 'var(--muted)',
                }}
              >
                <span className="text-lg">{config ? config.icon : '✦'}</span>
                <div>
                  <div className="font-bold">{ch === 'Mixed' ? 'Mixed Growth Feed' : ch}</div>
                  {config && <div className="text-xs opacity-70 font-normal">{config.description}</div>}
                  {ch === 'Mixed' && <div className="text-xs opacity-70 font-normal">Finance + Electronics + Robotics</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full py-4 rounded-2xl text-base font-black text-white tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
      >
        Start Learning →
      </button>
    </div>
  );
}
