import FinanceVisualsL2 from './visuals/FinanceVisualsL2.jsx';
import ElectronicsVisualsL2 from './visuals/ElectronicsVisualsL2.jsx';
import RoboticsVisualsL2 from './visuals/RoboticsVisualsL2.jsx';

const V = (children) => (
  <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
    {children}
  </svg>
);

const VISUALS = {

  /* ── FINANCE LESSONS ── */

  'finance-lesson-001': (a) => V(<>
    {/* Equity: pie chart */}
    <circle cx="100" cy="58" r="42" fill="none" stroke={a} strokeWidth="1.5" opacity="0.2" />
    <path d="M100,58 L100,16 A42,42 0 1,1 57.4,79 Z" fill={a} opacity="0.8" />
    <path d="M100,58 L57.4,79 A42,42 0 0,1 100,16 Z" fill={a} opacity="0.2" />
    <text x="93" y="50" fontSize="9" fontWeight="bold" fill="#fff" opacity="0.9">YOUR</text>
    <text x="88" y="62" fontSize="9" fontWeight="bold" fill="#fff" opacity="0.9">EQUITY</text>
    <line x1="148" y1="58" x2="190" y2="42" stroke={a} strokeWidth="1" opacity="0.4" />
    <text x="195" y="38" fontSize="10" fontWeight="bold" fill={a}>75%</text>
    <text x="193" y="50" fontSize="8" fill={a} opacity="0.7">owned</text>
    <line x1="70" y1="86" x2="52" y2="98" stroke={a} strokeWidth="1" opacity="0.4" />
    <text x="10" y="106" fontSize="9" fill={a} opacity="0.7">25% owed</text>
    <rect x="230" y="30" width="12" height="12" rx="2" fill={a} opacity="0.8" />
    <text x="246" y="41" fontSize="9" fill={a} opacity="0.8">Equity</text>
    <rect x="230" y="48" width="12" height="12" rx="2" fill={a} opacity="0.2" />
    <text x="246" y="59" fontSize="9" fill={a} opacity="0.6">Debt</text>
  </>),

  'finance-lesson-002': (a) => V(<>
    {/* Net Worth: balance scale */}
    <polygon points="160,95 148,108 172,108" fill={a} opacity="0.5" />
    <rect x="158" y="60" width="4" height="35" fill={a} opacity="0.5" />
    <line x1="80" y1="52" x2="240" y2="68" stroke={a} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <line x1="80" y1="52" x2="65" y2="58" stroke={a} strokeWidth="1" opacity="0.5" />
    <line x1="80" y1="52" x2="95" y2="58" stroke={a} strokeWidth="1" opacity="0.5" />
    <rect x="55" y="70" width="50" height="20" rx="3" fill={a} opacity="0.7" />
    <text x="80" y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">ASSETS</text>
    <line x1="240" y1="68" x2="225" y2="74" stroke={a} strokeWidth="1" opacity="0.5" />
    <line x1="240" y1="68" x2="255" y2="74" stroke={a} strokeWidth="1" opacity="0.5" />
    <rect x="215" y="84" width="50" height="20" rx="3" fill={a} opacity="0.25" />
    <text x="240" y="98" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">DEBT</text>
    <text x="160" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">ASSETS − DEBT = NET WORTH</text>
  </>),

  'finance-lesson-003': (a) => V(<>
    {/* Cash Flow: stacked IN vs OUT arrows */}
    <text x="160" y="14" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">CASH FLOW</text>
    <rect x="30" y="24" width="215" height="28" rx="5" fill={a} opacity="0.75" />
    <polygon points="245,16 272,38 245,60" fill={a} opacity="0.75" />
    <text x="137" y="43" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">INCOME IN</text>
    <rect x="30" y="64" width="140" height="22" rx="5" fill={a} opacity="0.22" />
    <polygon points="170,60 192,75 170,90" fill={a} opacity="0.22" />
    <text x="100" y="79" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.75">EXPENSES OUT</text>
    <text x="248" y="82" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.85">the gap = surplus</text>
    <text x="160" y="104" textAnchor="middle" fontSize="9" fill={a} opacity="0.5">surplus = income − expenses</text>
  </>),

  'finance-lesson-004': (a) => V(<>
    {/* Assets vs Liabilities: two bars */}
    <rect x="70" y="18" width="62" height="72" rx="4" fill={a} opacity="0.85" />
    <text x="101" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a}>+ ASSETS</text>
    <text x="101" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#fff" opacity="0.9">$</text>
    <text x="101" y="63" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.7">rental</text>
    <text x="101" y="75" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.7">stocks</text>
    <text x="101" y="87" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.7">biz</text>
    <rect x="188" y="52" width="62" height="38" rx="4" fill={a} opacity="0.22" />
    <text x="219" y="46" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.6">− LIABILITIES</text>
    <text x="219" y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={a} opacity="0.5">%</text>
    <line x1="148" y1="55" x2="183" y2="55" stroke={a} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" />
    <text x="160" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.5">collect assets · avoid liabilities</text>
  </>),

  'finance-lesson-005': (a) => V(<>
    {/* Stocks: candlestick chart */}
    <line x1="65" y1="75" x2="65" y2="90" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="65" y1="48" x2="65" y2="58" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <rect x="57" y="58" width="16" height="17" rx="2" fill={a} opacity="0.85" />
    <line x1="100" y1="45" x2="100" y2="55" stroke={a} strokeWidth="1.5" opacity="0.35" />
    <line x1="100" y1="75" x2="100" y2="85" stroke={a} strokeWidth="1.5" opacity="0.35" />
    <rect x="92" y="55" width="16" height="20" rx="2" fill={a} opacity="0.25" />
    <line x1="135" y1="35" x2="135" y2="48" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="135" y1="66" x2="135" y2="76" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <rect x="127" y="48" width="16" height="18" rx="2" fill={a} opacity="0.85" />
    <line x1="170" y1="28" x2="170" y2="40" stroke={a} strokeWidth="1.5" opacity="0.35" />
    <line x1="170" y1="60" x2="170" y2="70" stroke={a} strokeWidth="1.5" opacity="0.35" />
    <rect x="162" y="40" width="16" height="20" rx="2" fill={a} opacity="0.25" />
    <line x1="205" y1="16" x2="205" y2="28" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="205" y1="55" x2="205" y2="65" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <rect x="197" y="28" width="16" height="27" rx="2" fill={a} opacity="0.9" />
    <polyline points="65,67 100,65 135,57 170,50 205,42" fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
    <line x1="44" y1="92" x2="230" y2="92" stroke={a} strokeWidth="1" opacity="0.2" />
    <text x="240" y="96" fontSize="9" fill={a} opacity="0.6">TIME →</text>
  </>),

  'finance-lesson-006': (a) => V(<>
    {/* ETFs: diversification grid of company dots */}
    <text x="160" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.8">ONE ETF = 500 COMPANIES</text>
    {[0,1,2,3,4].map(col => [0,1,2].map(row => (
      <circle key={`${col}-${row}`} cx={75 + col*40} cy={35 + row*25} r="9" fill={a} opacity={0.3 + (col+row)*0.08} />
    )))}
    <rect x="55" y="22" width="210" height="80" rx="6" fill="none" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <text x="160" y="108" textAnchor="middle" fontSize="9" fill={a} opacity="0.5">diversified · low risk · one purchase</text>
  </>),

  'finance-lesson-007': (a) => V(<>
    {/* Compound Interest: exponential curve */}
    <line x1="40" y1="95" x2="290" y2="95" stroke={a} strokeWidth="1" opacity="0.3" />
    <line x1="40" y1="95" x2="40" y2="15" stroke={a} strokeWidth="1" opacity="0.3" />
    <polyline points="40,93 90,88 140,78 190,58 240,28 280,10" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <circle cx="40" cy="93" r="4" fill={a} opacity="0.8" />
    <text x="42" y="108" fontSize="8" fill={a} opacity="0.6">Yr 0</text>
    <circle cx="140" cy="78" r="4" fill={a} opacity="0.8" />
    <text x="130" y="108" fontSize="8" fill={a} opacity="0.6">Yr 10</text>
    <circle cx="240" cy="28" r="4" fill={a} opacity="0.8" />
    <text x="230" y="108" fontSize="8" fill={a} opacity="0.6">Yr 30</text>
    <text x="290" y="108" fontSize="8" fill={a} opacity="0.5">time →</text>
    <text x="165" y="35" fontSize="9" fill={a} opacity="0.7">$17,449</text>
    <text x="38" y="75" fontSize="9" fill={a} opacity="0.7">$1k</text>
  </>),

  'finance-lesson-008': (a) => V(<>
    {/* Income vs Wealth: treadmill vs staircase */}
    {/* Left: flat income treadmill */}
    <text x="80" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.6">INCOME</text>
    <line x1="30" y1="75" x2="135" y2="75" stroke={a} strokeWidth="2" opacity="0.4" strokeDasharray="6,3" />
    <circle cx="82" cy="55" r="10" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="82" y1="65" x2="82" y2="80" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="82" y1="70" x2="70" y2="78" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="82" y1="70" x2="94" y2="78" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="82" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">same level</text>
    {/* Divider */}
    <line x1="160" y1="10" x2="160" y2="100" stroke={a} strokeWidth="1" opacity="0.2" strokeDasharray="4,4" />
    {/* Right: growing staircase */}
    <text x="212" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">WEALTH</text>
    <polyline points="175,90 175,72 202,72 202,54 229,54 229,36 256,36 256,20" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    <circle cx="256" cy="20" r="5" fill={a} opacity="0.9" />
    <text x="266" y="24" fontSize="9" fill={a} opacity="0.8">↑</text>
    <text x="240" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">growing</text>
  </>),

  'finance-lesson-009': (a) => V(<>
    {/* 50/30/20 rule: segmented horizontal bar */}
    <text x="160" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">THE 50 / 30 / 20 RULE</text>
    {/* Bar */}
    <rect x="20" y="30" width="160" height="32" rx="3" fill={a} opacity="0.85" />
    <rect x="180" y="30" width="96" height="32" rx="0" fill={a} opacity="0.5" />
    <rect x="276" y="30" width="28" height="32" rx="3" fill={a} opacity="0.9" />
    <line x1="180" y1="30" x2="180" y2="62" stroke="#161c2c" strokeWidth="2" />
    <line x1="276" y1="30" x2="276" y2="62" stroke="#161c2c" strokeWidth="2" />
    <text x="100" y="51" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">50%</text>
    <text x="228" y="51" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">30%</text>
    <text x="290" y="51" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">20%</text>
    <text x="100" y="76" textAnchor="middle" fontSize="9" fill={a} opacity="0.8">NEEDS</text>
    <text x="228" y="76" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">WANTS</text>
    <text x="290" y="76" textAnchor="middle" fontSize="9" fill={a}>SAVE</text>
    <text x="160" y="95" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">rent · food · bills · fun · future</text>
  </>),

  'finance-lesson-010': (a) => V(<>
    {/* Financial Freedom: sun rising over horizon */}
    <line x1="20" y1="66" x2="300" y2="66" stroke={a} strokeWidth="1.5" opacity="0.4" />
    {/* Sun */}
    <circle cx="160" cy="64" r="27" fill={a} opacity="0.15" />
    <circle cx="160" cy="64" r="20" fill={a} opacity="0.7" />
    <text x="160" y="69" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">$</text>
    {/* Rays above horizon */}
    <line x1="160" y1="38" x2="160" y2="28" stroke={a} strokeWidth="2" opacity="0.6" />
    <line x1="143" y1="44" x2="135" y2="34" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="177" y1="44" x2="185" y2="34" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="132" y1="57" x2="120" y2="51" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <line x1="188" y1="57" x2="200" y2="51" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <text x="160" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">FINANCIAL FREEDOM</text>
    <text x="160" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">passive income ≥ living expenses · work becomes optional</text>
  </>),

  /* ── FINANCE QUIZZES ── */

  'finance-quiz-001': (a) => V(<>
    {/* Equity quiz: key + lock */}
    <circle cx="120" cy="55" r="30" fill="none" stroke={a} strokeWidth="2" opacity="0.5" />
    <circle cx="120" cy="55" r="12" fill={a} opacity="0.7" />
    <rect x="132" y="52" width="28" height="8" rx="3" fill={a} opacity="0.7" />
    <rect x="150" y="60" width="8" height="8" rx="2" fill={a} opacity="0.5" />
    <rect x="160" y="60" width="8" height="8" rx="2" fill={a} opacity="0.5" />
    <text x="120" y="59" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">$</text>
    <text x="220" y="45" textAnchor="middle" fontSize="28" fill={a} opacity="0.7">?</text>
    <text x="160" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.7">WHAT IS EQUITY?</text>
  </>),

  'finance-quiz-002': (a) => V(<>
    {/* Net worth quiz: assets - liabilities = ? */}
    <text x="80" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill={a} opacity="0.9">ASSETS</text>
    <rect x="40" y="40" width="80" height="38" rx="4" fill={a} opacity="0.7" />
    <text x="80" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">$$$</text>
    <text x="160" y="65" textAnchor="middle" fontSize="22" fontWeight="bold" fill={a} opacity="0.7">−</text>
    <text x="240" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill={a} opacity="0.5">DEBT</text>
    <rect x="200" y="40" width="80" height="38" rx="4" fill={a} opacity="0.22" />
    <text x="240" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill={a} opacity="0.5">$</text>
    <text x="160" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={a}>= NET WORTH</text>
  </>),

  'finance-quiz-003': (a) => V(<>
    {/* Asset quiz: house vs credit card */}
    <rect x="40" y="25" width="80" height="70" rx="4" fill={a} opacity="0.7" />
    <polygon points="80,12 40,32 120,32" fill={a} opacity="0.85" />
    <rect x="62" y="60" width="36" height="35" rx="3" fill="#fff" opacity="0.15" />
    <text x="80" y="105" textAnchor="middle" fontSize="8" fill={a} opacity="0.8">ASSET ✓</text>
    <text x="160" y="60" textAnchor="middle" fontSize="18" fill={a} opacity="0.4">vs</text>
    <rect x="188" y="32" width="92" height="55" rx="6" fill={a} opacity="0.2" />
    <line x1="188" y1="55" x2="280" y2="55" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <rect x="200" y="60" width="30" height="8" rx="2" fill={a} opacity="0.25" />
    <text x="234" y="105" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">LIABILITY ✗</text>
  </>),

  'finance-quiz-004': (a) => V(<>
    {/* ETF quiz: basket of stocks */}
    <rect x="60" y="40" width="200" height="60" rx="8" fill="none" stroke={a} strokeWidth="2" opacity="0.5" />
    {/* handle */}
    <path d="M100,40 Q100,20 130,20 L190,20 Q220,20 220,40" fill="none" stroke={a} strokeWidth="2" opacity="0.5" />
    {[0,1,2,3,4].map(i => (
      <circle key={i} cx={88 + i*34} cy="70" r="11" fill={a} opacity={0.4 + i*0.1} />
    ))}
    <text x="160" y="105" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">BASKET OF STOCKS = ETF</text>
  </>),

  'finance-quiz-005': (a) => V(<>
    {/* 50/30/20 quiz */}
    <rect x="20" y="35" width="160" height="30" rx="3" fill={a} opacity="0.85" />
    <rect x="180" y="35" width="96" height="30" rx="0" fill={a} opacity="0.5" />
    <rect x="276" y="35" width="28" height="30" rx="3" fill={a} opacity="0.9" />
    <line x1="180" y1="35" x2="180" y2="65" stroke="#161c2c" strokeWidth="2" />
    <line x1="276" y1="35" x2="276" y2="65" stroke="#161c2c" strokeWidth="2" />
    <text x="100" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">50%</text>
    <text x="228" y="56" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">30%</text>
    <text x="290" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">20%</text>
    <text x="290" y="88" textAnchor="middle" fontSize="22" fontWeight="bold" fill={a} opacity="0.85">?</text>
    <text x="150" y="88" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">what does the 20% represent?</text>
  </>),

  /* ── FINANCE CHALLENGES ── */

  'finance-challenge-001': (a) => V(<>
    {/* Calculate net worth: list with $ */}
    <rect x="60" y="12" width="200" height="88" rx="6" fill={a} opacity="0.07" stroke={a} strokeWidth="1.5" strokeOpacity="0.3" />
    <text x="160" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">YOUR NET WORTH</text>
    <line x1="75" y1="36" x2="245" y2="36" stroke={a} strokeWidth="1" opacity="0.2" />
    <text x="80" y="52" fontSize="9" fill={a} opacity="0.7">+ Savings</text>
    <text x="220" y="52" textAnchor="end" fontSize="9" fill={a} opacity="0.7">$5,000</text>
    <text x="80" y="66" fontSize="9" fill={a} opacity="0.7">+ Investments</text>
    <text x="220" y="66" textAnchor="end" fontSize="9" fill={a} opacity="0.7">$3,200</text>
    <text x="80" y="80" fontSize="9" fill={a} opacity="0.5">− Credit Card</text>
    <text x="220" y="80" textAnchor="end" fontSize="9" fill={a} opacity="0.5">−$2,000</text>
    <line x1="75" y1="85" x2="245" y2="85" stroke={a} strokeWidth="1" opacity="0.3" />
    <text x="80" y="97" fontSize="10" fontWeight="bold" fill={a}>= NET WORTH</text>
    <text x="220" y="97" textAnchor="end" fontSize="10" fontWeight="bold" fill={a}>$6,200</text>
  </>),

  'finance-challenge-002': (a) => V(<>
    {/* Freedom number: bullseye target */}
    <circle cx="160" cy="55" r="45" fill="none" stroke={a} strokeWidth="1.5" opacity="0.2" />
    <circle cx="160" cy="55" r="32" fill="none" stroke={a} strokeWidth="1.5" opacity="0.35" />
    <circle cx="160" cy="55" r="19" fill="none" stroke={a} strokeWidth="1.5" opacity="0.55" />
    <circle cx="160" cy="55" r="8" fill={a} opacity="0.85" />
    <text x="160" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">$</text>
    <text x="160" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">YOUR FREEDOM NUMBER</text>
    <text x="160" y="110" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">expenses × 12 × 25 = target</text>
  </>),

  'finance-challenge-003': (a) => V(<>
    {/* 50/30/20 tracking: three labeled boxes with checkboxes */}
    <rect x="20" y="22" width="82" height="72" rx="5" fill={a} opacity="0.12" stroke={a} strokeWidth="1.2" strokeOpacity="0.5" />
    <text x="61" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>50%</text>
    <text x="61" y="56" textAnchor="middle" fontSize="9" fill={a} opacity="0.8">NEEDS</text>
    <rect x="44" y="62" width="14" height="14" rx="3" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <polyline points="46,69 50,74 56,64" fill="none" stroke={a} strokeWidth="2" opacity="0.8" />
    <text x="61" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">rent · food</text>
    <rect x="119" y="22" width="82" height="72" rx="5" fill={a} opacity="0.08" stroke={a} strokeWidth="1.2" strokeOpacity="0.35" />
    <text x="160" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.7">30%</text>
    <text x="160" y="56" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">WANTS</text>
    <rect x="143" y="62" width="14" height="14" rx="3" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <text x="160" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.4">fun · dining</text>
    <rect x="218" y="22" width="82" height="72" rx="5" fill={a} opacity="0.18" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="259" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>20%</text>
    <text x="259" y="56" textAnchor="middle" fontSize="9" fill={a} opacity="0.9">SAVINGS</text>
    <rect x="242" y="62" width="14" height="14" rx="3" fill="none" stroke={a} strokeWidth="1.5" opacity="0.8" />
    <text x="259" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">invest · save</text>
  </>),

  /* ── ELECTRONICS LESSONS ── */

  'electronics-lesson-001': (a) => V(<>
    {/* Voltage: battery + pressure arrows */}
    <rect x="60" y="30" width="30" height="58" rx="3" fill={a} opacity="0.6" />
    <rect x="68" y="22" width="14" height="10" rx="2" fill={a} opacity="0.8" />
    <text x="75" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">9V</text>
    <text x="68" y="100" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">+</text>
    <text x="68" y="108" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">−</text>
    {/* Pressure arrows */}
    <line x1="110" y1="55" x2="200" y2="55" stroke={a} strokeWidth="2" opacity="0.6" />
    <polygon points="200,49 216,55 200,61" fill={a} opacity="0.8" />
    <line x1="110" y1="70" x2="180" y2="70" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <polygon points="180,64 196,70 180,76" fill={a} opacity="0.5" />
    <line x1="110" y1="40" x2="165" y2="40" stroke={a} strokeWidth="1" opacity="0.3" />
    <polygon points="165,34 181,40 165,46" fill={a} opacity="0.35" />
    <text x="240" y="50" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">VOLTAGE</text>
    <text x="240" y="64" fontSize="9" fill={a} opacity="0.6">= pressure</text>
    <text x="240" y="77" fontSize="9" fill={a} opacity="0.6">measured in V</text>
  </>),

  'electronics-lesson-002': (a) => V(<>
    {/* Current: arrows flowing around a loop */}
    <rect x="80" y="25" width="160" height="65" rx="8" fill="none" stroke={a} strokeWidth="2" opacity="0.35" />
    {/* Top arrow right */}
    <line x1="90" y1="25" x2="230" y2="25" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="230,19 244,25 230,31" fill={a} opacity="0.8" />
    {/* Right arrow down */}
    <line x1="240" y1="32" x2="240" y2="82" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="234,82 240,96 246,82" fill={a} opacity="0.8" />
    {/* Bottom arrow left */}
    <line x1="230" y1="90" x2="90" y2="90" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="90,84 76,90 90,96" fill={a} opacity="0.8" />
    {/* Left arrow up */}
    <line x1="80" y1="82" x2="80" y2="32" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="74,32 80,18 86,32" fill={a} opacity="0.8" />
    <text x="160" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">CURRENT</text>
    <text x="160" y="76" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">measured in amps (A)</text>
  </>),

  'electronics-lesson-003': (a) => V(<>
    {/* Resistance: large zigzag resistor symbol */}
    <line x1="30" y1="55" x2="72" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polyline points="72,55 78,35 86,75 94,35 102,75 110,35 118,75 126,35 132,55" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <line x1="132" y1="55" x2="175" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <text x="220" y="42" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">RESISTANCE</text>
    <text x="220" y="57" fontSize="9" fill={a} opacity="0.7">slows electrons</text>
    <text x="220" y="70" fontSize="9" fill={a} opacity="0.7">measured in Ω</text>
    <text x="100" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.5">higher Ω → less current</text>
  </>),

  'electronics-lesson-004': (a) => V(<>
    {/* Ohm's Law: V=IR formula triangle */}
    <polygon points="160,12 60,100 260,100" fill={a} opacity="0.1" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
    <line x1="60" y1="100" x2="260" y2="100" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="160" y1="100" x2="160" y2="12" stroke={a} strokeWidth="1.5" opacity="0.35" strokeDasharray="5,4" />
    <text x="160" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill={a} opacity="0.9">V</text>
    <text x="100" y="97" textAnchor="middle" fontSize="15" fontWeight="bold" fill={a} opacity="0.8">I</text>
    <text x="222" y="97" textAnchor="middle" fontSize="15" fontWeight="bold" fill={a} opacity="0.8">R</text>
    <text x="160" y="108" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.7">V = I × R</text>
  </>),

  'electronics-lesson-005': (a) => V(<>
    {/* Circuit: complete loop with battery, switch, LED */}
    {/* Top wire */}
    <line x1="55" y1="22" x2="265" y2="22" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Bottom wire */}
    <line x1="55" y1="88" x2="265" y2="88" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Left: battery */}
    <line x1="55" y1="22" x2="55" y2="40" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="43" y1="40" x2="67" y2="40" stroke={a} strokeWidth="3.5" opacity="0.9" />
    <line x1="48" y1="50" x2="62" y2="50" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="55" y1="50" x2="55" y2="88" stroke={a} strokeWidth="2" opacity="0.7" />
    <text x="30" y="47" fontSize="8" fill={a} opacity="0.7">+</text>
    <text x="30" y="57" fontSize="8" fill={a} opacity="0.5">−</text>
    {/* Top: switch (open) */}
    <circle cx="130" cy="22" r="4" fill={a} opacity="0.8" />
    <circle cx="165" cy="22" r="4" fill={a} opacity="0.8" />
    <line x1="134" y1="22" x2="161" y2="10" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Right: LED */}
    <polygon points="225,12 225,32 245,22" fill={a} opacity="0.75" />
    <line x1="245" y1="12" x2="245" y2="32" stroke={a} strokeWidth="2.5" opacity="0.9" />
    <line x1="250" y1="15" x2="260" y2="10" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="250" y1="22" x2="262" y2="22" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="265" y1="22" x2="265" y2="88" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Resistor on bottom */}
    <polyline points="120,88 126,80 132,96 138,80 144,96 150,80 156,88" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
  </>),

  'electronics-lesson-006': (a) => V(<>
    {/* Breadboard: dot grid with internal connections shown */}
    <rect x="30" y="18" width="260" height="80" rx="5" fill={a} opacity="0.06" stroke={a} strokeWidth="1.5" strokeOpacity="0.3" />
    {/* Power rails */}
    <rect x="38" y="24" width="244" height="10" rx="2" fill={a} opacity="0.3" />
    <rect x="38" y="82" width="244" height="10" rx="2" fill={a} opacity="0.15" />
    <text x="22" y="32" fontSize="7" fill={a} opacity="0.7">+</text>
    <text x="22" y="90" fontSize="7" fill={a} opacity="0.5">−</text>
    {/* Dot grid (5 rows × 10 cols) */}
    {[0,1,2,3,4].map(row => [0,1,2,3,4,5,6,7,8,9].map(col => (
      <circle key={`${row}-${col}`} cx={50 + col*24} cy={42 + row*8} r="2.5" fill={a} opacity={row < 2 ? 0.7 : 0.35} />
    )))}
    <text x="160" y="108" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">prototype without soldering</text>
  </>),

  'electronics-lesson-007': (a) => V(<>
    {/* LED: schematic symbol + rays */}
    <line x1="60" y1="55" x2="108" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polygon points="108,35 108,75 140,55" fill={a} opacity="0.8" />
    <line x1="140" y1="35" x2="140" y2="75" stroke={a} strokeWidth="3" opacity="0.9" />
    <line x1="140" y1="55" x2="185" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    {/* Long leg (anode +) */}
    <line x1="108" y1="78" x2="108" y2="95" stroke={a} strokeWidth="2" opacity="0.6" />
    <text x="104" y="106" fontSize="8" fill={a} opacity="0.7">+</text>
    {/* Short leg (cathode -) */}
    <line x1="140" y1="78" x2="140" y2="90" stroke={a} strokeWidth="2" opacity="0.4" />
    <text x="136" y="106" fontSize="8" fill={a} opacity="0.5">−</text>
    {/* Rays */}
    <line x1="150" y1="38" x2="168" y2="24" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="158" y1="46" x2="180" y2="36" stroke={a} strokeWidth="2" opacity="0.6" />
    <line x1="162" y1="55" x2="186" y2="50" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <polygon points="168,20 174,26 164,28" fill={a} opacity="0.7" />
    <polygon points="180,32 186,38 176,40" fill={a} opacity="0.6" />
    <text x="220" y="45" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">LED</text>
    <text x="220" y="60" fontSize="9" fill={a} opacity="0.7">2V · 20mA</text>
    <text x="220" y="75" fontSize="9" fill={a} opacity="0.6">needs resistor!</text>
  </>),

  'electronics-lesson-008': (a) => V(<>
    {/* Multimeter: DMM body + display + probes */}
    <rect x="100" y="12" width="120" height="86" rx="8" fill={a} opacity="0.12" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
    <rect x="112" y="20" width="96" height="38" rx="4" fill={a} opacity="0.15" stroke={a} strokeWidth="1" strokeOpacity="0.5" />
    <text x="160" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill={a} opacity="0.9">9.00</text>
    <text x="160" y="57" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">DC VOLTS</text>
    <circle cx="135" cy="78" r="8" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <circle cx="185" cy="78" r="8" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="135" y="82" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">V</text>
    <text x="185" y="82" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">A</text>
    {/* Probe leads */}
    <line x1="130" y1="98" x2="60" y2="108" stroke={a} strokeWidth="2" opacity="0.6" />
    <line x1="190" y1="98" x2="260" y2="108" stroke={a} strokeWidth="2" opacity="0.4" />
    <circle cx="56" cy="108" r="4" fill={a} opacity="0.7" />
    <circle cx="264" cy="108" r="4" fill={a} opacity="0.4" />
    <text x="42" y="108" fontSize="8" fill={a} opacity="0.7">+</text>
    <text x="270" y="108" fontSize="8" fill={a} opacity="0.5">−</text>
  </>),

  'electronics-lesson-009': (a) => V(<>
    {/* Series vs Parallel: two circuit layouts */}
    <text x="80" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">SERIES</text>
    <text x="240" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">PARALLEL</text>
    <line x1="158" y1="14" x2="158" y2="100" stroke={a} strokeWidth="1" opacity="0.15" strokeDasharray="4,4" />
    {/* Series circuit left */}
    <line x1="20" y1="22" x2="140" y2="22" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="20" y1="22" x2="20" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="20" y1="88" x2="140" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="140" y1="22" x2="140" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <circle cx="55" cy="55" r="10" fill={a} opacity="0.6" />
    <text x="55" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">L</text>
    <circle cx="105" cy="55" r="10" fill={a} opacity="0.6" />
    <text x="105" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">L</text>
    <text x="80" y="104" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">one breaks = all off</text>
    {/* Parallel circuit right */}
    <line x1="175" y1="22" x2="305" y2="22" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="175" y1="22" x2="175" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="175" y1="88" x2="305" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="305" y1="22" x2="305" y2="88" stroke={a} strokeWidth="1.8" opacity="0.7" />
    <line x1="215" y1="22" x2="215" y2="88" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="265" y1="22" x2="265" y2="88" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <circle cx="215" cy="55" r="10" fill={a} opacity="0.6" />
    <text x="215" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">L</text>
    <circle cx="265" cy="55" r="10" fill={a} opacity="0.6" />
    <text x="265" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">L</text>
    <text x="240" y="104" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">one breaks = others on</text>
  </>),

  'electronics-lesson-010': (a) => V(<>
    {/* Sensors: component block + expanding sonar arcs */}
    <rect x="32" y="30" width="70" height="55" rx="5" fill={a} opacity="0.6" stroke={a} strokeWidth="1.5" strokeOpacity="0.8" />
    <text x="67" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">SENSOR</text>
    {/* Sonar arcs */}
    <path d="M102,57 Q125,40 125,57 Q125,74 102,57" fill="none" stroke={a} strokeWidth="2" opacity="0.8" />
    <path d="M102,57 Q140,30 140,57 Q140,84 102,57" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
    <path d="M102,57 Q162,15 162,57 Q162,99 102,57" fill="none" stroke={a} strokeWidth="2" opacity="0.4" />
    <path d="M102,57 Q190,0 190,57 Q190,114 102,57" fill="none" stroke={a} strokeWidth="1.5" opacity="0.25" />
    <text x="220" y="42" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">SENSORS</text>
    <text x="220" y="56" fontSize="8" fill={a} opacity="0.7">temperature</text>
    <text x="220" y="68" fontSize="8" fill={a} opacity="0.7">light · sound</text>
    <text x="220" y="80" fontSize="8" fill={a} opacity="0.7">distance · touch</text>
  </>),

  /* ── ELECTRONICS QUIZZES ── */

  'electronics-quiz-001': (a) => V(<>
    {/* Voltage units quiz: big V symbol */}
    <text x="120" y="90" textAnchor="middle" fontSize="88" fontWeight="bold" fill={a} opacity="0.15">V</text>
    <text x="120" y="85" textAnchor="middle" fontSize="72" fontWeight="bold" fill={a} opacity="0.7">V</text>
    <text x="230" y="42" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">VOLTAGE</text>
    <text x="230" y="57" fontSize="9" fill={a} opacity="0.7">measured in</text>
    <text x="230" y="72" fontSize="14" fontWeight="bold" fill={a} opacity="0.9">Volts (V)</text>
    <text x="312" y="90" textAnchor="end" fontSize="9" fill={a} opacity="0.5">not amps · not ohms</text>
  </>),

  'electronics-quiz-002': (a) => V(<>
    {/* Ohm's Law calculation: V=IR worked example */}
    <polygon points="160,12 60,100 260,100" fill={a} opacity="0.08" stroke={a} strokeWidth="1.5" strokeOpacity="0.5" />
    <text x="160" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill={a} opacity="0.9">V</text>
    <text x="95" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill={a} opacity="0.8">I</text>
    <text x="225" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill={a} opacity="0.8">R</text>
    <text x="160" y="108" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">I = V ÷ R = 12 ÷ 4 = ?</text>
  </>),

  'electronics-quiz-003': (a) => V(<>
    {/* LED legs quiz: labeled diagram */}
    <line x1="80" y1="55" x2="128" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polygon points="128,35 128,75 160,55" fill={a} opacity="0.8" />
    <line x1="160" y1="35" x2="160" y2="75" stroke={a} strokeWidth="3" opacity="0.9" />
    <line x1="160" y1="55" x2="200" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    {/* Long leg */}
    <line x1="128" y1="78" x2="128" y2="100" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <line x1="108" y1="100" x2="148" y2="100" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="108" y="108" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">+ ANODE</text>
    {/* Short leg */}
    <line x1="160" y1="78" x2="160" y2="92" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="145" y1="92" x2="175" y2="92" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <text x="155" y="108" fontSize="8" fill={a} opacity="0.6">− cathode</text>
    {/* Question */}
    <text x="240" y="45" fontSize="22" fontWeight="bold" fill={a} opacity="0.7">?</text>
    <text x="240" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">which leg</text>
    <text x="240" y="80" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">is positive?</text>
  </>),

  'electronics-quiz-004': (a) => V(<>
    {/* Breadboard quiz */}
    <rect x="30" y="20" width="260" height="76" rx="5" fill={a} opacity="0.07" stroke={a} strokeWidth="1.5" strokeOpacity="0.3" />
    <rect x="38" y="26" width="244" height="10" rx="2" fill={a} opacity="0.3" />
    <rect x="38" y="80" width="244" height="10" rx="2" fill={a} opacity="0.15" />
    {[0,1,2,3].map(row => [0,1,2,3,4,5,6,7,8,9].map(col => (
      <circle key={`${row}-${col}`} cx={50 + col*24} cy={44 + row*9} r="2.5" fill={a} opacity={row < 2 ? 0.65 : 0.3} />
    )))}
    <text x="160" y="105" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">what does this let you do?</text>
  </>),

  'electronics-quiz-005': (a) => V(<>
    {/* LED without resistor = burns */}
    <line x1="40" y1="55" x2="88" y2="55" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polygon points="88,35 88,75 120,55" fill={a} opacity="0.3" />
    <line x1="120" y1="35" x2="120" y2="75" stroke={a} strokeWidth="3" opacity="0.4" />
    {/* X over LED = burned */}
    <line x1="88" y1="35" x2="120" y2="75" stroke="#ef4444" strokeWidth="2.5" opacity="0.8" />
    <line x1="120" y1="35" x2="88" y2="75" stroke="#ef4444" strokeWidth="2.5" opacity="0.8" />
    <line x1="120" y1="55" x2="160" y2="55" stroke={a} strokeWidth="2.5" opacity="0.5" />
    {/* 9V battery no resistor */}
    <line x1="188" y1="40" x2="188" y2="55" stroke={a} strokeWidth="2" opacity="0.6" />
    <line x1="176" y1="55" x2="200" y2="55" stroke={a} strokeWidth="3.5" opacity="0.8" />
    <line x1="180" y1="62" x2="196" y2="62" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="188" y1="62" x2="188" y2="75" stroke={a} strokeWidth="2" opacity="0.6" />
    <text x="188" y="38" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">9V</text>
    <text x="160" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ef4444" opacity="0.8">💥 without a resistor!</text>
  </>),

  /* ── ELECTRONICS CHALLENGES ── */

  'electronics-challenge-001': (a) => V(<>
    {/* Voltage hunt: magnifier + V symbols */}
    <circle cx="100" cy="52" r="32" fill="none" stroke={a} strokeWidth="2.5" opacity="0.7" />
    <line x1="124" y1="76" x2="148" y2="100" stroke={a} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    <text x="100" y="58" textAnchor="middle" fontSize="20" fontWeight="bold" fill={a} opacity="0.8">V</text>
    <text x="195" y="28" fontSize="11" fill={a} opacity="0.8">5V</text>
    <text x="220" y="48" fontSize="13" fontWeight="bold" fill={a} opacity="0.9">12V</text>
    <text x="200" y="68" fontSize="9" fill={a} opacity="0.6">120V</text>
    <text x="225" y="85" fontSize="11" fill={a} opacity="0.7">3.3V</text>
    <text x="195" y="104" fontSize="10" fill={a} opacity="0.5">9V</text>
    <text x="160" y="14" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">find voltage ratings around your home</text>
  </>),

  'electronics-challenge-002': (a) => V(<>
    {/* Ohm's Law practice: three equation boxes */}
    <rect x="15" y="18" width="88" height="82" rx="5" fill={a} opacity="0.1" stroke={a} strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="59" y="36" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">V=9V, R=300Ω</text>
    <text x="59" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">I = V/R</text>
    <text x="59" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>= ?</text>
    <rect x="116" y="18" width="88" height="82" rx="5" fill={a} opacity="0.1" stroke={a} strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="160" y="36" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">I=50mA, R=100Ω</text>
    <text x="160" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">V = I×R</text>
    <text x="160" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>= ?</text>
    <rect x="217" y="18" width="88" height="82" rx="5" fill={a} opacity="0.1" stroke={a} strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="261" y="36" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">V=5V, I=25mA</text>
    <text x="261" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">R = V/I</text>
    <text x="261" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>= ?</text>
  </>),

  'electronics-challenge-003': (a) => V(<>
    {/* Draw a circuit: hand-drawn style */}
    <text x="160" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">DRAW THIS CIRCUIT</text>
    <line x1="50" y1="28" x2="270" y2="28" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="50" y1="28" x2="50" y2="90" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="50" y1="90" x2="270" y2="90" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="270" y1="28" x2="270" y2="90" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Battery left */}
    <line x1="38" y1="48" x2="62" y2="48" stroke={a} strokeWidth="3.5" opacity="0.9" />
    <line x1="43" y1="57" x2="57" y2="57" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <text x="30" y="46" fontSize="7" fill={a}>+</text>
    {/* Switch top */}
    <circle cx="120" cy="28" r="3.5" fill={a} opacity="0.8" />
    <circle cx="155" cy="28" r="3.5" fill={a} opacity="0.8" />
    <line x1="123" y1="28" x2="152" y2="17" stroke={a} strokeWidth="2" opacity="0.7" />
    {/* Resistor bottom */}
    <polyline points="110,90 116,82 122,98 128,82 134,98 140,82 146,90" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    {/* LED right */}
    <polygon points="230,38 230,58 248,48" fill={a} opacity="0.75" />
    <line x1="248" y1="38" x2="248" y2="58" stroke={a} strokeWidth="2.5" opacity="0.9" />
    <line x1="253" y1="41" x2="263" y2="35" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="253" y1="48" x2="265" y2="48" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="160" y="108" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">battery · switch · resistor · LED</text>
  </>),

  /* ── ROBOTICS LESSONS ── */

  'robotics-lesson-001': (a) => V(<>
    {/* Motor driver: H-bridge diagram */}
    <text x="160" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">H-BRIDGE MOTOR DRIVER</text>
    {/* H shape rails */}
    <line x1="70" y1="25" x2="70" y2="95" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="250" y1="25" x2="250" y2="95" stroke={a} strokeWidth="2" opacity="0.5" />
    <line x1="70" y1="60" x2="250" y2="60" stroke={a} strokeWidth="2" opacity="0.5" />
    {/* 4 switches */}
    <circle cx="70" cy="38" r="10" fill={a} opacity="0.7" />
    <text x="70" y="42" textAnchor="middle" fontSize="8" fill="#fff">S1</text>
    <circle cx="250" cy="38" r="10" fill={a} opacity="0.35" />
    <text x="250" y="42" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">S2</text>
    <circle cx="70" cy="82" r="10" fill={a} opacity="0.35" />
    <text x="70" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">S3</text>
    <circle cx="250" cy="82" r="10" fill={a} opacity="0.7" />
    <text x="250" y="86" textAnchor="middle" fontSize="8" fill="#fff">S4</text>
    {/* Motor in center */}
    <circle cx="160" cy="60" r="20" fill="none" stroke={a} strokeWidth="2" opacity="0.8" />
    <text x="160" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>M</text>
    {/* Current arrows */}
    <polygon points="115,57 130,60 115,63" fill={a} opacity="0.7" />
    <polygon points="205,63 190,60 205,57" fill={a} opacity="0.35" />
  </>),

  'robotics-lesson-002': (a) => V(<>
    {/* DC Motor: circle with rotation arrows */}
    <circle cx="130" cy="55" r="40" fill="none" stroke={a} strokeWidth="2.5" opacity="0.7" />
    <circle cx="130" cy="55" r="28" fill={a} opacity="0.1" />
    <text x="130" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill={a} opacity="0.9">M</text>
    {/* Rotation arrows */}
    <path d="M130,15 A40,40 0 0,1 170,55" fill="none" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polygon points="170,48 176,58 164,60" fill={a} opacity="0.8" />
    <path d="M130,95 A40,40 0 0,1 90,55" fill="none" stroke={a} strokeWidth="2.5" opacity="0.5" strokeDasharray="5,4" />
    {/* Shaft */}
    <line x1="170" y1="55" x2="200" y2="55" stroke={a} strokeWidth="3" opacity="0.7" />
    {/* Terminals */}
    <line x1="90" y1="35" x2="75" y2="25" stroke={a} strokeWidth="2" opacity="0.6" />
    <line x1="90" y1="75" x2="75" y2="85" stroke={a} strokeWidth="2" opacity="0.4" />
    <text x="64" y="27" fontSize="8" fill={a} opacity="0.7">+</text>
    <text x="64" y="87" fontSize="8" fill={a} opacity="0.5">−</text>
    <text x="240" y="42" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">DC MOTOR</text>
    <text x="240" y="56" fontSize="9" fill={a} opacity="0.7">voltage → spin</text>
    <text x="240" y="70" fontSize="9" fill={a} opacity="0.6">reverse = reverse</text>
  </>),

  'robotics-lesson-003': (a) => V(<>
    {/* Servo: body + angle arc + needle */}
    {/* Servo body */}
    <rect x="40" y="32" width="90" height="55" rx="6" fill={a} opacity="0.6" stroke={a} strokeWidth="1.5" strokeOpacity="0.8" />
    <rect x="55" y="24" width="60" height="12" rx="3" fill={a} opacity="0.4" />
    <text x="85" y="63" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">SERVO</text>
    {/* Output shaft */}
    <circle cx="130" cy="59" r="8" fill={a} opacity="0.8" />
    <line x1="138" y1="59" x2="170" y2="70" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="3,3" />
    {/* Protractor dial: pivot at (222,70), radius 40 */}
    <path d="M182,70 A40,40 0 0,1 262,70" fill="none" stroke={a} strokeWidth="2" opacity="0.45" />
    {/* Needle pointing to 90° (straight up) */}
    <line x1="222" y1="70" x2="222" y2="32" stroke={a} strokeWidth="2.5" opacity="0.9" strokeLinecap="round" />
    <circle cx="222" cy="70" r="5" fill={a} opacity="0.9" />
    {/* Angle markers */}
    <text x="170" y="78" fontSize="8" fill={a} opacity="0.7">0°</text>
    <text x="214" y="24" fontSize="8" fontWeight="bold" fill={a} opacity="0.95">90°</text>
    <text x="266" y="78" fontSize="8" fill={a} opacity="0.7">180°</text>
    <text x="160" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">holds precise position · PWM controlled</text>
  </>),

  'robotics-lesson-004': (a) => V(<>
    {/* Microcontroller: IC chip with pins */}
    <rect x="105" y="20" width="110" height="75" rx="6" fill="none" stroke={a} strokeWidth="2" opacity="0.85" />
    <rect x="115" y="30" width="90" height="55" rx="3" fill={a} opacity="0.07" />
    <text x="160" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">MICRO</text>
    <text x="160" y="64" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">CONTROLLER</text>
    <text x="160" y="76" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">CPU · RAM · I/O</text>
    {/* Left pins */}
    {[28,40,52,64,76].map((y,i) => (
      <g key={i}>
        <line x1="85" y1={y} x2="105" y2={y} stroke={a} strokeWidth="1.5" opacity="0.7" />
        <rect x="75" y={y-4} width="10" height="8" rx="1" fill={a} opacity="0.4" />
      </g>
    ))}
    {/* Right pins */}
    {[28,40,52,64,76].map((y,i) => (
      <g key={i}>
        <line x1="215" y1={y} x2="235" y2={y} stroke={a} strokeWidth="1.5" opacity="0.7" />
        <rect x="235" y={y-4} width="10" height="8" rx="1" fill={a} opacity="0.4" />
      </g>
    ))}
  </>),

  'robotics-lesson-005': (a) => V(<>
    {/* Arduino: board outline */}
    <rect x="30" y="15" width="200" height="85" rx="6" fill={a} opacity="0.08" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
    {/* USB port */}
    <rect x="18" y="40" width="18" height="28" rx="3" fill={a} opacity="0.5" />
    {/* Reset button */}
    <circle cx="68" cy="25" r="8" fill={a} opacity="0.4" />
    <text x="68" y="29" textAnchor="middle" fontSize="6" fill={a} opacity="0.8">RST</text>
    {/* Digital pin header */}
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
      <circle key={i} cx={62 + i*14} cy="95" r="3.5" fill={a} opacity={0.5 + i*0.03} />
    ))}
    {/* Analog pin header */}
    {[0,1,2,3,4,5].map(i => (
      <circle key={i} cx={62 + i*14} cy="18" r="3.5" fill={a} opacity="0.4" />
    ))}
    {/* Chip */}
    <rect x="110" y="38" width="60" height="40" rx="4" fill={a} opacity="0.35" />
    <text x="140" y="62" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">ATmega</text>
    <text x="240" y="50" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">ARDUINO</text>
    <text x="240" y="64" fontSize="8" fill={a} opacity="0.6">setup()</text>
    <text x="240" y="76" fontSize="8" fill={a} opacity="0.6">loop()</text>
  </>),

  'robotics-lesson-006': (a) => V(<>
    {/* PWM: square wave with duty cycle */}
    <text x="160" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">PULSE WIDTH MODULATION</text>
    <line x1="25" y1="85" x2="295" y2="85" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="25" y1="30" x2="295" y2="30" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="25" y1="85" x2="25" y2="22" stroke={a} strokeWidth="1" opacity="0.25" />
    <text x="14" y="33" fontSize="7" fill={a} opacity="0.6">HI</text>
    <text x="14" y="88" fontSize="7" fill={a} opacity="0.4">LO</text>
    {/* 75% duty cycle pulse */}
    <polyline points="30,85 30,30 90,30 90,85 120,85 120,30 180,30 180,85 210,85 210,30 270,30 270,85 290,85" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="square" opacity="0.9" />
    {/* Duty cycle brace */}
    <line x1="30" y1="22" x2="90" y2="22" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="30" y1="19" x2="30" y2="25" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="90" y1="19" x2="90" y2="25" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="60" y="18" textAnchor="middle" fontSize="7" fill={a} opacity="0.7">ON</text>
    <text x="105" y="18" textAnchor="middle" fontSize="7" fill={a} opacity="0.4">off</text>
    <text x="160" y="104" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">75% duty cycle = 75% power</text>
  </>),

  'robotics-lesson-007': (a) => V(<>
    {/* Distance sensor: block + expanding sonar arcs */}
    <rect x="22" y="28" width="75" height="58" rx="5" fill={a} opacity="0.55" stroke={a} strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="46" cy="50" r="9" fill={a} opacity="0.85" />
    <circle cx="73" cy="50" r="9" fill={a} opacity="0.85" />
    <text x="59" y="72" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">HC-SR04</text>
    {/* Sonar arcs */}
    <path d="M97,57 Q118,40 118,57 Q118,74 97,57" fill="none" stroke={a} strokeWidth="2.2" opacity="0.85" />
    <path d="M97,57 Q138,28 138,57 Q138,86 97,57" fill="none" stroke={a} strokeWidth="2" opacity="0.65" />
    <path d="M97,57 Q165,10 165,57 Q165,104 97,57" fill="none" stroke={a} strokeWidth="1.8" opacity="0.45" />
    <path d="M97,57 Q200,-5 200,57 Q200,119 97,57" fill="none" stroke={a} strokeWidth="1.5" opacity="0.25" />
    {/* Object */}
    <rect x="218" y="30" width="30" height="55" rx="3" fill={a} opacity="0.4" />
    {/* Distance indicator */}
    <line x1="100" y1="92" x2="218" y2="92" stroke={a} strokeWidth="1" opacity="0.4" strokeDasharray="4,3" />
    <text x="159" y="107" textAnchor="middle" fontSize="9" fill={a} opacity="0.7">← 1 meter →</text>
  </>),

  'robotics-lesson-008': (a) => V(<>
    {/* Raspberry Pi: SBC board */}
    <rect x="30" y="12" width="185" height="90" rx="6" fill={a} opacity="0.08" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
    {/* GPIO header 2x10 */}
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <g key={i}>
        <circle cx={45 + i*15} cy="22" r="3.5" fill={a} opacity="0.7" />
        <circle cx={45 + i*15} cy="32" r="3.5" fill={a} opacity="0.5" />
      </g>
    ))}
    {/* CPU */}
    <rect x="75" y="48" width="55" height="45" rx="4" fill={a} opacity="0.35" />
    <text x="102" y="75" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">CPU</text>
    {/* USB/HDMI ports */}
    <rect x="148" y="52" width="25" height="14" rx="2" fill={a} opacity="0.4" />
    <text x="160" y="62" textAnchor="middle" fontSize="6" fill={a} opacity="0.7">USB</text>
    <rect x="148" y="72" width="25" height="14" rx="2" fill={a} opacity="0.4" />
    <text x="160" y="82" textAnchor="middle" fontSize="6" fill={a} opacity="0.7">HDMI</text>
    <text x="240" y="42" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">Pi</text>
    <text x="235" y="57" fontSize="8" fill={a} opacity="0.7">Linux OS</text>
    <text x="235" y="70" fontSize="8" fill={a} opacity="0.7">Python</text>
    <text x="235" y="83" fontSize="8" fill={a} opacity="0.6">GPIO pins</text>
  </>),

  'robotics-lesson-009': (a) => V(<>
    {/* Robot behavior: sense-decide-act flowchart */}
    <text x="160" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">SENSE → DECIDE → ACT</text>
    {/* Sense box */}
    <rect x="18" y="22" width="76" height="32" rx="4" fill={a} opacity="0.55" />
    <text x="56" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">SENSE</text>
    <text x="56" y="64" textAnchor="middle" fontSize="7" fill={a} opacity="0.6">distance=15cm</text>
    <line x1="94" y1="38" x2="116" y2="38" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="116,32 130,38 116,44" fill={a} opacity="0.8" />
    {/* Decision diamond */}
    <polygon points="160,20 196,38 160,56 124,38" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="160" y="42" textAnchor="middle" fontSize="7" fontWeight="bold" fill={a} opacity="0.9">{'<20cm?'}</text>
    {/* Yes path */}
    <line x1="160" y1="56" x2="160" y2="70" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="154,70 160,82 166,70" fill={a} opacity="0.8" />
    <text x="168" y="66" fontSize="7" fill={a} opacity="0.6">YES</text>
    {/* Act box */}
    <rect x="112" y="82" width="96" height="24" rx="4" fill={a} opacity="0.7" />
    <text x="160" y="98" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">STOP + TURN</text>
    {/* No path */}
    <line x1="196" y1="38" x2="250" y2="38" stroke={a} strokeWidth="2" opacity="0.5" />
    <polygon points="250,32 264,38 250,44" fill={a} opacity="0.6" />
    <rect x="258" y="22" width="50" height="32" rx="4" fill={a} opacity="0.4" />
    <text x="283" y="42" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">GO</text>
    <text x="206" y="34" fontSize="6" fill={a} opacity="0.5">NO</text>
  </>),

  'robotics-lesson-010': (a) => V(<>
    {/* Power system: battery → regulator → components */}
    {/* Battery */}
    <rect x="14" y="38" width="44" height="38" rx="4" fill={a} opacity="0.6" />
    <rect x="24" y="30" width="24" height="10" rx="2" fill={a} opacity="0.5" />
    <text x="36" y="61" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">7.4V</text>
    <text x="36" y="73" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">LiPo</text>
    {/* Arrow */}
    <line x1="58" y1="57" x2="88" y2="57" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="88,51 102,57 88,63" fill={a} opacity="0.8" />
    {/* Regulator */}
    <rect x="102" y="42" width="52" height="30" rx="4" fill={a} opacity="0.4" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="128" y="61" textAnchor="middle" fontSize="7" fontWeight="bold" fill={a} opacity="0.9">REG</text>
    <text x="128" y="71" textAnchor="middle" fontSize="6" fill={a} opacity="0.7">5V out</text>
    {/* Fork to components */}
    <line x1="154" y1="57" x2="185" y2="57" stroke={a} strokeWidth="2" opacity="0.7" />
    <line x1="185" y1="28" x2="185" y2="90" stroke={a} strokeWidth="1.5" opacity="0.5" />
    {/* MCU */}
    <line x1="185" y1="35" x2="210" y2="35" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <rect x="210" y="25" width="50" height="22" rx="3" fill={a} opacity="0.5" />
    <text x="235" y="40" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">MCU</text>
    {/* Sensor */}
    <line x1="185" y1="57" x2="210" y2="57" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <rect x="210" y="47" width="50" height="22" rx="3" fill={a} opacity="0.4" />
    <text x="235" y="62" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">SENSOR</text>
    {/* Motor direct */}
    <line x1="185" y1="82" x2="210" y2="82" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <rect x="210" y="72" width="50" height="22" rx="3" fill={a} opacity="0.35" />
    <text x="235" y="87" textAnchor="middle" fontSize="8" fill={a} opacity="0.8">MOTOR</text>
    <text x="235" y="100" textAnchor="middle" fontSize="6" fill={a} opacity="0.5">7.4V direct</text>
    <line x1="58" y1="76" x2="210" y2="76" stroke={a} strokeWidth="1.5" opacity="0.35" strokeDasharray="4,3" />
  </>),

  /* ── ROBOTICS QUIZZES ── */

  'robotics-quiz-001': (a) => V(<>
    {/* Motor driver quiz: Arduino → driver → motor */}
    <rect x="18" y="35" width="62" height="44" rx="4" fill={a} opacity="0.45" />
    <text x="49" y="61" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">Arduino</text>
    <text x="49" y="72" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.7">5V/20mA</text>
    <line x1="80" y1="57" x2="112" y2="57" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="112,51 126,57 112,63" fill={a} opacity="0.8" />
    <rect x="126" y="35" width="66" height="44" rx="4" fill={a} opacity="0.7" stroke={a} strokeWidth="1.5" strokeOpacity="0.9" />
    <text x="159" y="58" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">L298N</text>
    <text x="159" y="70" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">DRIVER</text>
    <line x1="192" y1="57" x2="224" y2="57" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <polygon points="224,50 238,57 224,64" fill={a} opacity="0.9" />
    <circle cx="258" cy="57" r="22" fill="none" stroke={a} strokeWidth="2.5" opacity="0.8" />
    <text x="258" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>M</text>
    <text x="160" y="100" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">why is the driver needed?</text>
  </>),

  'robotics-quiz-002': (a) => V(<>
    {/* DC vs servo quiz */}
    <text x="75" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">DC MOTOR</text>
    <circle cx="75" cy="55" r="28" fill="none" stroke={a} strokeWidth="2" opacity="0.7" />
    <text x="75" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a}>M</text>
    <path d="M75,27 A28,28 0 0,1 103,55" fill="none" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="103,48 110,57 101,60" fill={a} opacity="0.8" />
    <text x="75" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">continuous spin</text>
    <line x1="155" y1="10" x2="155" y2="100" stroke={a} strokeWidth="1" opacity="0.2" />
    <text x="240" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">SERVO</text>
    <rect x="205" y="24" width="70" height="26" rx="5" fill={a} opacity="0.55" />
    <text x="240" y="41" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">SERVO</text>
    <path d="M216,84 A24,24 0 0,1 264,84" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="240" y1="84" x2="240" y2="58" stroke={a} strokeWidth="2.5" opacity="0.85" strokeLinecap="round" />
    <circle cx="240" cy="84" r="4" fill={a} opacity="0.9" />
    <text x="240" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">holds angle</text>
  </>),

  'robotics-quiz-003': (a) => V(<>
    {/* Arduino functions quiz: setup + loop boxes */}
    <rect x="28" y="18" width="120" height="80" rx="6" fill={a} opacity="0.12" stroke={a} strokeWidth="1.5" strokeOpacity="0.5" />
    <text x="88" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">setup()</text>
    <text x="88" y="54" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">runs once</text>
    <text x="88" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">on start</text>
    <line x1="148" y1="58" x2="172" y2="58" stroke={a} strokeWidth="2" opacity="0.6" />
    <polygon points="172,52 186,58 172,64" fill={a} opacity="0.7" />
    <rect x="172" y="18" width="120" height="80" rx="6" fill={a} opacity="0.25" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="232" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a}>loop()</text>
    <text x="232" y="54" textAnchor="middle" fontSize="8" fill={a} opacity="0.8">runs forever</text>
    <text x="232" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">∞ repeat</text>
    <path d="M292,98 Q320,108 320,58 Q320,8 292,18" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />
    <text x="160" y="108" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">what are the two required functions?</text>
  </>),

  'robotics-quiz-004': (a) => V(<>
    {/* PWM quiz: square wave */}
    <line x1="25" y1="82" x2="295" y2="82" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="25" y1="28" x2="295" y2="28" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="25" y1="82" x2="25" y2="20" stroke={a} strokeWidth="1" opacity="0.25" />
    <polyline points="30,82 30,28 85,28 85,82 115,82 115,28 170,28 170,82 200,82 200,28 255,28 255,82 285,82" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="square" opacity="0.9" />
    <text x="160" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">PWM = ?</text>
    <text x="160" y="103" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">Pulse _____ Modulation</text>
  </>),

  'robotics-quiz-005': (a) => V(<>
    {/* Sense-decide-act cycle: three nodes, clean circular flow */}
    <rect x="122" y="10" width="76" height="24" rx="12" fill={a} opacity="0.65" />
    <text x="160" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">SENSE</text>
    <rect x="212" y="72" width="76" height="24" rx="12" fill={a} opacity="0.45" />
    <text x="250" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">DECIDE</text>
    <rect x="32" y="72" width="76" height="24" rx="12" fill={a} opacity="0.55" />
    <text x="70" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">ACT</text>
    {/* SENSE → DECIDE */}
    <path d="M202,28 Q248,38 252,66" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
    <polygon points="247,64 252,74 257,63" fill={a} opacity="0.8" />
    {/* DECIDE → ACT */}
    <path d="M208,88 Q160,100 114,90" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
    <polygon points="118,84 108,89 119,95" fill={a} opacity="0.8" />
    {/* ACT → SENSE */}
    <path d="M66,68 Q72,38 116,25" fill="none" stroke={a} strokeWidth="2" opacity="0.6" strokeDasharray="5,4" />
    <polygon points="112,20 122,24 113,31" fill={a} opacity="0.8" />
    <text x="160" y="60" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">repeat forever</text>
  </>),

  /* ── ROBOTICS CHALLENGES ── */

  'robotics-challenge-001': (a) => V(<>
    {/* Line following: two sensors + line + decision */}
    <text x="160" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">LINE-FOLLOWING ROBOT</text>
    {/* Robot body */}
    <rect x="100" y="20" width="120" height="50" rx="6" fill={a} opacity="0.35" stroke={a} strokeWidth="1.5" strokeOpacity="0.6" />
    {/* IR sensors */}
    <circle cx="135" cy="75" r="10" fill={a} opacity="0.75" />
    <text x="135" y="79" textAnchor="middle" fontSize="7" fill="#fff">IR</text>
    <circle cx="185" cy="75" r="10" fill={a} opacity="0.35" />
    <text x="185" y="79" textAnchor="middle" fontSize="7" fill={a} opacity="0.7">IR</text>
    {/* Line on ground */}
    <rect x="150" y="88" width="10" height="22" rx="2" fill={a} opacity="0.85" />
    {/* Wheels */}
    <rect x="92" y="30" width="14" height="32" rx="4" fill={a} opacity="0.5" />
    <rect x="214" y="30" width="14" height="32" rx="4" fill={a} opacity="0.5" />
    <text x="50" y="95" fontSize="8" fill={a} opacity="0.6">left sees</text>
    <text x="50" y="105" fontSize="8" fill={a} opacity="0.6">line → turn</text>
    <text x="220" y="95" fontSize="8" fill={a} opacity="0.6">both off →</text>
    <text x="220" y="105" fontSize="8" fill={a} opacity="0.6">go straight</text>
  </>),

  'robotics-challenge-002': (a) => V(<>
    {/* Power system map: block diagram */}
    <text x="160" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">POWER SYSTEM DESIGN</text>
    {/* Battery */}
    <rect x="14" y="38" width="50" height="38" rx="4" fill={a} opacity="0.65" />
    <text x="39" y="59" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">LiPo</text>
    <text x="39" y="70" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">7.4V</text>
    <line x1="64" y1="57" x2="90" y2="57" stroke={a} strokeWidth="2" opacity="0.7" />
    <polygon points="90,51 104,57 90,63" fill={a} opacity="0.8" />
    {/* Regulator */}
    <rect x="104" y="42" width="52" height="30" rx="3" fill={a} opacity="0.45" stroke={a} strokeWidth="1.2" strokeOpacity="0.6" />
    <text x="130" y="61" textAnchor="middle" fontSize="7" fontWeight="bold" fill={a} opacity="0.9">5V REG</text>
    <line x1="156" y1="57" x2="182" y2="57" stroke={a} strokeWidth="2" opacity="0.6" />
    {/* Split */}
    <line x1="182" y1="35" x2="182" y2="82" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <line x1="182" y1="35" x2="215" y2="35" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="182" y1="57" x2="215" y2="57" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="182" y1="82" x2="215" y2="82" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <rect x="215" y="24" width="90" height="22" rx="3" fill={a} opacity="0.5" />
    <text x="260" y="39" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">Arduino</text>
    <rect x="215" y="48" width="90" height="18" rx="3" fill={a} opacity="0.35" />
    <text x="260" y="62" textAnchor="middle" fontSize="7" fill={a} opacity="0.9">HC-SR04</text>
    <rect x="215" y="70" width="90" height="22" rx="3" fill={a} opacity="0.4" />
    <text x="260" y="85" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.9">2× DC Motor</text>
    {/* Direct battery to motor line */}
    <line x1="39" y1="76" x2="39" y2="95" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />
    <line x1="39" y1="95" x2="260" y2="95" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />
    <line x1="260" y1="95" x2="260" y2="92" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />
    <text x="150" y="108" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">motors take full 7.4V directly</text>
  </>),

  'robotics-challenge-003': (a) => V(<>
    {/* Blink program: code structure visual */}
    <text x="160" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">ARDUINO BLINK</text>
    <rect x="20" y="18" width="280" height="84" rx="6" fill={a} opacity="0.06" stroke={a} strokeWidth="1.5" strokeOpacity="0.3" />
    <text x="35" y="36" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">setup() {'{'}</text>
    <text x="50" y="50" fontSize="8" fill={a} opacity="0.7">pinMode(13, OUTPUT);</text>
    <text x="35" y="62" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">{'}'}</text>
    <line x1="25" y1="66" x2="295" y2="66" stroke={a} strokeWidth="1" opacity="0.15" />
    <text x="35" y="76" fontSize="9" fontWeight="bold" fill={a}>loop() {'{'}</text>
    <text x="50" y="88" fontSize="8" fill={a} opacity="0.8">digitalWrite(13, HIGH); delay(500);</text>
    <text x="50" y="98" fontSize="8" fill={a} opacity="0.6">digitalWrite(13, LOW);  delay(500);</text>
    <text x="35" y="108" fontSize="9" fontWeight="bold" fill={a}>{'}'}</text>
    {/* Blinking LED indicator */}
    <circle cx="288" cy="55" r="10" fill={a} opacity="0.85" />
    <line x1="293" y1="45" x2="299" y2="38" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="298" y1="50" x2="306" y2="48" stroke={a} strokeWidth="1.5" opacity="0.5" />
  </>),

};

