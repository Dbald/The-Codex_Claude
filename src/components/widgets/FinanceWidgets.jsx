import { useState, useRef, useEffect } from 'react';

const fmt = (n) => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');

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

/* finance-lesson-001 — Equity: what's yours after what you owe */
function EquityWidget({ accent }) {
  const [worth, setWorth] = useState(300000);
  const [owe, setOwe] = useState(200000);
  const equity = worth - owe;
  const ownedPct = worth > 0 ? Math.max(0, Math.min(100, (equity / worth) * 100)) : 0;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="eq-worth" label="What it's worth" display={fmt(worth)} value={worth} min={0} max={500000} step={5000} onChange={setWorth} accent={accent} />
      <Slider id="eq-owe" label="What you owe" display={fmt(owe)} value={owe} min={0} max={500000} step={5000} onChange={setOwe} accent={accent} />
      <div>
        <p className="text-xs text-slate-300">Your equity — the part that's truly yours</p>
        <p className="text-3xl font-black" style={{ color: equity >= 0 ? accent : '#f87171' }}>{fmt(equity)}</p>
      </div>
      <div aria-hidden="true" className="flex h-3 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full" style={{ width: `${ownedPct}%`, background: accent }} />
        <div className="h-full" style={{ width: `${100 - ownedPct}%`, background: '#f87171' }} />
      </div>
      <p className="text-xs text-slate-300">
        {Math.round(ownedPct)}% yours · {Math.round(100 - ownedPct)}% still owed
      </p>
    </div>
  );
}

/* finance-lesson-002 — Net worth: your financial scoreboard */
function NetWorthWidget({ accent }) {
  const [assets, setAssets] = useState(8000);
  const [debts, setDebts] = useState(3000);
  const netWorth = assets - debts;
  const winning = netWorth >= 0;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="nw-assets" label="Everything you own (assets)" display={fmt(assets)} value={assets} min={0} max={50000} step={500} onChange={setAssets} accent={accent} />
      <Slider id="nw-debts" label="Everything you owe (debts)" display={fmt(debts)} value={debts} min={0} max={50000} step={500} onChange={setDebts} accent={accent} />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl">{winning ? '🏆' : '🚨'}</span>
        <div>
          <p className="text-xs text-slate-300">Your net worth score</p>
          <p className="text-3xl font-black" style={{ color: winning ? accent : '#f87171' }}>{fmt(netWorth)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-300">
        {winning ? 'Positive score — you own more than you owe. Keep it growing!' : 'Negative score — debts outweigh assets right now. Shrink the debt slider to flip it.'}
      </p>
    </div>
  );
}

/* finance-lesson-003 — Cash flow: money in vs money out */
function CashFlowWidget({ accent }) {
  const [income, setIncome] = useState(4000);
  const [spending, setSpending] = useState(3500);
  const flow = income - spending;
  const positive = flow >= 0;
  const fillPct = Math.max(0, Math.min(100, 50 + (flow / 4000) * 50));
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="cf-in" label="Money in per month" display={fmt(income)} value={income} min={0} max={10000} step={100} onChange={setIncome} accent={accent} />
      <Slider id="cf-out" label="Money out per month" display={fmt(spending)} value={spending} min={0} max={10000} step={100} onChange={setSpending} accent={accent} />
      <div className="flex items-end gap-3">
        <span aria-hidden="true" className="text-3xl">🛁</span>
        <div>
          <p className="text-xs text-slate-300">Monthly cash flow</p>
          <p className="text-3xl font-black" style={{ color: positive ? accent : '#f87171' }}>
            {positive ? '+' : ''}{fmt(flow)}
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="h-3 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full" style={{ width: `${fillPct}%`, background: positive ? accent : '#f87171', transition: 'width 150ms' }} />
      </div>
      <p className="text-sm text-slate-300">
        Over a year that's{' '}
        <span className="font-black" style={{ color: positive ? accent : '#f87171' }}>{positive ? '+' : ''}{fmt(flow * 12)}</span>{' '}
        {positive ? 'flowing into your tub.' : 'draining out of your tub.'}
      </p>
    </div>
  );
}

/* finance-lesson-004 — Assets vs liabilities: tap-to-sort game */
const SORT_ITEMS = [
  { name: 'Rental property', emoji: '🏠', type: 'asset' },
  { name: 'Car loan', emoji: '🚗', type: 'liability' },
  { name: 'Stocks', emoji: '📈', type: 'asset' },
  { name: 'Credit card debt', emoji: '💳', type: 'liability' },
];

