'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── SCROLL PROGRESS ────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="h-0.5 w-full" style={{ backgroundColor: 'rgba(66,156,240,0.2)' }}>
      <div ref={barRef} className="h-full transition-none" style={{ backgroundColor: '#429cf0', width: '0%' }} />
    </div>
  )
}

// ─── NAV DOTS ───────────────────────────────────────────────
const SEC_IDS = ['hero', 'ticker', 'positioning', 'pillars', 'solutions', 'who', 'process', 'about', 'cta']
function NavDots() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = SEC_IDS.indexOf(e.target.id)
          if (i !== -1) setActive(i)
        }
      })
    }, { threshold: 0.4 })
    SEC_IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      {SEC_IDS.map((id, i) => (
        <button key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full transition-all duration-300"
          style={{
            width: active === i ? '20px' : '6px',
            height: '6px',
            backgroundColor: active === i ? '#429cf0' : 'rgba(255,255,255,0.12)',
            boxShadow: active === i ? '0 0 8px rgba(66,156,240,0.6)' : 'none',
          }} />
      ))}
    </div>
  )
}

// ─── ANIMATED COUNTER ───────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true
        const start = performance.now()
        const dur = 2000
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          if (el) el.textContent = prefix + Math.round(ease * to) + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, suffix, prefix])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─── DATA ────────────────────────────────────────────────────
const SOLUTIONS = [
  { name: 'SBA Loans', idx: '01', desc: 'Government-backed financing for small business acquisition, expansion, and working capital.', detail: 'Amounts up to $5M · Terms up to 25 years · Low down payment · Best for 2+ year operating history.', tags: ['Up to $5M', 'Low Rates', 'Up to 25 yrs'] },
  { name: 'Commercial Purchase Loans', idx: '02', desc: 'Acquisition financing for office, retail, industrial, warehouse, and mixed-use properties.', detail: 'Up to 75% LTV · Fixed & variable rates · 5–30 year amortization · Owner-occupied or investment.', tags: ['Up to 75% LTV', 'Fixed & Variable', '5–30 yr'] },
  { name: 'Construction & Development', idx: '03', desc: 'Ground-up construction, gut renovations, and land development financing.', detail: 'Draw schedule disbursements · Interest-only during build · Exit to permanent financing available.', tags: ['Draw Schedules', 'Interest-Only', 'Flexible Exit'] },
  { name: 'Bridge Financing', idx: '04', desc: 'Short-term capital to close quickly while permanent financing is arranged.', detail: '6–36 month terms · Fast close in 7–14 days · Asset-based qualification.', tags: ['6–36 Months', 'Fast Close', 'Asset-Based'] },
  { name: 'Hard Money Loans', idx: '05', desc: 'Asset-based lending with rapid approval for non-conforming or complex scenarios.', detail: 'Approval in 48 hours · Up to 70% LTV · No income verification · Credit-flexible.', tags: ['48-hr Approval', 'Up to 70% LTV', 'No Income Req'] },
  { name: 'DSCR Investor Loans', idx: '06', desc: 'Qualified on rental income only — no W-2 or personal tax returns required.', detail: 'DSCR ≥ 1.0 · LLC eligible · 30-year options · Ideal for portfolio building.', tags: ['DSCR ≥ 1.0', 'LLC Eligible', '30-yr Available'] },
  { name: 'Merchant Cash Advances', idx: '07', desc: 'Revenue-based working capital for businesses with consistent monthly sales.', detail: 'Funded in 24–72 hours · No collateral required · Repayment tied to daily revenue.', tags: ['24–72hr Funding', 'No Collateral', 'Revenue-Based'] },
  { name: 'Asset-Based Lending', idx: '08', desc: 'Revolving credit lines and term loans secured by accounts receivable or inventory.', detail: 'AR, inventory, or equipment-backed · Revolving lines scale with your business growth.', tags: ['AR / Inventory', 'Revolving Lines', 'Growth Capital'] },
]

const PILLARS = [
  { num: '01', tag: 'EXPERTISE', title: 'Experience That Reduces Risk', body: 'Two decades of hands-on transaction structuring across commercial, hard money, and MCA financing.' },
  { num: '02', tag: 'ACCESS', title: 'Deep Capital Access', body: 'Direct relationships across banks, non-bank lenders, hedge funds, insurance funds, private, and institutional capital providers.' },
  { num: '03', tag: 'STRATEGY', title: 'Strategic Structuring', body: 'Every transaction is evaluated not only for approval, but for how it impacts refinancing options, future leverage, and long-term positioning.' },
  { num: '04', tag: 'EXECUTION', title: 'Speed with Discipline', body: 'We move decisively when time matters while maintaining institutional-level underwriting standards throughout every deal.' },
]