const CHANNEL_FALLBACK = {
  Finance: (a) => V(<>
    <rect x="60" y="60" width="18" height="25" rx="3" fill={a} opacity="0.4" />
    <rect x="86" y="45" width="18" height="40" rx="3" fill={a} opacity="0.6" />
    <rect x="112" y="32" width="18" height="53" rx="3" fill={a} opacity="0.8" />
    <rect x="138" y="18" width="18" height="67" rx="3" fill={a} />
    <polyline points="69,57 95,44 121,31 147,17" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    <ellipse cx="240" cy="72" rx="22" ry="6" fill={a} opacity="0.7" />
    <ellipse cx="240" cy="60" rx="22" ry="6" fill={a} opacity="0.8" />
    <ellipse cx="240" cy="48" rx="22" ry="6" fill={a} />
    <rect x="218" y="48" width="44" height="24" fill={a} opacity="0.8" />
    <text x="240" y="64" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">$</text>
  </>),
  Electronics: (a) => V(<>
    <rect x="55" y="22" width="210" height="68" rx="4" fill="none" stroke={a} strokeWidth="2" opacity="0.35" />
    <line x1="115" y1="22" x2="125" y2="22" stroke={a} strokeWidth="2" opacity="0.8" />
    <polyline points="125,22 128,15 132,29 136,15 140,29 144,15 148,29 152,22 156,22" fill="none" stroke={a} strokeWidth="2" opacity="0.8" />
    <line x1="156" y1="22" x2="196" y2="22" stroke={a} strokeWidth="2" opacity="0.8" />
    <polygon points="235,32 235,62 260,47" fill={a} opacity="0.7" />
    <line x1="260" y1="32" x2="260" y2="62" stroke={a} strokeWidth="2.5" opacity="0.9" />
    <line x1="265" y1="39" x2="275" y2="33" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="265" y1="47" x2="277" y2="47" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="265" y1="55" x2="275" y2="61" stroke={a} strokeWidth="1.5" opacity="0.6" />
  </>),
  Robotics: (a) => V(<>
    <rect x="115" y="22" width="90" height="65" rx="6" fill="none" stroke={a} strokeWidth="2" opacity="0.8" />
    <text x="160" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">MCU</text>
    <line x1="95" y1="32" x2="115" y2="32" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="95" y1="44" x2="115" y2="44" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="95" y1="56" x2="115" y2="56" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="95" y1="68" x2="115" y2="68" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="205" y1="32" x2="225" y2="32" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="205" y1="44" x2="225" y2="44" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="205" y1="56" x2="225" y2="56" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <line x1="205" y1="68" x2="225" y2="68" stroke={a} strokeWidth="1.5" opacity="0.7" />
    <polyline points="48,82 48,52 61,52 61,82 74,82 74,52 87,52 87,82" fill="none" stroke={a} strokeWidth="2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="268" cy="55" r="22" fill="none" stroke={a} strokeWidth="2" opacity="0.7" />
    <text x="268" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill={a} opacity="0.9">M</text>
  </>),
};

export default function CardVisual({ card }) {
  const accent =
    card.channel === 'Finance' ? '#10b981' :
    card.channel === 'Electronics' ? '#3b82f6' :
    '#a78bfa';

  const render =
    VISUALS[card.id] ||
    FinanceVisualsL2[card.id] ||
    ElectronicsVisualsL2[card.id] ||
    RoboticsVisualsL2[card.id] ||
    CHANNEL_FALLBACK[card.channel];
  if (!render) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${accent}14 0%, transparent 60%)`,
        borderBottom: `1px solid ${accent}1f`,
      }}
    >
      {render(accent)}
    </div>
  );
}