function AssetSortWidget({ accent }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Does it put money IN your pocket, or take it OUT?');
  const playAgainRef = useRef(null);
  const done = index >= SORT_ITEMS.length;
  const item = SORT_ITEMS[index];

  // Answering the last item unmounts the focused Asset/Liability button —
  // move keyboard focus to Play again instead of letting it drop to <body>.
  useEffect(() => {
    if (done) playAgainRef.current?.focus();
  }, [done]);

  const pick = (choice) => {
    if (done) return;
    const right = choice === item.type;
    const label = item.type === 'asset' ? 'an ASSET — it pays you' : 'a LIABILITY — it costs you';
    setFeedback(`${right ? 'Correct!' : 'Not quite.'} ${item.name} is ${label}.`);
    if (right) setScore(score + 1);
    setIndex(index + 1);
  };

  const btnStyle = { minHeight: '44px', background: 'rgba(255,255,255,0.06)', border: `2px solid ${accent}`, color: accent };
  return (
    <div className="flex w-full flex-col gap-3">
      {!done ? (
        <>
          <p className="text-center text-2xl font-black text-slate-100">
            <span aria-hidden="true">{item.emoji} </span>{item.name}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => pick('asset')} className="flex-1 rounded-xl px-4 text-sm font-bold" style={btnStyle}>
              Asset
            </button>
            <button type="button" onClick={() => pick('liability')} className="flex-1 rounded-xl px-4 text-sm font-bold" style={btnStyle}>
              Liability
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          ref={playAgainRef}
          onClick={() => { setIndex(0); setScore(0); setFeedback('Does it put money IN your pocket, or take it OUT?'); }}
          className="w-full rounded-xl px-4 text-sm font-bold"
          style={{ minHeight: '44px', background: accent, color: '#111118' }}
        >
          Play again
        </button>
      )}
      {/* Persistent live region so screen readers hear each result */}
      <div aria-live="polite">
        {done && (
          <p className="text-center text-3xl font-black" style={{ color: accent }}>
            {score} / {SORT_ITEMS.length} sorted right {score === SORT_ITEMS.length ? '🎉' : ''}
          </p>
        )}
        <p className="text-xs text-slate-300">{feedback}</p>
      </div>
      {!done && <p className="text-xs font-bold text-slate-100">Score: {score} · Item {index + 1} of {SORT_ITEMS.length}</p>}
    </div>
  );
}

/* finance-lesson-005 — Stocks: own a slice, grow with the company */
function StocksWidget({ accent }) {
  const [shares, setShares] = useState(10);
  const [growth, setGrowth] = useState(20);
  const price = 10;
  const invested = shares * price;
  const gain = invested * (growth / 100);
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="st-shares" label="Shares you own ($10 each)" display={`${shares}`} value={shares} min={1} max={100} onChange={setShares} accent={accent} />
      <Slider id="st-growth" label="Company grows by" display={`${growth}%`} value={growth} min={0} max={100} onChange={setGrowth} accent={accent} />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl" style={{ opacity: 0.4 + (growth / 100) * 0.6 }}>🍕</span>
        <div>
          <p className="text-xs text-slate-300">Your slice grew by</p>
          <p className="text-3xl font-black" style={{ color: accent }}>+{fmt(gain)}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">
        You put in <span className="font-bold text-slate-100">{fmt(invested)}</span> — now it's worth{' '}
        <span className="font-bold" style={{ color: accent }}>{fmt(invested + gain)}</span>. When the company wins, every owner wins.
      </p>
    </div>
  );
}

