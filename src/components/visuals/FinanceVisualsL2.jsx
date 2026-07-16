const V = (children) => (
  <svg viewBox="0 0 320 110" width="100%" style={{ display: 'block' }}>
    {children}
  </svg>
);

export default {

  /* ── FINANCE LESSONS 101–110 ── */

  'finance-lesson-101': (a) => V(<>
    {/* Emergency fund: umbrella sheltering coin stack */}
    <path d="M110,42 Q80,14 50,42 Q60,34 70,42 Q80,32 90,42 Q100,32 110,42 Z" fill={a} opacity="0.8" />
    <path d="M110,42 Q140,14 170,42 Q160,34 150,42 Q140,32 130,42 Q120,32 110,42 Z" fill={a} opacity="0.6" />
    <line x1="110" y1="42" x2="110" y2="88" stroke={a} strokeWidth="2.5" opacity="0.7" />
    <path d="M110,88 Q110,96 102,96" fill="none" stroke={a} strokeWidth="2.5" opacity="0.7" />
    {/* Coin stack under umbrella */}
    <ellipse cx="140" cy="92" rx="22" ry="6" fill={a} opacity="0.85" />
    <ellipse cx="140" cy="84" rx="22" ry="6" fill={a} opacity="0.65" />
    <ellipse cx="140" cy="76" rx="22" ry="6" fill={a} opacity="0.5" />
    <ellipse cx="140" cy="68" rx="22" ry="6" fill={a} opacity="0.35" />
    <text x="140" y="63" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.7">$</text>
    {/* Rain outside the umbrella */}
    <line x1="210" y1="20" x2="205" y2="32" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <line x1="230" y1="34" x2="225" y2="46" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <line x1="215" y1="52" x2="210" y2="64" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <line x1="235" y1="66" x2="230" y2="78" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <text x="255" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">3–6</text>
    <text x="255" y="60" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">MONTHS</text>
    <text x="160" y="104" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">cash sheltered from surprises</text>
  </>),

  'finance-lesson-102': (a) => V(<>
    {/* Index vs picking: one dart at a single dot vs net over many dots */}
    <text x="80" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.5">PICK ONE</text>
    {/* Single stock target + dart */}
    <circle cx="80" cy="58" r="16" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4" />
    <circle cx="80" cy="58" r="7" fill={a} opacity="0.4" />
    <line x1="30" y1="88" x2="74" y2="62" stroke={a} strokeWidth="2" opacity="0.5" />
    <polygon points="78,59 68,61 72,68" fill={a} opacity="0.6" />
    <text x="80" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">hard to hit</text>
    {/* Divider */}
    <line x1="160" y1="12" x2="160" y2="100" stroke={a} strokeWidth="1" opacity="0.2" strokeDasharray="4,4" />
    {/* Index: wide net over many dots */}
    <text x="240" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">OWN THEM ALL</text>
    {[0, 1, 2, 3].map(col => [0, 1].map(row => (
      <circle key={`${col}-${row}`} cx={198 + col * 28} cy={48 + row * 26} r="7" fill={a} opacity={0.35 + (col + row) * 0.09} />
    )))}
    <rect x="182" y="30" width="116" height="60" rx="8" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <line x1="182" y1="60" x2="298" y2="60" stroke={a} strokeWidth="1" opacity="0.25" />
    <line x1="240" y1="30" x2="240" y2="90" stroke={a} strokeWidth="1" opacity="0.25" />
    <text x="240" y="102" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">the whole market wins</text>
  </>),

  'finance-lesson-103': (a) => V(<>
    {/* DCA: wiggly price line with equal buy dots at intervals */}
    <line x1="30" y1="86" x2="295" y2="86" stroke={a} strokeWidth="1" opacity="0.25" />
    <polyline points="40,50 75,64 110,36 145,58 180,44 215,66 250,40 285,30" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
    {/* Equal-sized buy dots at every interval */}
    <circle cx="40" cy="50" r="6" fill={a} opacity="0.9" />
    <circle cx="75" cy="64" r="6" fill={a} opacity="0.9" />
    <circle cx="110" cy="36" r="6" fill={a} opacity="0.9" />
    <circle cx="145" cy="58" r="6" fill={a} opacity="0.9" />
    <circle cx="180" cy="44" r="6" fill={a} opacity="0.9" />
    <circle cx="215" cy="66" r="6" fill={a} opacity="0.9" />
    <circle cx="250" cy="40" r="6" fill={a} opacity="0.9" />
    <circle cx="285" cy="30" r="6" fill={a} opacity="0.9" />
    {/* Tick marks per month */}
    {[40, 75, 110, 145, 180, 215, 250, 285].map(x => (
      <line key={x} x1={x} y1="83" x2={x} y2="89" stroke={a} strokeWidth="1.5" opacity="0.5" />
    ))}
    <text x="40" y="99" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">Jan</text>
    <text x="145" y="99" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">Apr</text>
    <text x="250" y="99" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">Jul</text>
    <text x="160" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">SAME $ EVERY MONTH</text>
  </>),

  'finance-lesson-104': (a) => V(<>
    {/* Tax-advantaged: shield in front of growing bars */}
    {/* Growing money bars behind */}
    <rect x="160" y="70" width="24" height="24" rx="2" fill={a} opacity="0.35" />
    <rect x="192" y="54" width="24" height="40" rx="2" fill={a} opacity="0.5" />
    <rect x="224" y="36" width="24" height="58" rx="2" fill={a} opacity="0.65" />
    <rect x="256" y="20" width="24" height="74" rx="2" fill={a} opacity="0.8" />
    <text x="268" y="34" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">$</text>
    <line x1="150" y1="94" x2="292" y2="94" stroke={a} strokeWidth="1" opacity="0.3" />
    {/* Shield */}
    <path d="M80,20 L118,32 L118,60 Q118,86 80,98 Q42,86 42,60 L42,32 Z" fill={a} opacity="0.85" />
    <text x="80" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">401(k)</text>
    <text x="80" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff" opacity="0.85">ROTH</text>
    {/* Tax arrows blocked by shield */}
    <line x1="12" y1="40" x2="36" y2="46" stroke={a} strokeWidth="2" opacity="0.4" />
    <line x1="12" y1="66" x2="36" y2="62" stroke={a} strokeWidth="2" opacity="0.4" />
    <text x="22" y="32" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">TAX</text>
    <text x="160" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">TAXES BLOCKED</text>
    <text x="220" y="106" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">growth kept, not taxed</text>
  </>),

  'finance-lesson-105': (a) => V(<>
    {/* Inflation: same cup, rising price tags, shrinking dollar */}
    {/* Cup 1 */}
    <path d="M40,58 L44,84 L72,84 L76,58 Z" fill={a} opacity="0.4" />
    <path d="M76,62 Q86,64 76,74" fill="none" stroke={a} strokeWidth="2" opacity="0.4" />
    <rect x="42" y="30" width="34" height="16" rx="3" fill={a} opacity="0.4" />
    <text x="59" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">$3</text>
    <text x="58" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">2020</text>
    {/* Cup 2 */}
    <path d="M112,58 L116,84 L144,84 L148,58 Z" fill={a} opacity="0.6" />
    <path d="M148,62 Q158,64 148,74" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
    <rect x="112" y="24" width="36" height="18" rx="3" fill={a} opacity="0.6" />
    <text x="130" y="37" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">$4</text>
    <text x="130" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">2023</text>
    {/* Cup 3 */}
    <path d="M184,58 L188,84 L216,84 L220,58 Z" fill={a} opacity="0.85" />
    <path d="M220,62 Q230,64 220,74" fill="none" stroke={a} strokeWidth="2" opacity="0.85" />
    <rect x="182" y="18" width="40" height="20" rx="3" fill={a} opacity="0.85" />
    <text x="202" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">$5</text>
    <text x="202" y="98" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">2026</text>
    {/* Shrinking dollar */}
    <rect x="248" y="34" width="52" height="28" rx="3" fill="none" stroke={a} strokeWidth="1.5" opacity="0.6" />
    <text x="274" y="53" textAnchor="middle" fontSize="12" fontWeight="bold" fill={a} opacity="0.7">$1</text>
    <text x="274" y="76" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">buys less</text>
    <text x="274" y="88" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">every year ↓</text>
  </>),

  'finance-lesson-106': (a) => V(<>
    {/* Credit score gauge 300–850, needle in good zone (center 160,92 r=78) */}
    <path d="M82,89.3 A78,78 0 0,1 103,38.8" fill="none" stroke={a} strokeWidth="11" opacity="0.2" strokeLinecap="round" />
    <path d="M106.8,34.9 A78,78 0 0,1 213.2,34.9" fill="none" stroke={a} strokeWidth="11" opacity="0.45" strokeLinecap="round" />
    <path d="M217,38.8 A78,78 0 0,1 238,89.3" fill="none" stroke={a} strokeWidth="11" opacity="0.85" strokeLinecap="round" />
    <text x="76" y="104" textAnchor="middle" fontSize="9" fill={a} opacity="0.5">300</text>
    <text x="160" y="26" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">FAIR</text>
    <text x="244" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">850</text>
    {/* Needle pointing into good zone */}
    <line x1="160" y1="92" x2="208" y2="57" stroke={a} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <circle cx="160" cy="92" r="7" fill={a} opacity="0.9" />
    <text x="160" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill={a} opacity="0.9">740</text>
    <text x="272" y="64" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">GOOD</text>
  </>),

  'finance-lesson-107': (a) => V(<>
    {/* Snowball vs avalanche: two ordered debt stacks */}
    <text x="80" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">SNOWBALL</text>
    <text x="80" y="26" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">smallest first</text>
    <rect x="55" y="32" width="50" height="14" rx="3" fill={a} opacity="0.9" />
    <text x="80" y="42" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">$500 ①</text>
    <rect x="45" y="50" width="70" height="18" rx="3" fill={a} opacity="0.5" />
    <text x="80" y="62" textAnchor="middle" fontSize="8" fill="#fff">$2,000</text>
    <rect x="35" y="72" width="90" height="22" rx="3" fill={a} opacity="0.3" />
    <text x="80" y="86" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">$5,000</text>
    {/* Divider */}
    <line x1="160" y1="12" x2="160" y2="100" stroke={a} strokeWidth="1" opacity="0.2" strokeDasharray="4,4" />
    <text x="240" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">AVALANCHE</text>
    <text x="240" y="26" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">highest % first</text>
    <rect x="200" y="32" width="80" height="18" rx="3" fill={a} opacity="0.9" />
    <text x="240" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">25% ①</text>
    <rect x="205" y="54" width="70" height="18" rx="3" fill={a} opacity="0.5" />
    <text x="240" y="66" textAnchor="middle" fontSize="8" fill="#fff">18%</text>
    <rect x="210" y="76" width="60" height="18" rx="3" fill={a} opacity="0.3" />
    <text x="240" y="88" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">6%</text>
  </>),

  'finance-lesson-108': (a) => V(<>
    {/* Diversification: one basket crossed out vs eggs in three baskets */}
    {/* One basket, all eggs, crossed */}
    <path d="M40,60 L48,88 L96,88 L104,60 Z" fill={a} opacity="0.3" />
    <path d="M52,60 Q72,40 92,60" fill="none" stroke={a} strokeWidth="2" opacity="0.3" />
    <ellipse cx="58" cy="56" rx="6" ry="8" fill={a} opacity="0.5" />
    <ellipse cx="72" cy="54" rx="6" ry="8" fill={a} opacity="0.5" />
    <ellipse cx="86" cy="56" rx="6" ry="8" fill={a} opacity="0.5" />
    <ellipse cx="65" cy="66" rx="6" ry="8" fill={a} opacity="0.45" />
    <ellipse cx="80" cy="66" rx="6" ry="8" fill={a} opacity="0.45" />
    <line x1="34" y1="34" x2="110" y2="96" stroke={a} strokeWidth="3" opacity="0.7" strokeLinecap="round" />
    <line x1="110" y1="34" x2="34" y2="96" stroke={a} strokeWidth="3" opacity="0.7" strokeLinecap="round" />
    <text x="72" y="103" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">one trip = all broken</text>
    {/* Three baskets, eggs split */}
    {[0, 1, 2].map(i => (
      <g key={i}>
        <path d={`M${152 + i * 56},64 L${158 + i * 56},86 L${186 + i * 56},86 L${192 + i * 56},64 Z`} fill={a} opacity="0.55" />
        <path d={`M${160 + i * 56},64 Q${172 + i * 56},50 ${184 + i * 56},64`} fill="none" stroke={a} strokeWidth="2" opacity="0.55" />
        <ellipse cx={166 + i * 56} cy={60} rx="5" ry="7" fill={a} opacity="0.85" />
        <ellipse cx={178 + i * 56} cy={60} rx="5" ry="7" fill={a} opacity="0.85" />
      </g>
    ))}
    <text x="228" y="103" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">spread the eggs ✓</text>
    <text x="228" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">DIVERSIFY</text>
  </>),

  'finance-lesson-109': (a) => V(<>
    {/* Income streams: three streams merging into one pool */}
    <text x="55" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">JOB</text>
    <text x="160" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">SIDE HUSTLE</text>
    <text x="265" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.7">INVESTMENTS</text>
    <rect x="37" y="24" width="36" height="14" rx="3" fill={a} opacity="0.8" />
    <text x="55" y="34" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">$$$</text>
    <rect x="142" y="24" width="36" height="14" rx="3" fill={a} opacity="0.55" />
    <text x="160" y="34" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">$$</text>
    <rect x="247" y="24" width="36" height="14" rx="3" fill={a} opacity="0.4" />
    <text x="265" y="34" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">$</text>
    {/* Streams curving into pool */}
    <path d="M55,40 Q55,62 130,72" fill="none" stroke={a} strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    <path d="M160,40 Q160,58 160,68" fill="none" stroke={a} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    <path d="M265,40 Q265,62 190,72" fill="none" stroke={a} strokeWidth="3" opacity="0.4" strokeLinecap="round" />
    {/* Pool */}
    <ellipse cx="160" cy="84" rx="52" ry="14" fill={a} opacity="0.8" />
    <text x="160" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">ONE POOL</text>
    <text x="160" y="107" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">if one stream stops, money still flows</text>
  </>),

  'finance-lesson-110': (a) => V(<>
    {/* 4% rule: big pie with thin slice withdrawn */}
    <circle cx="105" cy="58" r="42" fill={a} opacity="0.75" />
    {/* Thin 4% slice pulled out (wedge offset from center 105,58 r=42) */}
    <path d="M107.7,52.7 L122.1,13.2 A42,42 0 0,1 131.2,17.9 Z" fill={a} opacity="0.95" />
    <text x="102" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">YOUR</text>
    <text x="102" y="68" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">INVESTMENTS</text>
    {/* Callout to slice */}
    <line x1="140" y1="16" x2="176" y2="26" stroke={a} strokeWidth="1" opacity="0.4" />
    <text x="182" y="30" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">4% / year</text>
    <text x="182" y="43" fontSize="8" fill={a} opacity="0.6">withdrawn to live on</text>
    <text x="182" y="66" fontSize="9" fill={a} opacity="0.7">the other 96%</text>
    <text x="182" y="78" fontSize="9" fill={a} opacity="0.7">keeps growing</text>
    <text x="182" y="97" fontSize="9" fontWeight="bold" fill={a} opacity="0.9">expenses × 25 = freedom</text>
  </>),

  /* ── FINANCE QUIZZES 101–105 ── */

  'finance-quiz-101': (a) => V(<>
    {/* Emergency fund quiz: umbrella + how many months? */}
    <path d="M100,48 Q70,20 40,48 Q50,40 60,48 Q70,38 80,48 Q90,38 100,48 Z" fill={a} opacity="0.75" />
    <path d="M100,48 Q130,20 160,48 Q150,40 140,48 Q130,38 120,48 Q110,38 100,48 Z" fill={a} opacity="0.55" />
    <line x1="100" y1="48" x2="100" y2="88" stroke={a} strokeWidth="2.5" opacity="0.6" />
    <path d="M100,88 Q100,96 92,96" fill="none" stroke={a} strokeWidth="2.5" opacity="0.6" />
    <text x="225" y="52" textAnchor="middle" fontSize="34" fontWeight="bold" fill={a} opacity="0.8">?</text>
    <text x="225" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.7">HOW MANY MONTHS?</text>
    <text x="160" y="104" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">size your rainy-day fund</text>
  </>),

  'finance-quiz-102': (a) => V(<>
    {/* DCA quiz: calendar grid with equal $ marks */}
    <rect x="70" y="14" width="140" height="82" rx="6" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <rect x="70" y="14" width="140" height="18" rx="6" fill={a} opacity="0.7" />
    <text x="140" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">EVERY MONTH</text>
    {[0, 1, 2, 3].map(col => [0, 1].map(row => (
      <g key={`${col}-${row}`}>
        <rect x={80 + col * 31} y={40 + row * 26} width="25" height="20" rx="3" fill={a} opacity="0.2" />
        <text x={92.5 + col * 31} y={54 + row * 26} textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.85">$</text>
      </g>
    )))}
    <text x="255" y="60" textAnchor="middle" fontSize="32" fontWeight="bold" fill={a} opacity="0.8">?</text>
    <text x="255" y="82" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">what is this</text>
    <text x="255" y="92" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">strategy called?</text>
  </>),

  'finance-quiz-103': (a) => V(<>
    {/* Inflation quiz: price tag growing along arrow */}
    <line x1="30" y1="86" x2="270" y2="34" stroke={a} strokeWidth="2" opacity="0.4" />
    <polygon points="278,32 262,28 266,42" fill={a} opacity="0.5" />
    {/* Growing price tags along arrow */}
    <rect x="42" y="52" width="30" height="18" rx="3" fill={a} opacity="0.35" />
    <circle cx="48" cy="58" r="2" fill="#fff" opacity="0.6" />
    <text x="60" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">$2</text>
    <rect x="128" y="34" width="38" height="24" rx="3" fill={a} opacity="0.55" />
    <circle cx="135" cy="42" r="2.5" fill="#fff" opacity="0.7" />
    <text x="150" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">$4</text>
    <rect x="216" y="42" width="46" height="30" rx="3" fill={a} opacity="0.85" />
    <circle cx="225" cy="52" r="3" fill="#fff" opacity="0.8" />
    <text x="243" y="63" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">$6</text>
    <text x="288" y="70" textAnchor="middle" fontSize="26" fontWeight="bold" fill={a} opacity="0.8">?</text>
    <text x="160" y="102" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.7">what happens to cash in a drawer?</text>
  </>),

  'finance-quiz-104': (a) => V(<>
    {/* Avalanche quiz: two debt cards with % labels */}
    <rect x="42" y="24" width="100" height="58" rx="6" fill={a} opacity="0.25" />
    <line x1="42" y1="44" x2="142" y2="44" stroke={a} strokeWidth="1.5" opacity="0.3" />
    <text x="92" y="38" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">STORE CARD</text>
    <text x="92" y="64" textAnchor="middle" fontSize="14" fontWeight="bold" fill={a} opacity="0.7">10%</text>
    <text x="92" y="76" textAnchor="middle" fontSize="7" fill={a} opacity="0.5">$500 balance</text>
    <rect x="178" y="24" width="100" height="58" rx="6" fill={a} opacity="0.8" />
    <line x1="178" y1="44" x2="278" y2="44" stroke="#fff" strokeWidth="1.5" opacity="0.25" />
    <text x="228" y="38" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.85">CREDIT CARD</text>
    <text x="228" y="64" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">25%</text>
    <text x="228" y="76" textAnchor="middle" fontSize="7" fill="#fff" opacity="0.7">$3,000 balance</text>
    <text x="160" y="60" textAnchor="middle" fontSize="12" fill={a} opacity="0.5">vs</text>
    <text x="160" y="102" textAnchor="middle" fontSize="11" fontWeight="bold" fill={a} opacity="0.9">WHICH FIRST?</text>
  </>),

  'finance-quiz-105': (a) => V(<>
    {/* 4% rule quiz: $1,000,000 → 4% = ? */}
    <rect x="30" y="36" width="130" height="40" rx="6" fill={a} opacity="0.8" />
    <text x="95" y="61" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">$1,000,000</text>
    <text x="95" y="28" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">INVESTED</text>
    <line x1="168" y1="56" x2="210" y2="56" stroke={a} strokeWidth="2.5" opacity="0.6" />
    <polygon points="220,56 206,49 206,63" fill={a} opacity="0.7" />
    <text x="262" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill={a} opacity="0.9">4% = ?</text>
    <text x="262" y="68" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">per year</text>
    <text x="160" y="100" textAnchor="middle" fontSize="9" fill={a} opacity="0.6">how much can you withdraw each year?</text>
  </>),

  /* ── FINANCE CHALLENGES 101–103 ── */

  'finance-challenge-101': (a) => V(<>
    {/* Starter emergency fund: jar with first coin dropping in */}
    <path d="M108,38 L108,86 Q108,96 118,96 L162,96 Q172,96 172,86 L172,38 Z" fill={a} opacity="0.2" />
    <rect x="102" y="28" width="76" height="10" rx="3" fill={a} opacity="0.6" />
    {/* Coins settled at bottom */}
    <ellipse cx="128" cy="88" rx="10" ry="4" fill={a} opacity="0.7" />
    <ellipse cx="150" cy="88" rx="10" ry="4" fill={a} opacity="0.6" />
    {/* Coin dropping in */}
    <circle cx="140" cy="14" r="8" fill={a} opacity="0.9" />
    <text x="140" y="17.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">$</text>
    <line x1="140" y1="44" x2="140" y2="52" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="2,3" />
    <line x1="140" y1="58" x2="140" y2="66" stroke={a} strokeWidth="1.5" opacity="0.4" strokeDasharray="2,3" />
    {/* Goal label */}
    <text x="245" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill={a} opacity="0.9">START WITH</text>
    <text x="245" y="64" textAnchor="middle" fontSize="16" fontWeight="bold" fill={a}>$500</text>
    <text x="245" y="80" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">automatic · every week</text>
    <text x="62" y="66" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">EMERGENCIES</text>
    <text x="62" y="77" textAnchor="middle" fontSize="8" fill={a} opacity="0.6">ONLY</text>
  </>),

  'finance-challenge-102': (a) => V(<>
    {/* Check your score: magnifier over a credit gauge */}
    <path d="M88.2,83.7 A62,62 0 0,1 109.3,41.2" fill="none" stroke={a} strokeWidth="9" opacity="0.25" strokeLinecap="round" />
    <path d="M112.7,38.5 A62,62 0 0,1 187.3,38.5" fill="none" stroke={a} strokeWidth="9" opacity="0.45" strokeLinecap="round" />
    <path d="M190.7,41.2 A62,62 0 0,1 211.9,83.7" fill="none" stroke={a} strokeWidth="9" opacity="0.7" strokeLinecap="round" />
    <line x1="150" y1="88" x2="187" y2="57" stroke={a} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <circle cx="150" cy="88" r="5" fill={a} opacity="0.7" />
    <text x="80" y="100" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">300</text>
    <text x="221" y="100" textAnchor="middle" fontSize="8" fill={a} opacity="0.7">850</text>
    {/* Magnifier over the gauge */}
    <circle cx="196" cy="42" r="26" fill={a} opacity="0.12" />
    <circle cx="196" cy="42" r="26" fill="none" stroke={a} strokeWidth="3" opacity="0.85" />
    <line x1="215" y1="61" x2="238" y2="84" stroke={a} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
    <text x="196" y="47" textAnchor="middle" fontSize="12" fontWeight="bold" fill={a} opacity="0.95">?</text>
    <text x="60" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">FIND YOUR</text>
    <text x="60" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill={a} opacity="0.8">NUMBER</text>
  </>),

  'finance-challenge-103': (a) => V(<>
    {/* Map your debts: checklist with rates, one circled */}
    <rect x="70" y="10" width="180" height="92" rx="6" fill={a} opacity="0.07" stroke={a} strokeWidth="1.5" strokeOpacity="0.3" />
    <text x="160" y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill={a} opacity="0.9">YOUR DEBT MAP</text>
    <line x1="84" y1="32" x2="236" y2="32" stroke={a} strokeWidth="1" opacity="0.2" />
    <rect x="86" y="40" width="8" height="8" rx="2" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="100" y="48" fontSize="9" fill={a} opacity="0.7">Store card</text>
    <text x="226" y="48" textAnchor="end" fontSize="9" fill={a} opacity="0.7">10%</text>
    <rect x="86" y="58" width="8" height="8" rx="2" fill={a} opacity="0.8" />
    <text x="100" y="66" fontSize="9" fontWeight="bold" fill={a} opacity="0.95">Credit card</text>
    <text x="226" y="66" textAnchor="end" fontSize="9" fontWeight="bold" fill={a}>25%</text>
    {/* Circle around the first target */}
    <ellipse cx="160" cy="62" rx="82" ry="12" fill="none" stroke={a} strokeWidth="2" opacity="0.85" />
    <rect x="86" y="76" width="8" height="8" rx="2" fill="none" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="100" y="84" fontSize="9" fill={a} opacity="0.7">Car loan</text>
    <text x="226" y="84" textAnchor="end" fontSize="9" fill={a} opacity="0.7">6%</text>
    <text x="160" y="97" textAnchor="middle" fontSize="8" fill={a} opacity="0.5">circle your first target · attack it</text>
    <line x1="252" y1="62" x2="272" y2="52" stroke={a} strokeWidth="1.5" opacity="0.5" />
    <text x="282" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill={a} opacity="0.8">FIRST</text>
  </>),

};