const WHO = [
  'Real Estate Investors', 'First-Time Investors', 'Business Owners', 'Real Estate Agents',
  'Loan Officers', 'CPAs', 'Builders', 'Developers', 'Commercial Brokers', 'Growing Enterprises',
]

// ─── LIVE DASHBOARD ─────────────────────────────────────────
function LiveDashboard() {
  const [tick, setTick] = useState(0)
  const [activeFeed, setFeed] = useState(0)
  useEffect(() => {
    const a = setInterval(() => setTick(t => t + 1), 3000)
    const b = setInterval(() => setFeed(t => (t + 1) % 2), 2500)
    return () => { clearInterval(a); clearInterval(b) }
  }, [])
  const ar = tick % 6
  const RATES = [
    { label: 'SBA 7a', rate: '6.45%', change: '↓ 0.2', up: false },
    { label: 'DSCR', rate: '7.12%', change: '↑ 0.1', up: true },
    { label: 'Construction', rate: '8.50%', change: '—', up: null },
    { label: 'Bridge', rate: '9.25%', change: '↓ 0.4', up: false },
    { label: 'Hard Money', rate: '10.8%', change: '↑ 1.2', up: true },
    { label: 'Mezzanine', rate: '12.5%', change: '—', up: null },
  ]
  return (
    <div className="relative">
      {/* Main card */}
      <div className="rounded-2xl p-px shadow-2xl overflow-visible"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(8,16,30,0.92)' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <div>
                <h3 className="font-black text-[11px] uppercase tracking-[0.25em] text-white">Live Market Rates</h3>
                <p className="text-[9px] mt-0.5 font-bold tracking-wider" style={{ color: '#64748b' }}>REAL-TIME FEED · NYSE DATA</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-[9px] font-bold tracking-wider" style={{ color: '#64748b' }}>STATUS:</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-green-400">Active</span>
            </div>
          </div>

          {/* Rate grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {RATES.map((r, i) => (
              <div key={r.label} className="p-4 rounded-xl transition-all duration-700"
                style={{
                  backgroundColor: i === ar ? 'rgba(66,156,240,0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === ar ? 'rgba(66,156,240,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  transform: i === ar ? 'translateY(-2px)' : 'none',
                }}>
                <p className="text-[9px] font-black mb-2 uppercase tracking-widest"
                  style={{ color: i === ar ? '#429cf0' : '#64748b' }}>{r.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white tracking-tight">{r.rate}</span>
                  <span className="text-[10px] font-bold"
                    style={{ color: r.up === true ? '#4ade80' : r.up === false ? '#f87171' : '#64748b' }}>
                    {r.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Capacity */}
          <div className="mb-8">
            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] mb-5" style={{ color: '#64748b' }}>Deployment Capacity</h4>
            <div className="space-y-4">
              {[{ l: 'Commercial RE', p: 82 }, { l: 'Industrial Acquisition', p: 45 }, { l: 'Hard Money', p: 91 }, { l: 'Business Capital', p: 68 }].map(b => (
                <div key={b.l}>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="font-bold uppercase tracking-wider" style={{ color: '#cbd5e1' }}>{b.l}</span>
                    <span className="font-bold" style={{ color: '#429cf0' }}>{b.p}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${b.p}%`, background: 'linear-gradient(to right,#429cf0,#60a5fa)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#64748b' }}>Recent Transactions</h4>
            <div className="space-y-3">
              {[
                { title: 'Multi-Family Refi', sub: 'Dallas, TX · $18.5M', status: 'Closed', statusColor: '#4ade80', bg: 'rgba(74,222,128,0.1)', icon: '⬡', iconColor: 'rgba(66,156,240,0.15)', iconText: '#429cf0' },
                { title: 'Industrial CAPEX', sub: 'Chicago, IL · $12.2M', status: 'Funding', statusColor: '#60a5fa', bg: 'rgba(96,165,250,0.1)', icon: '⬢', iconColor: 'rgba(96,165,250,0.15)', iconText: '#60a5fa' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl transition-all duration-500"
                  style={{
                    backgroundColor: i === activeFeed ? 'rgba(66,156,240,0.05)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${i === activeFeed ? 'rgba(66,156,240,0.15)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: tx.iconColor, color: tx.iconText }}>{tx.icon}</div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tight text-white">{tx.title}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#64748b' }}>{tx.sub}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded"
                    style={{ color: tx.statusColor, backgroundColor: tx.bg }}>{tx.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -right-5 p-5 rounded-2xl shadow-2xl z-10"
        style={{ background: 'rgba(8,16,30,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(66,156,240,0.25)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: '#429cf0' }}>Q3 Deployment</p>
        <div className="text-3xl font-black text-white tracking-tighter">
          $420M<span className="text-xs font-light ml-2 uppercase tracking-widest" style={{ color: '#64748b' }}>USD</span>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────
export default function Home() {
  const [openSol, setOpenSol] = useState<number | null>(null)
  const mainRef  = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const heroRef  = useRef<HTMLDivElement>(null)

  const initAnims = useCallback(() => {
    if (!mainRef.current) return

    // Hero entrance
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll('.hw'),
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.1 })
    }

    gsap.context(() => {
      // Fade up
      gsap.utils.toArray<HTMLElement>('.fu').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } })
      })
      // Slide left
      gsap.utils.toArray<HTMLElement>('.sl').forEach(el => {
        gsap.fromTo(el, { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' } })
      })
      // Slide right
      gsap.utils.toArray<HTMLElement>('.sr').forEach(el => {
        gsap.fromTo(el, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' } })
      })
      // Scale in
      gsap.utils.toArray<HTMLElement>('.sc').forEach(el => {
        gsap.fromTo(el, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
      })
      // Stagger children
      gsap.utils.toArray<HTMLElement>('.sg').forEach(p => {
        gsap.fromTo(Array.from(p.children),
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: p, start: 'top 82%', toggleActions: 'play none none reverse' } })
      })
      // Clip reveal horizontal
      gsap.utils.toArray<HTMLElement>('.cr').forEach(el => {
        gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' } })
      })
      // Line draw
      gsap.utils.toArray<HTMLElement>('.ld').forEach(el => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })
      // Timeline line draw
      const tline = document.querySelector('.timeline-line') as HTMLElement
      if (tline) {
        gsap.fromTo(tline, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: tline, start: 'top 80%', toggleActions: 'play none none reverse' } })
      }
    }, mainRef.current)
  }, [])

  useEffect(() => {
    // Loader
    const tl = gsap.timeline()
    tl.to('.loader-ring', { rotation: 360, duration: 1, ease: 'none', repeat: -1 }, 0)
    tl.to('.loader-bar', { scaleX: 1, duration: 1.3, ease: 'power2.inOut', transformOrigin: 'left' }, 0)
    tl.to(loaderRef.current, { y: '-100%', duration: 0.7, ease: 'power3.inOut', delay: 1.5 })
    tl.call(() => { if (loaderRef.current) loaderRef.current.style.display = 'none'; initAnims() })
    return () => { ScrollTrigger.getAll().forEach(s => s.kill()); gsap.killTweensOf('*') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes marquee  { 0%{transform:translateX(0)}   100%{transform:translateX(-50%)} }
        @keyframes marqueeR { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)}  }
        @keyframes pulseBadge { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.02)} }
        @keyframes spinRing   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes glowPulse  { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes ripple     { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
        ::-webkit-scrollbar { display:none }
        * { -ms-overflow-style:none; scrollbar-width:none; box-sizing:border-box; }
        .mesh-dots {
          background-image: radial-gradient(circle at 2px 2px, rgba(66,156,240,0.08) 1px, transparent 0);
          background-size: 32px 32px;
        }
        .glass {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .glass-dark {
          background: rgba(8,16,30,0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .outline-stroke {
          -webkit-text-stroke: 2px #429cf0;
          color: transparent;
        }
        .btn-primary {
          background: linear-gradient(to right, #429cf0, #60a5fa, #1d4ed8);
        }
        .btn-primary:hover { filter: brightness(1.1); }
        .hover-lift:hover { transform: translateY(-3px); }
        .card-hover:hover {
          background: rgba(66,156,240,0.06) !important;
          border-color: rgba(66,156,240,0.25) !important;
        }
      `}</style>

      {/* ══ LOADER ══ */}
      <div ref={loaderRef} className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10"
        style={{ backgroundColor: '#08101E' }}>
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Spinning ring */}
          <div className="loader-ring absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(#429cf0, #60a5fa, transparent, transparent)', animation: 'spinRing 1.2s linear infinite' }} />
          <div className="absolute inset-1 rounded-full" style={{ backgroundColor: '#08101E' }} />
          {/* Logo inside ring */}
          <div style={{ animation: 'floatY 2s ease-in-out infinite', position: 'relative', zIndex: 10 }}>
            <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" width={50} height={50} style={{ objectFit: 'contain' }} priority />
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(66,156,240,0.15)' }}>
          <div className="loader-bar h-full rounded-full" style={{ background: 'linear-gradient(to right,#429cf0,#60a5fa)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </div>
        <span className="text-[9px] tracking-[0.6em] font-black uppercase" style={{ color: '#475569' }}>VYNRA CAPITAL</span>
      </div>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>

      {/* Nav dots */}
      <NavDots />

      {/* ══ FIXED NAV ══ */}
      <header className="fixed top-0.5 left-0 right-0 z-40 flex items-center justify-between px-10 py-5 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div style={{ width: '36px', height: '36px', color: '#429cf0' }}>
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', fontStyle: 'italic', textTransform: 'uppercase' }}>
            Vynra <span style={{ fontWeight: 300, color: '#94a3b8', fontStyle: 'normal' }}>Capital</span>
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-12">
          {['Advisory', 'Capital', 'Markets', 'Insights'].map(item => (
            <a key={item} href="#"
              className="transition-colors duration-200"
              style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#429cf0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
              {item}
            </a>
          ))}
        </nav>
        <button className="btn-primary px-7 py-3 rounded-sm text-[11px] font-black tracking-[0.2em] transition-all uppercase hover:scale-105"
          style={{ color: '#08101E', boxShadow: '0 20px 40px rgba(66,156,240,0.2)' }}>
          Request Capital
        </button>
      </header>

      <main ref={mainRef} style={{ backgroundColor: '#08101E', color: '#f1f5f9', overflowX: 'hidden' }}>

        {/* ══ §1 HERO ══ */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20 mesh-dots overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(66,156,240,0.12) 0%, transparent 70%)', opacity: 0.5 }} />
          <div className="absolute top-1/4 left-1/4 pointer-events-none" style={{ width: '800px', height: '800px', background: 'rgba(66,156,240,0.07)', borderRadius: '50%', filter: 'blur(160px)' }} />
          <div className="absolute bottom-1/4 right-1/3 pointer-events-none" style={{ width: '600px', height: '600px', background: 'rgba(30,58,138,0.12)', borderRadius: '50%', filter: 'blur(180px)' }} />

          <div className="max-w-[1440px] mx-auto px-10 grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full pb-44">
            {/* Left */}
            <div ref={heroRef} className="lg:col-span-6 flex flex-col gap-8">
              {/* Badge */}
              <div className="hw inline-flex items-center gap-3 px-5 py-2.5 rounded-full w-fit"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', animation: 'pulseBadge 3s ease-in-out infinite' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#429cf0' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#429cf0' }} />
                </span>
                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em', color: '#cbd5e1', textTransform: 'uppercase' }}>
                  Structured Funding · EST. 20+ YRS
                </span>
              </div>

              {/* Headline */}
              <div className="hw flex flex-col">
                <h1 style={{ fontSize: 'clamp(4.5rem,8vw,9rem)', fontWeight: 900, lineHeight: 0.82, letterSpacing: '-0.04em', color: '#fff', textTransform: 'uppercase' }}>
                  STRATEGIC<br />
                  <span className="outline-stroke">CAPITAL.</span>
                </h1>
                <div className="mt-10 space-y-5 max-w-xl">
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 300, color: '#cbd5e1', fontStyle: 'italic' }}>
                    Structured for <span style={{ color: '#429cf0', fontWeight: 700, fontStyle: 'normal' }}>Growth.</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300 }}>
                    Over 20 years of experience delivering commercial, hard money, and alternative financing solutions
                    through trusted banking, institutional, and private capital relationships.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="hw flex flex-wrap gap-5 pt-2">
                <button className="btn-primary hover-lift px-10 py-5 rounded-sm font-black tracking-[0.2em] transition-all uppercase text-xs"
                  style={{ color: '#08101E', boxShadow: '0 20px 50px rgba(66,156,240,0.25)' }}>
                  Request Capital
                </button>
                <button className="hover-lift flex items-center gap-3 px-10 py-5 rounded-sm font-bold tracking-[0.15em] transition-all text-xs uppercase"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}>
                  Speak With An Advisor <span style={{ color: '#429cf0', fontSize: '1.1rem' }}>→</span>
                </button>
              </div>

              {/* Trust */}
              <div className="hw flex flex-wrap items-center gap-6 pt-2">
                {['No upfront fees', 'All credit profiles', '24–48 hr decisions'].map(t => (
                  <span key={t} className="flex items-center gap-1.5" style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                    <span style={{ color: '#429cf0', fontWeight: 900 }}>✓</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — dashboard */}
            <div className="lg:col-span-6 sr">
              <LiveDashboard />
            </div>
          </div>

          {/* Stats bar at bottom */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-10">
            <div className="flex items-center justify-between gap-8 px-12 py-6 rounded-sm glass-dark"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { label: 'EXPERIENCE', val: '20+ Years' },
                { label: 'TRACK RECORD', val: '$B+ Funded' },
                { label: 'EFFICIENCY', val: '100% Focus' },
              ].map((s, i) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#64748b', letterSpacing: '0.4em', marginBottom: '6px' }}>{s.label}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', fontStyle: 'italic', letterSpacing: '-0.03em' }}>{s.val}</span>
                  {i < 2 && <div style={{ position: 'absolute', width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', transform: `translateX(${i === 0 ? '130px' : '130px'})` }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom,#429cf0,transparent)', animation: 'glowPulse 2s infinite' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.5em', fontWeight: 700, color: 'rgba(66,156,240,0.4)' }}>SCROLL</span>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div id="ticker" style={{ backgroundColor: '#04090F', borderTop: '1px solid rgba(66,156,240,0.1)', borderBottom: '1px solid rgba(66,156,240,0.1)', padding: '18px 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right,#04090F,transparent)', zIndex: 10 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left,#04090F,transparent)', zIndex: 10 }} />
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', marginBottom: '10px', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
            {Array(5).fill(['Commercial Financing', 'Hard Money Loans', 'Bridge Financing', 'SBA Loans', 'DSCR Loans', 'MCA Funding', 'Asset-Based Lending', 'Construction Loans']).flat().map((item, i) => (
              <span key={i} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', color: i % 2 === 0 ? '#429cf0' : 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {item} <span style={{ color: 'rgba(66,156,240,0.2)' }}>◈</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', animation: 'marqueeR 36s linear infinite', width: 'max-content' }}>
            {Array(5).fill(['20+ Years Experience', '$50K to $50M+', '48hr Hard Money', 'No Income DSCR', 'LLC Friendly', 'All Credit Types', 'Institutional Capital', 'Direct Lender']).flat().map((item, i) => (
              <span key={i} style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.24em', color: i % 2 === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(66,156,240,0.45)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {item} <span style={{ color: 'rgba(66,156,240,0.15)' }}>◇</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ §2 POSITIONING ══ */}
        <section id="positioning" style={{ backgroundColor: '#0D1829', padding: '120px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            {/* Section label */}
            <div className="sl flex items-center gap-4 mb-14">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>OUR POSITIONING</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', color: '#64748b' }}>01 / 07</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div className="sl">
                <h2 className="cr" style={{ fontSize: 'clamp(2rem,4vw,3.6rem)', fontWeight: 900, lineHeight: 1, color: '#fff', marginBottom: '32px' }}>
                  More than a lender.{' '}
                  <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>A capital partner.</span>
                </h2>
                <p className="fu" style={{ fontSize: '0.9rem', lineHeight: 1.85, color: '#94a3b8', marginBottom: '32px' }}>
                  Vynra Capital was built by practitioners — not product pushers. Every advisor on our team has spent years in the field,
                  structuring deals across multiple asset classes and market cycles.
                </p>
                <button className="fu btn-primary hover-lift px-8 py-4 rounded-sm font-black tracking-[0.18em] text-xs uppercase transition-all"
                  style={{ color: '#08101E' }}>
                  Learn How We Work
                </button>
              </div>
              <div className="sr" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { n: '01', title: 'Long-Term Outcomes', body: 'We prioritize long-term outcomes over short-term placement fees.' },
                  { n: '02', title: 'Wide Capital Network', body: 'We leverage a wide capital network to find the best execution path for your deal.' },
                  { n: '03', title: 'Speed & Precision', body: 'We operate with speed and precision — from term sheet to close.' },
                ].map((item, i) => (
                  <div key={i} className="fu card-hover" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(17,31,51,0.9)', border: '1px solid rgba(66,156,240,0.12)', transition: 'all 0.3s', cursor: 'default' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#429cf0,#60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 900, color: '#08101E' }}>{item.n}</div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#94a3b8' }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <div style={{ backgroundColor: '#08101E', padding: '64px 0', borderTop: '1px solid rgba(66,156,240,0.08)', borderBottom: '1px solid rgba(66,156,240,0.08)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
              {[
                { val: 20, suffix: '+', label: 'Years Experience', sub: 'In The Field' },
                { val: 1, suffix: 'B+', prefix: '$', label: 'Capital Deployed', sub: 'Across All Products' },
                { val: 8, suffix: '', label: 'Product Lines', sub: 'Financing Solutions' },
                { val: 100, suffix: '%', label: 'Deal Focus', sub: 'Every Transaction' },
              ].map((s, i) => (
                <div key={i} className="sc card-hover" style={{ textAlign: 'center', padding: '32px 24px', borderRadius: '16px', backgroundColor: 'rgba(13,24,41,0.8)', border: '1px solid rgba(66,156,240,0.12)', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'all 0.3s' }}>
                  <div style={{ position: 'absolute', inset: 0, height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)', opacity: 0.5 }} />
                  <div style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 900, background: 'linear-gradient(135deg,#429cf0,#A8C8E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
                    {s.prefix}<Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#e2e8f0', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ §3 PILLARS ══ */}
        <section id="pillars" style={{ backgroundColor: '#0D1829', padding: '120px 0', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(66,156,240,0.03) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sl flex items-center gap-4 mb-6">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>WHY VYNRA</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.2em' }}>02 / 07</span>
            </div>
            <div className="sl" style={{ marginBottom: '56px' }}>
              <h2 className="cr" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', fontWeight: 900, lineHeight: 1, color: '#fff' }}>
                Four pillars.<br />
                <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>One mandate.</span>
              </h2>
            </div>
            <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
              {PILLARS.map((p, i) => (
                <div key={p.num} className="sc card-hover" style={{ padding: '32px', borderRadius: '16px', backgroundColor: '#111F33', border: '1px solid rgba(66,156,240,0.12)', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'all 0.4s' }}>
                  <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: 'linear-gradient(90deg,#429cf0,#A8C8E8,rgba(66,156,240,0.2))', opacity: 0.4 }} />
                  <div style={{ position: 'absolute', right: '24px', top: '16px', fontSize: '80px', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg,#429cf0,#A8C8E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.08, userSelect: 'none' }}>
                    {p.num}
                  </div>
                  <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 900, letterSpacing: '0.3em', padding: '5px 12px', borderRadius: '100px', backgroundColor: 'rgba(66,156,240,0.1)', color: '#A8C8E8', border: '1px solid rgba(66,156,240,0.2)', marginBottom: '18px' }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ §4 SOLUTIONS ══ */}
        <section id="solutions" style={{ backgroundColor: '#08101E', padding: '120px 0', position: 'relative' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sl flex items-center gap-4 mb-6">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>FINANCING SOLUTIONS</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.2em' }}>03 / 07</span>
            </div>
            <div className="sl" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '56px' }}>
              <h2 className="cr" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', fontWeight: 900, lineHeight: 1, color: '#fff' }}>
                Capital solutions<br />
                <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>built to perform.</span>
              </h2>
              <p className="sr" style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '280px', lineHeight: 1.8 }}>
                Eight purpose-built products covering every stage of real estate and business financing.
              </p>
            </div>
            <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
              {SOLUTIONS.map((sol, i) => (
                <div key={sol.idx}
                  className="sc"
                  style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: openSol === i ? 'rgba(66,156,240,0.07)' : '#111F33', border: `1px solid ${openSol === i ? 'rgba(66,156,240,0.35)' : 'rgba(66,156,240,0.1)'}`, transition: 'all 0.35s', cursor: 'pointer', boxShadow: openSol === i ? '0 12px 50px rgba(0,0,0,0.4)' : 'none' }}
                  onClick={() => setOpenSol(openSol === i ? null : i)}>
                  {openSol === i && <div style={{ height: '2px', background: 'linear-gradient(90deg,#429cf0,#A8C8E8,transparent)' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, flexShrink: 0, width: '32px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {sol.idx}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>{sol.name}</h3>
                      <p style={{ fontSize: '11px', marginTop: '2px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sol.desc}</p>
                    </div>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: openSol === i ? 'linear-gradient(135deg,#429cf0,#60a5fa)' : 'rgba(66,156,240,0.08)', border: openSol === i ? 'none' : '1px solid rgba(66,156,240,0.2)', transform: openSol === i ? 'rotate(45deg)' : 'none', transition: 'all 0.3s', fontSize: '16px', fontWeight: 900, color: openSol === i ? '#08101E' : '#429cf0' }}>
                      +
                    </div>
                  </div>
                  {openSol === i && (
                    <div style={{ padding: '0 24px 24px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {sol.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '9px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', backgroundColor: 'rgba(66,156,240,0.1)', color: '#A8C8E8', border: '1px solid rgba(66,156,240,0.2)', letterSpacing: '0.1em' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#cbd5e1', marginBottom: '20px' }}>{sol.detail}</p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-primary" style={{ padding: '10px 22px', borderRadius: '4px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.18em', color: '#08101E', cursor: 'pointer', textTransform: 'uppercase' }}>
                          Apply Now
                        </button>
                        <button style={{ padding: '10px 22px', borderRadius: '4px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.18em', color: '#A8C8E8', cursor: 'pointer', textTransform: 'uppercase', backgroundColor: 'rgba(66,156,240,0.08)', border: '1px solid rgba(66,156,240,0.2)' }}>
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ §5 WHO WE SERVE ══ */}
        <section id="who" style={{ backgroundColor: '#0D1829', padding: '120px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sl flex items-center gap-4 mb-6">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>WHO WE SERVE</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.2em' }}>04 / 07</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'center' }}>
              <div className="sl">
                <h2 className="cr" style={{ fontSize: 'clamp(2.2rem,4vw,3.6rem)', fontWeight: 900, lineHeight: 1, color: '#fff', marginBottom: '24px' }}>
                  Serious capital<br />
                  <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>for serious players.</span>
                </h2>
                <p className="fu" style={{ fontSize: '14px', lineHeight: 1.85, color: '#94a3b8', marginBottom: '32px' }}>
                  We work with a broad range of clients — from first-time investors to seasoned developers and enterprise-level businesses seeking institutional-quality capital advisory.
                </p>
                <button className="fu btn-primary hover-lift px-8 py-4 rounded-sm font-black tracking-[0.18em] text-xs uppercase"
                  style={{ color: '#08101E' }}>
                  See If You Qualify
                </button>
              </div>
              <div className="sr sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
                {WHO.map((w, i) => (
                  <div key={w} className="sc card-hover" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'default', transition: 'all 0.3s' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(66,156,240,0.1)', border: '1px solid rgba(66,156,240,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#429cf0', fontSize: '13px' }}>{['◈', '◇', '◉'][i % 3]}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0' }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ §6 PROCESS ══ */}
        <section id="process" style={{ backgroundColor: '#08101E', padding: '120px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sl flex items-center gap-4 mb-6">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>HOW IT WORKS</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.2em' }}>05 / 07</span>
            </div>
            <h2 className="sl cr" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', fontWeight: 900, lineHeight: 1, color: '#fff', marginBottom: '64px' }}>
              A clear path<br />
              <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>from intro to funded.</span>
            </h2>
            {/* Timeline */}
            <div style={{ position: 'relative' }}>
              <div className="timeline-line" style={{ position: 'absolute', top: '40px', left: '40px', right: '40px', height: '1px', background: 'linear-gradient(to right,rgba(66,156,240,0.5),rgba(66,156,240,0.1))', display: 'none' }} />
              <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
                {[
                  { n: '01', title: 'Submit Your Scenario', body: 'Share your deal details, financing goal, and timeline through our quick intake form.' },
                  { n: '02', title: 'Strategy Session', body: 'We review your scenario and schedule a call to align on the best structuring approach.' },
                  { n: '03', title: 'Capital Matching', body: 'We match your deal to the optimal lender or capital source from our network.' },
                  { n: '04', title: 'Close & Fund', body: 'We manage the process through underwriting, approval, and final funding.' },
                ].map((step, i) => (
                  <div key={step.n} className="sc" style={{ position: 'relative' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', zIndex: 1, background: i === 3 ? 'linear-gradient(135deg,#429cf0,#60a5fa)' : '#111F33', border: i === 3 ? 'none' : '1px solid rgba(66,156,240,0.2)' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, background: i === 3 ? 'none' : 'linear-gradient(135deg,#429cf0,#A8C8E8)', WebkitBackgroundClip: i === 3 ? 'unset' : 'text', WebkitTextFillColor: i === 3 ? '#08101E' : 'transparent', color: i === 3 ? '#08101E' : 'transparent' }}>
                        {step.n}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8' }}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ §7 ABOUT ══ */}
        <section id="about" style={{ backgroundColor: '#0D1829', padding: '120px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="sl flex items-center gap-4 mb-6">
              <div className="ld" style={{ width: '56px', height: '2px', background: 'linear-gradient(135deg,#429cf0,#A8C8E8)' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.45em', color: '#429cf0' }}>ABOUT VYNRA</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(66,156,240,0.1)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.2em' }}>06 / 07</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'start' }}>
              <div className="sl">
                <h2 className="cr" style={{ fontSize: 'clamp(2rem,3.8vw,3.5rem)', fontWeight: 900, lineHeight: 1, color: '#fff', marginBottom: '28px' }}>
                  Built by practitioners.<br />
                  <span style={{ WebkitTextStroke: '1.5px #429cf0', WebkitTextFillColor: 'transparent' }}>Driven by outcomes.</span>
                </h2>
                <p className="fu" style={{ fontSize: '14px', lineHeight: 1.85, color: '#94a3b8', marginBottom: '16px' }}>
                  Vynra Capital was founded on a simple principle: clients deserve advisors who understand deals at a structural level, not just at the surface.
                </p>
                <p className="fu" style={{ fontSize: '14px', lineHeight: 1.85, color: '#94a3b8', marginBottom: '40px' }}>
                  With over two decades of combined experience, our team has structured financing across commercial real estate, business acquisitions, hard money, and alternative capital markets.
                </p>
                <div className="fu sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                  {[{ n: '20+', l: 'Years' }, { n: '$B+', l: 'Deployed' }, { n: '8', l: 'Products' }].map(s => (
                    <div key={s.l} className="sc" style={{ textAlign: 'center', padding: '20px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(66,156,240,0.12)' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, background: 'linear-gradient(135deg,#429cf0,#A8C8E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>{s.n}</div>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sr" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Our Mission', body: 'To deliver structured capital solutions that enable our clients to move with confidence through complex financing environments.' },
                  { title: 'Our Approach', body: 'We combine deep market knowledge with wide lender access to deliver financing that is properly structured for the deal — not the other way around.' },
                  { title: 'Our Standards', body: 'Every deal is reviewed with institutional-quality underwriting rigor, regardless of size. We hold ourselves to the highest professional standards in the industry.' },
                ].map((item, i) => (
                  <div key={i} className="sc card-hover" style={{ padding: '24px', borderRadius: '14px', backgroundColor: 'rgba(17,31,51,0.8)', border: '1px solid rgba(66,156,240,0.12)', cursor: 'default', transition: 'all 0.3s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg,#429cf0,#60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '8px', fontWeight: 900, color: '#08101E' }}>✓</span>
                      </div>
                      <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#A8C8E8' }}>{item.title}</h4>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ §8 CTA ══ */}
        <section id="cta" style={{ backgroundColor: '#04090F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
          {/* Pulsing rings */}
          {[1, 2, 3].map(r => (
            <div key={r} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `${r * 300}px`, height: `${r * 300}px`, borderRadius: '50%', border: '1px solid rgba(66,156,240,0.06)', animation: `ripple ${r * 1.5 + 1.5}s ease-out infinite`, animationDelay: `${r * 0.5}s`, pointerEvents: 'none' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(66,156,240,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '100px', backgroundColor: 'rgba(66,156,240,0.06)', border: '1px solid rgba(66,156,240,0.18)', marginBottom: '40px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#429cf0', animation: 'glowPulse 2s infinite', display: 'inline-block' }} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em', color: '#A8C8E8', textTransform: 'uppercase' }}>Start Your Application</span>
            </div>

            <h2 className="fu" style={{ fontSize: 'clamp(3rem,6vw,6rem)', fontWeight: 900, lineHeight: 0.9, color: '#fff', marginBottom: '28px', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
              YOUR NEXT<br />
              <span className="outline-stroke">DEAL STARTS</span><br />
              HERE.
            </h2>

            <p className="fu" style={{ fontSize: '14px', lineHeight: 1.85, color: '#94a3b8', maxWidth: '480px', margin: '0 auto 48px' }}>
              Submit your scenario today and receive a structured capital strategy within 24–48 hours. No upfront fees. No commitments.
            </p>

            <div className="fu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <button className="btn-primary hover-lift px-12 py-5 rounded-sm font-black tracking-[0.2em] text-xs uppercase transition-all"
                style={{ color: '#08101E', boxShadow: '0 0 60px rgba(66,156,240,0.2)', fontSize: '12px' }}>
                Request Capital Now
              </button>
              <button className="hover-lift px-10 py-5 rounded-sm font-bold tracking-[0.15em] text-xs uppercase transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}>
                Speak With An Advisor
              </button>
            </div>

            <div className="fu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
              {['No upfront fees', 'All credit profiles', '24–48 hr decisions', 'Nationwide'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                  <span style={{ color: '#429cf0', fontWeight: 900 }}>✓</span>{t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ backgroundColor: '#08101E', borderTop: '1px solid rgba(66,156,240,0.08)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' }}>
              <div>
                {/* Logo + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', color: '#429cf0' }}>
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', fontStyle: 'italic', textTransform: 'uppercase' }}>
                    Vynra <span style={{ fontWeight: 300, color: '#94a3b8', fontStyle: 'normal' }}>Capital</span>
                  </span>
                </div>
                <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#64748b', maxWidth: '220px', marginBottom: '24px' }}>
                  Structured funding for sustainable growth. 20+ years of institutional-grade capital advisory.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['in', 'tw', 'fb'].map(s => (
                    <div key={s} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.3s', fontSize: '10px', fontWeight: 900, color: '#A8C8E8', textTransform: 'uppercase' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(66,156,240,0.3)'; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              {[
                { title: 'Solutions', links: ['SBA Loans', 'Commercial', 'Hard Money', 'DSCR Loans', 'Bridge', 'MCA'] },
                { title: 'Company', links: ['About', 'Process', 'Who We Help', 'Careers'] },
                { title: 'Contact', links: ['Request Capital', 'Speak to Advisor', 'Partner With Us', 'Privacy Policy'] },
              ].map(col => (
                <div key={col.title}>
                  <h4 style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.35em', color: '#429cf0', textTransform: 'uppercase', marginBottom: '20px' }}>{col.title}</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#A8C8E8'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748b'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0' }}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(100,116,139,0.5)' }}>
                © 2025 VYNRA CAPITAL. ALL RIGHTS RESERVED.
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(100,116,139,0.3)', textAlign: 'center' }}>
                NOT A LICENSED LENDER · INFORMATIONAL PURPOSES ONLY · CONSULT A FINANCIAL ADVISOR
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