/* finance-lesson-006 — ETFs: diversification shrinks risk */
function EtfWidget({ accent }) {
  const [companies, setCompanies] = useState(1);
  const risk = Math.round(100 / Math.sqrt(companies));
  const riskColor = risk > 60 ? '#f87171' : risk > 25 ? '#fbbf24' : accent;
  const angle = -90 + risk * 1.8;
  const verdict = risk > 60 ? 'All eggs in one basket!' : risk > 25 ? 'Getting safer…' : 'Nicely diversified — one bad company barely dents you.';
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="etf-n" label="Companies you own a piece of" display={`${companies}`} value={companies} min={1} max={500} onChange={setCompanies} accent={accent} />
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 100 58" className="w-28 shrink-0" aria-hidden="true">
          <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="16" stroke={riskColor} strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 50 50)`} />
          <circle cx="50" cy="50" r="4" fill={riskColor} />
        </svg>
        <div>
          <p className="text-xs text-slate-300">Risk from any one company failing</p>
          <p className="text-3xl font-black" style={{ color: riskColor }}>{risk}%</p>
        </div>
      </div>
      <div aria-hidden="true" className="h-3 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full" style={{ width: `${risk}%`, background: riskColor, transition: 'width 150ms' }} />
      </div>
      <p className="text-xs text-slate-300">{verdict}</p>
    </div>
  );
}

/* finance-lesson-007 — Compound interest: the snowball */
function CompoundWidget({ accent }) {
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(10);
  const r = 0.08;
  const futureValue = monthly * 12 * ((Math.pow(1 + r, years) - 1) / r);
  const mattress = monthly * 12 * years;
  const snowSize = Math.min(64, 16 + Math.sqrt(futureValue) / 25);
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="ci-monthly" label="You invest each month" display={fmt(monthly)} value={monthly} min={10} max={500} step={10} onChange={setMonthly} accent={accent} />
      <Slider id="ci-years" label={`Years: ${years}`} display={`${years}`} value={years} min={1} max={40} onChange={setYears} accent={accent} />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" style={{ fontSize: `${snowSize}px`, lineHeight: 1 }}>⛄</span>
        <div>
          <p className="text-xs text-slate-300">Snowball at 8% per year</p>
          <p className="text-3xl font-black" style={{ color: accent }}>{fmt(futureValue)}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">
        Under the mattress it'd be just <span className="font-bold text-slate-100">{fmt(mattress)}</span>. Compounding earned you an extra{' '}
        <span className="font-bold" style={{ color: accent }}>{fmt(futureValue - mattress)}</span> — drag the years slider to watch time do the heavy lifting.
      </p>
    </div>
  );
}

/* finance-lesson-008 — Income vs wealth: it's what you keep */
function IncomeWealthWidget({ accent }) {
  const [income, setIncome] = useState(5000);
  const [keepPct, setKeepPct] = useState(10);
  const monthlyKept = income * (keepPct / 100);
  const r = 0.08;
  const wealth = monthlyKept * 12 * ((Math.pow(1 + r, 10) - 1) / r);
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="iw-income" label="Monthly income" display={fmt(income)} value={income} min={2000} max={15000} step={250} onChange={setIncome} accent={accent} />
      <Slider id="iw-keep" label="Slice of income you keep and invest" display={`${keepPct}%`} value={keepPct} min={0} max={50} onChange={setKeepPct} accent={accent} />
      <div>
        <p className="text-xs text-slate-300">Wealth after 10 years (invested at 8%)</p>
        <p className="text-3xl font-black" style={{ color: keepPct === 0 ? '#f87171' : accent }}>{fmt(wealth)}</p>
      </div>
      <p className="text-sm text-slate-300">
        {keepPct === 0
          ? 'A big income with a leaky bucket builds zero wealth. Slide the keep-slice up!'
          : <>That's {fmt(monthlyKept)} a month put to work. Doubling what you keep beats doubling what you earn.</>}
      </p>
    </div>
  );
}

/* finance-lesson-009 — 50/30/20: three jars, one plan */
function BudgetRuleWidget({ accent }) {
  const [pay, setPay] = useState(3000);
  const buckets = [
    { name: 'Needs', pct: 50, emoji: '🏠', color: accent },
    { name: 'Wants', pct: 30, emoji: '🎉', color: '#60a5fa' },
    { name: 'Savings', pct: 20, emoji: '🌱', color: '#fbbf24' },
  ];
  const maxBar = 10000 * 0.5;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="br-pay" label="Monthly take-home pay" display={fmt(pay)} value={pay} min={1000} max={10000} step={100} onChange={setPay} accent={accent} />
      <div className="flex flex-col gap-2">
        {buckets.map((b) => {
          const amount = pay * (b.pct / 100);
          return (
            <div key={b.name} className="flex flex-col gap-1">
              <p className="flex justify-between text-xs text-slate-300">
                <span><span aria-hidden="true">{b.emoji} </span>{b.name} ({b.pct}%)</span>
                <span className="text-sm font-black text-slate-100">{fmt(amount)}</span>
              </p>
              <div aria-hidden="true" className="h-3 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full" style={{ width: `${(amount / maxBar) * 100}%`, background: b.color, transition: 'width 150ms' }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-300">Every dollar gets a jar — {fmt(pay * 0.2)} a month quietly builds your future.</p>
    </div>
  );
}

/* finance-lesson-010 — Financial freedom: your freedom number */
function FreedomWidget({ accent }) {
  const [expenses, setExpenses] = useState(3000);
  const [invested, setInvested] = useState(50000);
  const freedomNumber = expenses * 12 * 25;
  const progress = Math.min(100, (invested / freedomNumber) * 100);
  const free = progress >= 100;
  return (
    <div className="flex w-full flex-col gap-3">
      <Slider id="fr-exp" label="Your monthly expenses" display={fmt(expenses)} value={expenses} min={500} max={10000} step={100} onChange={setExpenses} accent={accent} />
      <div>
        <p className="text-xs text-slate-300">Your freedom number (expenses × 12 × 25)</p>
        <p className="text-3xl font-black" style={{ color: accent }}>{fmt(freedomNumber)}</p>
      </div>
      <Slider id="fr-inv" label="Already invested" display={fmt(invested)} value={invested} min={0} max={2000000} step={10000} onChange={setInvested} accent={accent} />
      <div aria-hidden="true" className="h-4 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: accent, transition: 'width 150ms' }} />
      </div>
      <p className="text-sm text-slate-300">
        <span className="font-black" style={{ color: accent }}>{Math.round(progress)}%</span> of the way there.{' '}
        {free ? 'Your money tree feeds you — work is now a choice! 🎉' : 'Every dollar invested moves the bar. Lower expenses shrink the target too.'}
      </p>
    </div>
  );
}

export default {
  'finance-lesson-001': EquityWidget,
  'finance-lesson-002': NetWorthWidget,
  'finance-lesson-003': CashFlowWidget,
  'finance-lesson-004': AssetSortWidget,
  'finance-lesson-005': StocksWidget,
  'finance-lesson-006': EtfWidget,
  'finance-lesson-007': CompoundWidget,
  'finance-lesson-008': IncomeWealthWidget,
  'finance-lesson-009': BudgetRuleWidget,
  'finance-lesson-010': FreedomWidget,
};
