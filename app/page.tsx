'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─────────────────────────────────────────────────────────
// HERO DASHBOARD — Rebuilt right panel
// 5-row layout: header · rate grid · capacity+feed · products · stats
// ─────────────────────────────────────────────────────────
function HeroDashboard() {
  const [tick, setTick] = useState(0)
  const [activeFeed, setActiveFeed] = useState(0)

  useEffect(() => {
    const rate = setInterval(() => setTick(t => t + 1), 3000)
    const feed = setInterval(() => setActiveFeed(t => (t + 1) % 4), 2400)
    return () => { clearInterval(rate); clearInterval(feed) }
  }, [])

  const RATES = [
    { label: 'SBA 7(a)',      rate: '6.50%', change: '+0.12', up: true,  type: 'Govt Backed'  },
    { label: 'DSCR 30yr',    rate: '7.85%', change: '-0.08', up: false, type: 'Investor Loan' },
    { label: 'Hard Money',   rate: '11.0%', change: '+0.25', up: true,  type: 'Asset Based'   },
    { label: 'Bridge',       rate: '9.25%', change: '-0.15', up: false, type: 'Short Term'    },
    { label: 'Construction', rate: '10.5%', change: '+0.10', up: true,  type: 'Build Finance' },
    { label: 'MCA',          rate: '1.35×', change: '-0.05', up: false, type: 'Revenue Based' },
  ]

  const FEED = [
    { type: 'FUNDED',   label: 'Commercial Acquisition',  amt: '$2.4M', time: '2h ago',  pct: 92  },
    { type: 'APPROVED', label: 'DSCR Investor Portfolio', amt: '$850K', time: '5h ago',  pct: 78  },
    { type: 'FUNDED',   label: 'Bridge → Perm Refi',      amt: '$1.1M', time: '1d ago',  pct: 85  },
    { type: 'CLOSED',   label: 'Hard Money Fix & Flip',   amt: '$430K', time: '2d ago',  pct: 100 },
  ]

  const PRODUCTS = [
    { name: 'SBA',         range: '$50K–$5M'   },
    { name: 'Commercial',  range: 'Up to 75%'  },
    { name: 'Hard Money',  range: '48hr Close' },
    { name: 'DSCR',        range: 'No W-2'     },
    { name: 'Bridge',      range: '7–14 Days'  },
    { name: 'MCA',         range: '24–72hr'    },
  ]

  const activeRate = tick % RATES.length

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none px-6 py-8">

      {/* Background grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.035) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

      {/* Radial glow */}
      <div className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 80% 70% at 55% 45%,rgba(201,168,76,0.05) 0%,transparent 65%)' }} />

      <div className="relative z-10 w-full max-w-[500px] space-y-3">

        {/* ══ ROW 1: LIVE HEADER BAR ══ */}
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(201,168,76,0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <div className="absolute w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: '#22c55e', opacity: 0.35 }} />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em]" style={{ color: '#374151' }}>
              LIVE MARKET RATES
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-px h-3" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />
            <span className="text-[10px] font-semibold" style={{ color: '#C9A84C' }}>6 Products Active</span>
          </div>
        </div>

        {/* ══ ROW 2: 3-COL RATE CARDS ══ */}
        <div className="grid grid-cols-3 gap-2">
          {RATES.map((r, i) => (
            <div key={r.label}
              className="rounded-xl px-3 py-3.5 relative overflow-hidden transition-all duration-700"
              style={{
                backgroundColor: i === activeRate ? 'rgba(255,249,237,0.98)' : 'rgba(255,255,255,0.78)',
                border: `1px solid ${i === activeRate ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
                boxShadow: i === activeRate
                  ? '0 8px 32px rgba(201,168,76,0.18),0 0 0 1px rgba(201,168,76,0.1)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
                transform: i === activeRate ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
                backdropFilter: 'blur(16px)',
              }}>

              {/* Active shimmer */}
              {i === activeRate && (
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundImage: 'linear-gradient(90deg,transparent,#C9A84C 40%,#E2C97E 60%,transparent)' }} />
              )}

              <div className="flex items-start justify-between mb-1.5">
                <span className="text-[8px] font-black tracking-[0.12em] uppercase leading-tight"
                  style={{ color: i === activeRate ? 'rgba(201,168,76,0.9)' : '#9CA3AF' }}>
                  {r.type}
                </span>
                <span className="text-[9px] font-black" style={{ color: r.up ? '#ef4444' : '#22c55e' }}>
                  {r.up ? '↑' : '↓'}{r.change}
                </span>
              </div>

              <div className="font-black leading-none mb-1"
                style={{ fontSize: 'clamp(0.9rem,2vw,1.15rem)', color: i === activeRate ? '#0A0A0A' : '#1F2937' }}>
                {r.rate}
              </div>
              <div className="text-[8px] font-semibold" style={{ color: '#6B7280' }}>{r.label}</div>
            </div>
          ))}
        </div>

        {/* ══ ROW 3: CAPACITY (left) + FEED (right) ══ */}
        <div className="grid grid-cols-[1.1fr_1fr] gap-2">

          {/* Capital capacity */}
          <div className="rounded-xl p-4"
            style={{
              backgroundColor: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(201,168,76,0.16)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[9px] font-black tracking-[0.2em]" style={{ color: '#374151' }}>CAPACITY</span>
              <span className="text-[8px] font-bold" style={{ color: '#C9A84C' }}>$50K–$50M+</span>
            </div>
            {[
              { label: 'Commercial RE',    pct: 88 },
              { label: 'Business Capital', pct: 74 },
              { label: 'Construction',     pct: 65 },
              { label: 'Hard Money',       pct: 92 },
            ].map((bar, bi) => (
              <div key={bar.label} className={bi < 3 ? 'mb-2.5' : ''}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-semibold" style={{ color: '#9CA3AF' }}>{bar.label}</span>
                  <span className="text-[8px] font-black" style={{ color: '#C9A84C' }}>{bar.pct}%</span>
                </div>
                <div className="h-[5px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${bar.pct}%`, backgroundImage: 'linear-gradient(90deg,#C9A84C,#E2C97E)', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Live transaction feed */}
          <div className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(201,168,76,0.16)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
            <div className="flex items-center justify-between px-3.5 py-2.5"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <span className="text-[9px] font-black tracking-[0.18em]" style={{ color: '#374151' }}>RECENT</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22c55e', animation: 'pulse 2s infinite' }} />
                <span className="text-[8px] font-bold" style={{ color: '#9CA3AF' }}>live</span>
              </div>
            </div>
            {FEED.map((item, i) => (
              <div key={i} className="px-3.5 py-2.5 transition-all duration-500"
                style={{
                  borderBottom: i < FEED.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none',
                  backgroundColor: i === activeFeed ? 'rgba(255,249,237,0.7)' : 'transparent',
                }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: item.type === 'FUNDED'
                        ? 'rgba(34,197,94,0.12)' : item.type === 'APPROVED'
                        ? 'rgba(201,168,76,0.14)' : 'rgba(59,130,246,0.1)',
                      color: item.type === 'FUNDED'
                        ? '#16a34a' : item.type === 'APPROVED'
                        ? '#92660A' : '#2563eb',
                    }}>
                    {item.type}
                  </span>
                  <span className="text-[9px] font-black" style={{ color: '#C9A84C' }}>{item.amt}</span>
                </div>
                <div className="text-[8px] font-semibold truncate mb-1.5" style={{ color: '#374151' }}>{item.label}</div>
                {/* Mini progress bar */}
                <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                  <div className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    style={{
                      width: i === activeFeed ? `${item.pct}%` : '0%',
                      backgroundImage: 'linear-gradient(90deg,#C9A84C,#E2C97E)',
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ ROW 4: PRODUCT TAGS ══ */}
        <div className="rounded-xl px-4 py-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(201,168,76,0.14)',
            backdropFilter: 'blur(16px)',
          }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[9px] font-black tracking-[0.28em]" style={{ color: '#374151' }}>
              FINANCING PRODUCTS
            </span>
            <div className="flex-1 h-px" style={{ backgroundImage: 'linear-gradient(to right,rgba(201,168,76,0.2),transparent)' }} />
            <span className="text-[8px] font-semibold" style={{ color: '#9CA3AF' }}>8 available</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRODUCTS.map((p, i) => (
              <div key={p.name}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-500"
                style={{
                  backgroundColor: i === tick % PRODUCTS.length
                    ? 'rgba(201,168,76,0.16)' : 'rgba(201,168,76,0.05)',
                  border: `1px solid ${i === tick % PRODUCTS.length ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.1)'}`,
                }}>
                <span className="text-[9px] font-black"
                  style={{ color: i === tick % PRODUCTS.length ? '#92660A' : '#374151' }}>
                  {p.name}
                </span>
                <div className="w-px h-2.5" style={{ backgroundColor: 'rgba(201,168,76,0.25)' }} />
                <span className="text-[8px] font-semibold"
                  style={{ color: i === tick % PRODUCTS.length ? '#C9A84C' : '#9CA3AF' }}>
                  {p.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ ROW 5: STAT STRIP ══ */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { n: '20+',  l: 'Years',    sub: 'Experience'  },
            { n: '$B+',  l: 'Funded',   sub: 'Deployed'    },
            { n: '100%', l: 'Focus',    sub: 'Every Deal'  },
          ].map((s, i) => (
            <div key={s.l}
              className="rounded-xl px-3 py-3.5 text-center relative overflow-hidden"
              style={{
                backgroundColor: i === 1 ? 'rgba(255,249,237,0.95)' : 'rgba(255,255,255,0.72)',
                border: `1px solid ${i === 1 ? 'rgba(201,168,76,0.32)' : 'rgba(201,168,76,0.12)'}`,
                backdropFilter: 'blur(12px)',
                boxShadow: i === 1 ? '0 4px 20px rgba(201,168,76,0.12)' : 'none',
              }}>
              {i === 1 && (
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundImage: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
              )}
              <div className="font-black text-lg leading-none mb-0.5"
                style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {s.n}
              </div>
              <div className="text-[9px] font-black" style={{ color: '#374151' }}>{s.l}</div>
              <div className="text-[8px] font-semibold mt-0.5" style={{ color: '#9CA3AF' }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// CURSOR GLOW
// ─────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      gsap.to(ref.current, { x: e.clientX - 200, y: e.clientY - 200, duration: 1.2, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full"
      style={{ backgroundImage: 'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)', filter: 'blur(40px)', top: 0, left: 0 }} />
  )
}

// ─────────────────────────────────────────────────────────
// PILLARS CAROUSEL
// ─────────────────────────────────────────────────────────
function PillarsCarousel({ pillars }: { pillars: typeof PILLARS }) {
  const trackRef    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)
  const scrollStart = useRef(0)

  const scrollToCard = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 32, behavior: 'smooth' })
    setActive(idx)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (isDragging.current) return
      setActive(prev => {
        const next = (prev + 1) % pillars.length
        const track = trackRef.current
        if (track) {
          const card = track.children[next] as HTMLElement
          if (card) track.scrollTo({ left: card.offsetLeft - 32, behavior: 'smooth' })
        }
        return next
      })
    }, 3500)
  }, [pillars.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    scrollStart.current = trackRef.current?.scrollLeft ?? 0
    trackRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return
    trackRef.current.scrollLeft = scrollStart.current + (startX.current - e.clientX)
  }
  const onPointerUp = () => {
    isDragging.current = false
    const track = trackRef.current
    if (!track) return
    let closest = 0; let minDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft - 32)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActive(closest)
  }

  return (
    <div>
      <div ref={trackRef}
        className="flex gap-5 overflow-x-auto cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: 32, paddingRight: 32, paddingBottom: 24, userSelect: 'none' }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        {pillars.map((p, i) => (
          <div key={p.num} className="shrink-0 rounded-2xl overflow-hidden transition-all duration-500"
            style={{
              width: 'min(360px,80vw)',
              border: `1px solid ${active === i ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.18)'}`,
              backgroundColor: p.cardBg,
              boxShadow: active === i ? '0 24px 60px rgba(0,0,0,0.32),0 0 0 1px rgba(201,168,76,0.15)' : '0 6px 24px rgba(0,0,0,0.18)',
              transform: active === i ? 'translateY(-8px)' : 'translateY(0)',
            }}>
            <div className="h-[3px]"
              style={{ backgroundImage: active === i ? 'linear-gradient(90deg,#C9A84C,#E2C97E,rgba(201,168,76,0.3))' : 'linear-gradient(90deg,rgba(201,168,76,0.25),transparent)' }} />
            <div className="p-7">
              <div className="flex items-start justify-between mb-5">
                <span className="text-xs font-black tracking-[0.25em] px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(201,168,76,0.14)', color: '#92660A', border: '1px solid rgba(201,168,76,0.3)' }}>
                  {p.tag}
                </span>
                <span className="font-black text-5xl leading-none"
                  style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.4))' }}>
                  {p.num}
                </span>
              </div>
              <h3 className="text-xl font-black mb-3" style={{ color: '#0A0A0A' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: '#374151' }}>{p.body}</p>
            </div>
            <div className="h-px mx-6 mb-5" style={{ backgroundImage: 'linear-gradient(90deg,rgba(201,168,76,0.22),transparent)' }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pb-8">
        {pillars.map((_, i) => (
          <button key={i}
            onClick={() => { scrollToCard(i); startTimer() }}
            className="rounded-full transition-all duration-300"
            style={{ width: active === i ? '24px' : '6px', height: '6px', backgroundColor: active === i ? '#C9A84C' : 'rgba(201,168,76,0.3)' }} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────
const PILLARS = [
  { num: '01', tag: 'EXPERTISE', title: 'Experience That Reduces Risk',
    body: 'Two decades of hands-on transaction structuring across commercial, hard money, and MCA financing.',
    cardBg: '#FFFBF0' },
  { num: '02', tag: 'ACCESS',    title: 'Deep Capital Access',
    body: 'Direct relationships across banks, non-bank lenders, hedge funds, insurance funds, private, and institutional capital providers.',
    cardBg: '#F8F9FC' },
  { num: '03', tag: 'STRATEGY',  title: 'Strategic Structuring',
    body: 'Every transaction is evaluated not only for approval, but for how it impacts refinancing options, future leverage, and long-term positioning.',
    cardBg: '#FFFBF0' },
  { num: '04', tag: 'EXECUTION', title: 'Speed with Discipline',
    body: 'We move decisively when time matters while maintaining institutional-level underwriting standards throughout every deal.',
    cardBg: '#F8F9FC' },
]

const SOLUTIONS = [
  { name: 'SBA Loans',                  idx: '01',
    desc: 'Government-backed financing for small business acquisition, expansion, and working capital.',
    detail: 'Amounts up to $5M · Terms up to 25 years · Low down payment · Best for 2+ year operating history.',
    tags: ['Up to $5M', 'Low Rates', 'Up to 25 yrs'] },
  { name: 'Commercial Purchase Loans',  idx: '02',
    desc: 'Acquisition financing for office, retail, industrial, warehouse, and mixed-use properties.',
    detail: 'Up to 75% LTV · Fixed & variable rates · 5–30 year amortization · Owner-occupied or investment.',
    tags: ['Up to 75% LTV', 'Fixed & Variable', '5–30 yr'] },
  { name: 'Construction & Development', idx: '03',
    desc: 'Ground-up construction, gut renovations, and land development financing.',
    detail: 'Draw schedule disbursements · Interest-only during build · Exit to permanent financing available.',
    tags: ['Draw Schedules', 'Interest-Only', 'Flexible Exit'] },
  { name: 'Bridge Financing',           idx: '04',
    desc: 'Short-term capital to close quickly while permanent financing is arranged.',
    detail: '6–36 month terms · Fast close in 7–14 days · Asset-based qualification.',
    tags: ['6–36 Months', 'Fast Close', 'Asset-Based'] },
  { name: 'Hard Money Loans',           idx: '05',
    desc: 'Asset-based lending with rapid approval for non-conforming or complex scenarios.',
    detail: 'Approval in 48 hours · Up to 70% LTV · No income verification · Credit-flexible.',
    tags: ['48-hr Approval', 'Up to 70% LTV', 'No Income Req'] },
  { name: 'DSCR Investor Loans',        idx: '06',
    desc: 'Qualified on rental income only — no W-2 or personal tax returns required.',
    detail: 'DSCR ≥ 1.0 · LLC eligible · 30-year options · Ideal for portfolio building.',
    tags: ['DSCR ≥ 1.0', 'LLC Eligible', '30-yr Available'] },
  { name: 'Merchant Cash Advances',     idx: '07',
    desc: 'Revenue-based working capital for businesses with consistent monthly sales.',
    detail: 'Funded in 24–72 hours · No collateral required · Repayment tied to daily revenue.',
    tags: ['24–72hr Funding', 'No Collateral', 'Revenue-Based'] },
  { name: 'Asset-Based Lending',        idx: '08',
    desc: 'Revolving credit lines and term loans secured by accounts receivable or inventory.',
    detail: 'AR, inventory, or equipment-backed · Revolving lines scale with your business growth.',
    tags: ['AR / Inventory', 'Revolving Lines', 'Growth Capital'] },
]

const WHO = [
  { label: 'Real Estate Investors', icon: '◈' },
  { label: 'First-Time Investors',  icon: '◇' },
  { label: 'Business Owners',       icon: '◉' },
  { label: 'Real Estate Agents',    icon: '◈' },
  { label: 'Loan Officers',         icon: '◇' },
  { label: 'CPAs',                  icon: '◉' },
  { label: 'Builders',              icon: '◈' },
  { label: 'Developers',            icon: '◇' },
  { label: 'Commercial Brokers',    icon: '◉' },
  { label: 'Growing Enterprises',   icon: '◈' },
]

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────
export default function Home() {
  const [openSol, setOpenSol] = useState<number | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const navRef    = useRef<HTMLElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const finalRef  = useRef<HTMLDivElement>(null)
  const mainRef   = useRef<HTMLDivElement>(null)

  const initScrollAnimations = useCallback(() => {
    if (!mainRef.current) return
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.05 })
    if (heroRef.current) {
      const words = heroRef.current.querySelectorAll<HTMLElement>('.hw')
      gsap.from(words, { y: 100, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 })
    }
    gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cr').forEach(el => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('.fu').forEach(el => {
        gsap.fromTo(el, { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 83%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('.sl').forEach(el => {
        gsap.fromTo(el, { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 83%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('.sr').forEach(el => {
        gsap.fromTo(el, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 83%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('.sg').forEach(parent => {
        gsap.fromTo(Array.from(parent.children), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: parent, start: 'top 80%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('.ld').forEach(el => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
      })
      if (finalRef.current) {
        gsap.fromTo(finalRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: finalRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } })
      }
    }, mainRef.current)
  }, [])

  useEffect(() => {
    gsap.to(loaderRef.current, {
      opacity: 0, duration: 0.6, delay: 1.4, ease: 'power2.in',
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none'
        initScrollAnimations()
      },
    })
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
      gsap.killTweensOf('*')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* ══ LOADER ══ */}
      <div ref={loaderRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
        style={{ backgroundColor: '#FFFFFF' }}>
        <div className="relative">
          <div className="w-16 h-16 rotate-45 rounded-xl"
            style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', boxShadow: '0 0 40px rgba(201,168,76,0.3)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rotate-45 rounded-sm" style={{ backgroundColor: '#fff' }} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black tracking-[0.4em]" style={{ color: '#C9A84C' }}>VYNRA</div>
          <div className="text-xs tracking-[0.6em] mt-1" style={{ color: '#9CA3AF' }}>CAPITAL GROUP</div>
        </div>
        <div className="w-36 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}>
          <div className="h-full rounded-full"
            style={{ backgroundImage: 'linear-gradient(90deg,#C9A84C,#E2C97E)', animation: 'loadBar 1.1s ease-out forwards' }} />
        </div>
      </div>

      <CursorGlow />

      <main ref={mainRef} className="overflow-x-hidden" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}>

        {/* ══ NAV ══ */}
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderBottom: '1px solid rgba(201,168,76,0.13)', boxShadow: '0 1px 30px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rotate-45 shrink-0 mr-1" style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', borderRadius: '4px' }} />
            <span className="text-sm font-black tracking-[0.24em]" style={{ color: '#C9A84C' }}>VYNRA</span>
            <span className="text-sm font-black tracking-[0.24em]" style={{ color: '#0A0A0A' }}>CAPITAL</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Solutions','Who We Help','About','Contact'].map(item => (
              <a key={item} href="#" className="text-xs font-semibold tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                {item.toUpperCase()}
              </a>
            ))}
          </div>
          <button className="px-5 py-2.5 text-xs font-black tracking-[0.16em] rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}>
            REQUEST CAPITAL
          </button>
        </nav>

        {/* ══════════════════════════════
            §1 — HERO
        ══════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>

          {/* Dashboard — right 55% */}
          <div className="absolute top-0 right-0 w-[55%] h-full hidden md:flex items-center">
            <HeroDashboard />
          </div>

          {/* Fade overlays */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right,#FAFAFA 34%,rgba(250,250,250,0.92) 50%,rgba(250,250,250,0.25) 66%,transparent 82%)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,transparent 12%,transparent 84%,rgba(0,0,0,0.04) 100%)' }} />

          {/* Hero text */}
          <div ref={heroRef} className="relative z-10 pl-8 md:pl-14 xl:pl-20 pt-24 pb-16 max-w-[580px]">

            <div className="hw inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
              style={{ border: '1px solid rgba(201,168,76,0.3)', backgroundColor: 'rgba(255,249,237,0.9)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C9A84C', animation: 'pulse 2s infinite' }} />
              <span className="text-xs font-black tracking-[0.3em]" style={{ color: '#92660A' }}>STRUCTURED FUNDING</span>
              <div className="w-px h-3" style={{ backgroundColor: 'rgba(201,168,76,0.4)' }} />
              <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: '#9CA3AF' }}>EST. 20+ YRS</span>
            </div>

            <div className="overflow-hidden mb-1">
              <h1 className="hw font-black leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3rem,6.5vw,6.5rem)', color: '#0A0A0A' }}>
                Strategic
              </h1>
            </div>
            <div className="overflow-hidden mb-5">
              <h1 className="hw font-black leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3rem,6.5vw,6.5rem)', WebkitTextStroke: '2.5px #C9A84C', WebkitTextFillColor: 'transparent' }}>
                Capital.
              </h1>
            </div>

            <div className="hw flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              <p className="text-base md:text-lg font-light tracking-[0.16em]" style={{ color: '#9CA3AF' }}>
                Structured for Growth.
              </p>
            </div>

            <p className="hw text-sm max-w-[420px] leading-relaxed font-medium mb-10" style={{ color: '#374151' }}>
              Over 20 years of experience delivering commercial, hard money, and alternative financing solutions
              through trusted banking, institutional, and private capital relationships.
            </p>

            <div className="hw flex items-center gap-4 flex-wrap mb-10">
              <button className="px-9 py-4 text-xs font-black tracking-[0.2em] rounded-full transition-all duration-300 hover:-translate-y-1.5 hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 8px 30px rgba(201,168,76,0.4)' }}>
                REQUEST CAPITAL
              </button>
              <button className="flex items-center gap-2 text-xs font-black tracking-[0.2em] transition-all duration-300"
                style={{ color: '#374151' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}>
                SPEAK WITH AN ADVISOR <span>→</span>
              </button>
            </div>

            <div className="hw flex flex-wrap items-center gap-5 pt-8" style={{ borderTop: '1px solid rgba(201,168,76,0.18)' }}>
              {['No upfront fees','All credit profiles','24–48 hr decisions'].map(text => (
                <span key={text} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#6B7280' }}>
                  <span style={{ color: '#C9A84C', fontWeight: 900 }}>✓</span>{text}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to bottom,transparent,#FFFFFF)' }} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <div className="w-[2px] h-10 rounded-full"
              style={{ backgroundImage: 'linear-gradient(to bottom,#C9A84C,rgba(201,168,76,0.1))', animation: 'pulse 2s infinite' }} />
            <span className="text-[10px] tracking-[0.35em] font-bold" style={{ color: 'rgba(201,168,76,0.55)' }}>SCROLL</span>
          </div>
        </section>

        {/* ══════════════════════════════
            MARQUEE
        ══════════════════════════════ */}
        <div className="py-4 overflow-hidden relative"
          style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right,#0A0A0A,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to left,#0A0A0A,transparent)' }} />
          <div className="flex gap-10 whitespace-nowrap mb-2"
            style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
            {Array(5).fill(['Commercial Financing','Hard Money Loans','Bridge Financing','SBA Loans','DSCR Loans','MCA Funding','Asset-Based Lending','Construction Loans']).flat().map((item, i) => (
              <span key={i} className="text-xs font-semibold tracking-[0.25em] shrink-0 flex items-center gap-3"
                style={{ color: i % 2 === 0 ? '#C9A84C' : 'rgba(255,255,255,0.3)' }}>
                {item}<span style={{ color: 'rgba(201,168,76,0.25)' }}>◈</span>
              </span>
            ))}
          </div>
          <div className="flex gap-10 whitespace-nowrap"
            style={{ animation: 'marqueeReverse 34s linear infinite', width: 'max-content' }}>
            {Array(5).fill(['20+ Years Experience','$50K to $50M+','48hr Hard Money','No Income DSCR','LLC Friendly','All Credit Types','Institutional Capital','Direct Lender']).flat().map((item, i) => (
              <span key={i} className="text-[10px] font-semibold tracking-[0.22em] shrink-0 flex items-center gap-3"
                style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(201,168,76,0.5)' }}>
                {item}<span style={{ color: 'rgba(201,168,76,0.15)' }}>◇</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            §2 — POSITIONING STATEMENT
        ══════════════════════════════ */}
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="max-w-6xl mx-auto px-8 md:px-14">
            <div className="sl flex items-center gap-4 mb-14">
              <div className="ld w-14 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              <span className="text-xs font-black tracking-[0.45em]" style={{ color: '#C9A84C' }}>OUR POSITIONING</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
              <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: '#D1D5DB' }}>01 / 07</span>
            </div>
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-start">
              <div className="sl">
                <blockquote className="cr font-black leading-[1.05] mb-8"
                  style={{ fontSize: 'clamp(1.9rem,3.2vw,2.8rem)', color: '#0A0A0A' }}>
                  More than a lender.{' '}
                  <span style={{ WebkitTextStroke: '1.5px #C9A84C', WebkitTextFillColor: 'transparent' }}>
                    A capital partner.
                  </span>
                </blockquote>
                <div className="flex items-stretch gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-4 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                    <div className="w-[2px] flex-1 my-1 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.25)' }} />
                    <div className="w-4 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                  </div>
                  <p className="text-sm leading-relaxed font-medium py-1" style={{ color: '#374151' }}>
                    Vynra Capital was founded with a clear objective: to provide business owners and investors
                    access to sophisticated capital solutions without unnecessary friction.
                  </p>
                </div>
              </div>
              <div className="sr space-y-6">
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  After more than two decades structuring commercial, hard money, and MCA transactions,
                  we recognized that borrowers needed more than approvals — they needed strategic guidance.
                  Our approach combines experience, relationships, and execution.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  We don&apos;t simply place loans. We structure financing designed to strengthen your position
                  today while preparing you for what comes next.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { n: '01', title: 'Experience',    sub: 'Decades of hands-on transaction structuring' },
                    { n: '02', title: 'Relationships', sub: 'Direct access across all capital sources'     },
                    { n: '03', title: 'Execution',     sub: 'Precise, disciplined deal work every time'   },
                  ].map(item => (
                    <div key={item.n}
                      className="group flex items-center gap-4 p-4 rounded-xl cursor-default transition-all duration-300"
                      style={{ border: '1px solid rgba(201,168,76,0.14)', backgroundColor: '#FAFAFA' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.38)'; el.style.backgroundColor='rgba(255,249,237,0.85)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.14)'; el.style.backgroundColor='#FAFAFA' }}>
                      <span className="text-xs font-black w-7 shrink-0" style={{ color: 'rgba(201,168,76,0.6)' }}>{item.n}</span>
                      <div className="w-px h-6 shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.2)' }} />
                      <div className="flex-1">
                        <div className="text-xs font-bold" style={{ color: '#0A0A0A' }}>{item.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{item.sub}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold" style={{ color: '#C9A84C' }}>→</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            §3 — WHY VYNRA WAS STARTED
        ══════════════════════════════ */}
        <section className="relative py-32" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.06) 0%,transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative max-w-6xl mx-auto px-8 md:px-14">
            <div className="sl flex items-center gap-4 mb-20">
              <div className="ld w-14 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              <span className="text-xs font-black tracking-[0.45em]" style={{ color: '#C9A84C' }}>WHY WE WERE STARTED</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
              <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.15)' }}>02 / 07</span>
            </div>

            <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 xl:gap-24 items-start">

              {/* Left — headings */}
              <div className="sl">
                <p className="text-[10px] font-black tracking-[0.5em] mb-4 flex items-center gap-3"
                  style={{ color: 'rgba(201,168,76,0.55)' }}>
                  <span className="inline-block w-5 h-[1.5px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                  OUR FOUNDATION
                </p>

                <div className="group relative pl-5 border-l-2 mb-10" style={{ borderColor: 'rgba(201,168,76,0.25)' }}>
                  <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: '#C9A84C' }} />
                  <p className="text-[10px] font-black tracking-[0.5em] mb-2 uppercase" style={{ color: 'rgba(201,168,76,0.45)' }}>Built on</p>
                  <h2 className="cr font-black leading-[0.88]"
                    style={{ fontSize: 'clamp(2.6rem,4vw,4.2rem)', backgroundImage: 'linear-gradient(135deg,#FFFFFF 40%,rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Experience.
                  </h2>
                </div>

                <div className="flex items-center gap-3 mb-10 pl-5">
                  <div className="w-3 h-3 rotate-45 shrink-0 rounded-sm"
                    style={{ backgroundColor: 'rgba(201,168,76,0.35)', boxShadow: '0 0 8px rgba(201,168,76,0.3)' }} />
                  <div className="flex-1 h-px" style={{ backgroundImage: 'linear-gradient(to right,rgba(201,168,76,0.4),transparent)' }} />
                </div>

                <div className="group relative pl-5 border-l-2" style={{ borderColor: 'rgba(201,168,76,0.5)' }}>
                  <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: '#C9A84C', boxShadow: '0 0 12px rgba(201,168,76,0.6)' }} />
                  <p className="text-[10px] font-black tracking-[0.5em] mb-2 uppercase" style={{ color: 'rgba(201,168,76,0.65)' }}>Driven by</p>
                  <h2 className="cr font-black leading-[0.88]"
                    style={{ fontSize: 'clamp(2.6rem,4vw,4.2rem)', WebkitTextStroke: '1.5px #C9A84C', WebkitTextFillColor: 'transparent' }}>
                    Execution.
                  </h2>
                </div>

                <div className="flex items-center gap-3 mt-12 pl-5">
                  <div className="ld w-6 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                  <span className="text-[10px] font-black tracking-[0.4em]" style={{ color: 'rgba(201,168,76,0.6)' }}>
                    STRUCTURE · EXECUTE · GROW
                  </span>
                </div>
                <div className="mt-6 pl-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ border: '1px solid rgba(201,168,76,0.22)', backgroundColor: 'rgba(201,168,76,0.05)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C', animation: 'pulse 2s infinite' }} />
                    <span className="text-[10px] font-black tracking-[0.25em]" style={{ color: '#C9A84C' }}>
                      20+ YEARS · DIRECT CAPITAL ACCESS
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — body copy */}
              <div className="fu">
                <h3 className="font-black leading-snug mb-6"
                  style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'rgba(255,255,255,0.9)' }}>
                  Bridging the Gap Between Traditional Lending and Real-World Business Needs.
                </h3>
                <div className="ld w-12 h-[2px] rounded-full mb-8" style={{ backgroundColor: '#C9A84C' }} />
                <div className="space-y-5 mb-10">
                  <p className="text-sm leading-[1.85]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Vynra Capital was established to bridge the gap between traditional lending institutions
                    and real-world business needs. With over 20 years of experience in commercial real estate
                    financing, asset-based lending, and revenue-based funding, we have developed direct
                    relationships with banks, non-bank lenders, hedge funds, insurance-backed capital sources,
                    private lenders, and institutional funding groups.
                  </p>
                  <p className="text-sm leading-[1.85]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    These relationships allow us to evaluate transactions objectively and place them with the
                    right capital source — not simply the most convenient one. Our mission is simple: structure
                    capital intelligently, execute efficiently, and position clients for sustained growth.
                  </p>
                </div>
                <div className="space-y-2.5">
                  {[
                    { icon: '◈', title: 'Structure Intelligently', sub: 'Every deal evaluated for approval, refinancing, and long-term leverage', highlight: false },
                    { icon: '◇', title: 'Execute Efficiently',     sub: 'Fast, decisive execution backed by institutional-level underwriting',   highlight: true  },
                    { icon: '◉', title: 'Grow Sustainably',        sub: 'Capital structured to strengthen your position and scale with you',     highlight: false },
                  ].map(item => (
                    <div key={item.title}
                      className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-default"
                      style={{ border: `1px solid ${item.highlight ? 'rgba(201,168,76,0.28)' : 'rgba(201,168,76,0.08)'}`, backgroundColor: item.highlight ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.02)' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.4)'; el.style.backgroundColor='rgba(201,168,76,0.07)'; el.style.transform='translateX(4px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=item.highlight?'rgba(201,168,76,0.28)':'rgba(201,168,76,0.08)'; el.style.backgroundColor=item.highlight?'rgba(201,168,76,0.05)':'rgba(255,255,255,0.02)'; el.style.transform='translateX(0)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: item.highlight ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
                        <span className="text-xs" style={{ color: '#C9A84C' }}>{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black mb-0.5 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.88)' }}>
                          {item.title}
                          {item.highlight && (
                            <span className="text-[8px] font-black tracking-[0.2em] px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: '#C9A84C' }}>CORE</span>
                          )}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>{item.sub}</div>
                      </div>
                      <div className="shrink-0 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2" style={{ color: '#C9A84C' }}>→</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <button className="px-7 py-3 text-xs font-black tracking-[0.18em] rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
                    style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 6px 24px rgba(201,168,76,0.3)' }}>
                    OUR STORY
                  </button>
                  <button className="text-xs font-black tracking-[0.18em] flex items-center gap-2 transition-all duration-300"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}>
                    VIEW SOLUTIONS <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            §4 — WHO WE HELP
        ══════════════════════════════ */}
        <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at top right,rgba(201,168,76,0.07) 0%,transparent 70%)' }} />
          <div className="max-w-5xl mx-auto px-8 md:px-14">
            <div className="grid md:grid-cols-[280px_1fr] gap-16 items-start">
              <div className="sl md:sticky md:top-28">
                <div className="text-xs font-black tracking-[0.4em] mb-3" style={{ color: '#C9A84C' }}>03 / 07</div>
                <h2 className="cr font-black leading-[0.92] mb-6" style={{ fontSize: 'clamp(2.5rem,5vw,3.8rem)' }}>
                  <span style={{ color: '#0A0A0A' }}>Who</span><br />
                  <span style={{ WebkitTextStroke: '2px #C9A84C', WebkitTextFillColor: 'transparent' }}>We Help</span>
                </h2>
                <p className="text-sm font-black mb-3 leading-snug" style={{ color: '#0A0A0A' }}>
                  Capital Solutions for a Broad Network of Professionals.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  Vynra Capital has successfully funded transactions for real estate investors, business owners,
                  builders, developers, and growing enterprises across multiple industries. Whether you are
                  acquiring your first investment property or managing a multi-asset portfolio, we structure
                  financing that aligns with your objectives.
                </p>
              </div>
              <div className="sr">
                <div className="sg flex flex-wrap gap-3 items-start">
                  {WHO.map((item, i) => (
                    <div key={item.label}
                      className="cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      style={{ padding: i % 3 === 0 ? '12px 22px' : '10px 18px', borderRadius: '999px', border: '1.5px solid rgba(201,168,76,0.2)', backgroundColor: i % 4 === 0 ? 'rgba(255,249,237,0.8)' : '#FAFAFA', fontSize: i % 3 === 0 ? '0.75rem' : '0.7rem', fontWeight: 600, letterSpacing: '0.04em', color: '#374151' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor='rgba(201,168,76,0.1)'; el.style.borderColor='#C9A84C'; el.style.color='#92660A' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor=i%4===0?'rgba(255,249,237,0.8)':'#FAFAFA'; el.style.borderColor='rgba(201,168,76,0.2)'; el.style.color='#374151' }}>
                      <span style={{ color: 'rgba(201,168,76,0.5)', marginRight: '6px' }}>{item.icon}</span>{item.label}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                  <p className="text-xs font-semibold tracking-wide" style={{ color: '#9CA3AF' }}>
                    From first-time borrowers to institutional operators — we structure for every stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            §5 — CORE VALUE PILLARS
        ══════════════════════════════ */}
        <section className="relative overflow-hidden pb-4" style={{ backgroundColor: '#0F0F0F' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.5) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(201,168,76,0.06) 0%,transparent 70%)' }} />
          <div className="relative z-10 pt-20 pb-8 px-8 md:px-14 max-w-6xl mx-auto">
            <div className="fu flex items-center gap-4 mb-8">
              <div className="ld w-12 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              <span className="text-xs font-black tracking-[0.45em]" style={{ color: '#C9A84C' }}>CORE VALUE PILLARS</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }} />
              <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.2)' }}>04 / 07</span>
            </div>
            <div className="flex items-end justify-between mb-2">
              <h2 className="cr font-black" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>
                <span className="text-white">What Sets </span>
                <span style={{ WebkitTextStroke: '1.5px #C9A84C', WebkitTextFillColor: 'transparent' }}>Us Apart</span>
              </h2>
              <p className="fu hidden md:flex items-center gap-2 text-xs font-medium tracking-[0.2em] pb-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}>← drag or auto →</p>
            </div>
          </div>
          <PillarsCarousel pillars={PILLARS} />
        </section>

        {/* ══════════════════════════════
            §6 — FINANCING SOLUTIONS
        ══════════════════════════════ */}
        <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-black whitespace-nowrap"
              style={{ fontSize: 'clamp(100px,22vw,300px)', color: 'transparent', WebkitTextStroke: '1.5px rgba(201,168,76,0.07)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              CAPITAL
            </span>
          </div>
          <div className="absolute left-6 top-24 bottom-24 w-[3px] pointer-events-none rounded-full"
            style={{ backgroundImage: 'linear-gradient(to bottom,transparent,#C9A84C 30%,#C9A84C 70%,transparent)' }} />
          <div className="relative max-w-5xl mx-auto px-8 md:px-14">
            <div className="mb-14">
              <div className="cr flex flex-col md:flex-row md:items-end gap-6 justify-between">
                <div>
                  <div className="text-xs font-black tracking-[0.4em] mb-3" style={{ color: '#C9A84C' }}>05 / 07</div>
                  <h2 className="font-black leading-none" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', color: '#0A0A0A' }}>
                    Financing<br />
                    <span style={{ WebkitTextStroke: '2px #C9A84C', WebkitTextFillColor: 'transparent' }}>Solutions.</span>
                  </h2>
                </div>
                <p className="fu text-sm max-w-[300px] font-medium" style={{ color: '#6B7280' }}>
                  Comprehensive commercial financing across SBA, hard money, bridge, DSCR, construction, MCA, and asset-based products.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {SOLUTIONS.map((sol, i) => (
                <div key={sol.name}
                  className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ border: openSol === i ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(201,168,76,0.1)', backgroundColor: openSol === i ? '#FFFBF0' : '#FAFAFA' }}
                  onClick={() => setOpenSol(openSol === i ? null : i)}>
                  <div className="flex items-center gap-4 md:gap-5 px-5 py-4 md:py-5">
                    <span className="text-xs font-black shrink-0 tabular-nums"
                      style={{ color: openSol===i ? '#C9A84C' : 'rgba(201,168,76,0.4)', width: '28px' }}>{sol.idx}</span>
                    <span className="text-sm md:text-base font-bold flex-1"
                      style={{ color: openSol===i ? '#92660A' : '#0A0A0A' }}>{sol.name}</span>
                    <div className="hidden lg:flex items-center gap-2 mr-2">
                      {sol.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: openSol===i ? 'rgba(201,168,76,0.16)' : 'rgba(201,168,76,0.07)', color: '#92660A' }}>{t}</span>
                      ))}
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ backgroundColor: openSol===i ? '#C9A84C' : 'rgba(201,168,76,0.1)', transform: openSol===i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke={openSol===i ? '#fff' : '#C9A84C'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {openSol === i && (
                    <div className="px-5 pb-6" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                      <div className="pt-5 flex flex-col md:flex-row gap-6 md:gap-10">
                        <div className="flex-1 space-y-3">
                          <p className="text-sm font-semibold leading-relaxed" style={{ color: '#374151' }}>{sol.desc}</p>
                          <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{sol.detail}</p>
                          <div className="flex flex-wrap gap-2 lg:hidden pt-1">
                            {sol.tags.map(t => (
                              <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                style={{ backgroundColor: 'rgba(201,168,76,0.12)', color: '#92660A', border: '1px solid rgba(201,168,76,0.22)' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 flex items-start">
                          <button className="px-6 py-3 text-xs font-black tracking-[0.18em] rounded-xl transition-all duration-200 hover:scale-[1.03] whitespace-nowrap"
                            style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 6px 20px rgba(201,168,76,0.3)' }}>
                            LEARN MORE →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
              <button className="px-8 py-3.5 text-xs font-black tracking-[0.2em] rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 8px 28px rgba(201,168,76,0.32)' }}>
                VIEW FINANCING SOLUTIONS
              </button>
              <span className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>8 products · click to expand</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            §7 — TRUST & CREDIBILITY
        ══════════════════════════════ */}
        <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 70%)' }} />
          <div className="relative max-w-5xl mx-auto px-8 md:px-14">
            <div className="fu text-center mb-16">
              <div className="text-xs font-black tracking-[0.4em] mb-3" style={{ color: 'rgba(201,168,76,0.55)' }}>06 / 07</div>
              <h2 className="font-black text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
                Proven Execution Across{' '}
                <span className="italic" style={{ color: '#C9A84C' }}>Capital</span>{' '}Structures.
              </h2>
              <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Over 20+ years, Vynra Capital has structured and funded transactions ranging from smaller working capital
                facilities to multi-million-dollar commercial developments. We understand how different capital providers
                think — and we prepare our clients accordingly.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { stat: '20+', label: 'Years Experience',  note: 'Since founding'       },
                { stat: '$B+', label: 'Capital Deployed',  note: 'Across all products'  },
                { stat: '8',   label: 'Capital Products',  note: 'Full-spectrum access' },
              ].map(item => (
                <div key={item.label}
                  className="relative p-7 md:p-10 rounded-2xl text-center overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.35)'; el.style.backgroundColor='rgba(201,168,76,0.04)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.08)'; el.style.backgroundColor='rgba(255,255,255,0.04)' }}>
                  <div className="font-black mb-2"
                    style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {item.stat}
                  </div>
                  <div className="text-xs font-black tracking-[0.18em] mb-1 text-white">{item.label.toUpperCase()}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            §8 + §9 — ADVISORY + FINAL CTA
        ══════════════════════════════ */}
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-black whitespace-nowrap"
              style={{ fontSize: 'clamp(80px,18vw,260px)', color: 'transparent', WebkitTextStroke: '1.5px rgba(201,168,76,0.06)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              ADVISORY
            </span>
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 70%)' }} />
          <div className="relative max-w-5xl mx-auto px-8 md:px-14">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Advisory */}
              <div className="sl space-y-6">
                <div className="text-xs font-black tracking-[0.4em]" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  07 / 07 · ADVISORY
                </div>
                <h2 className="cr font-black leading-[0.92]" style={{ fontSize: 'clamp(2.4rem,4.5vw,3.8rem)' }}>
                  <span style={{ color: '#FFFFFF' }}>Capital That</span><br />
                  <span style={{ color: '#FFFFFF' }}>Positions You</span><br />
                  <span style={{ WebkitTextStroke: '2px #C9A84C', WebkitTextFillColor: 'transparent' }}>for the Future.</span>
                </h2>
                <div className="flex gap-5">
                  <div className="w-[2.5px] shrink-0 min-h-[130px] rounded-full"
                    style={{ backgroundImage: 'linear-gradient(to bottom,#C9A84C,rgba(201,168,76,0.08))' }} />
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      The wrong financing can restrict growth. The right structure creates leverage, liquidity, and opportunity.
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      At Vynra Capital, we evaluate each deal through two lenses: immediate execution and long-term
                      strategic positioning. We aim to become a long-term capital resource — not a one-time transaction facilitator.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="ld w-8 h-[2px] rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                  <span className="text-xs font-black tracking-[0.28em]" style={{ color: 'rgba(201,168,76,0.7)' }}>
                    LONG-TERM CAPITAL PARTNER
                  </span>
                </div>
              </div>

              {/* Final CTA */}
              <div ref={finalRef} className="sr">
                <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
                  style={{ backgroundColor: '#141414', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.12) 0%,transparent 60%)' }} />
                  <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                    style={{ backgroundImage: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
                      style={{ border: '1px solid rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.07)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C', animation: 'pulse 2s infinite' }} />
                      <span className="text-xs font-black tracking-[0.3em]" style={{ color: '#C9A84C' }}>LET&apos;S BEGIN</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-light tracking-[0.12em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Let&apos;s Structure
                      </div>
                      <div className="font-black text-white leading-tight" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
                        the Right
                      </div>
                      <div className="font-black leading-tight"
                        style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', backgroundImage: 'linear-gradient(90deg,#C9A84C,#E2C97E,#C9A84C)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Capital Solution.
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Whether you are pursuing acquisition, expansion, development, or liquidity — we will evaluate
                      your goals and align them with the appropriate capital source.
                    </p>
                    <div className="space-y-3">
                      <button className="w-full py-4 text-xs font-black tracking-[0.2em] rounded-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                        style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', color: '#fff', boxShadow: '0 8px 30px rgba(201,168,76,0.35)' }}>
                        START A CONVERSATION
                      </button>
                      <button className="w-full py-4 text-xs font-black tracking-[0.2em] rounded-xl transition-all duration-300"
                        style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.4)'; e.currentTarget.style.color='#C9A84C' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.color='rgba(255,255,255,0.6)' }}>
                        SUBMIT FUNDING REQUEST
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="py-14 px-8 md:px-14" style={{ borderTop: '1px solid rgba(201,168,76,0.12)', backgroundColor: '#FAFAFA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rotate-45 shrink-0" style={{ backgroundImage: 'linear-gradient(135deg,#C9A84C,#E2C97E)', borderRadius: '3px' }} />
                  <span className="text-sm font-black tracking-[0.22em]" style={{ color: '#C9A84C' }}>VYNRA</span>
                  <span className="text-sm font-black tracking-[0.22em]" style={{ color: '#0A0A0A' }}>CAPITAL</span>
                </div>
                <p className="text-xs font-semibold tracking-[0.22em] mb-1" style={{ color: '#9CA3AF' }}>
                  STRUCTURED FUNDING. SUSTAINABLE GROWTH.
                </p>
                <p className="text-xs" style={{ color: '#C4C9D4' }}>Commercial · Hard Money · Bridge · DSCR · SBA · MCA</p>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {['Solutions','Who We Help','About','Contact'].map(item => (
                  <a key={item} href="#" className="text-xs font-semibold tracking-wide transition-colors duration-300"
                    style={{ color: '#9CA3AF' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                    {item}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2 items-start md:items-end">
                <p className="text-xs font-medium" style={{ color: '#D1D5DB' }}>© 2026 Vynra Capital Group.</p>
                <p className="text-xs" style={{ color: '#E5E7EB' }}>All rights reserved.</p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-4" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <div className="ld w-6 h-px rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              <p className="text-xs" style={{ color: '#C4C9D4' }}>
                All financing subject to underwriting approval. Terms and conditions apply.
                Vynra Capital Group does not guarantee loan approval or specific terms.
              </p>
            </div>
          </div>
        </footer>

        {/* ══ GLOBAL CSS ══ */}
        <style jsx global>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-20%); }
          }
          @keyframes marqueeReverse {
            from { transform: translateX(-20%); }
            to   { transform: translateX(0); }
          }
          @keyframes loadBar {
            from { width: 0%; }
            to   { width: 100%; }
          }
          @keyframes pulse {
            0%,100% { opacity: 1; }
            50%      { opacity: 0.4; }
          }
          @keyframes ping {
            75%,100% { transform: scale(2); opacity: 0; }
          }
          .animate-ping {
            animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
          }
          *::-webkit-scrollbar { display: none; }
        `}</style>

      </main>
    </>
  )
}
