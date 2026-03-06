"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowRight,
  Shield,
  Network,
  Layers,
  Zap,
  CheckCircle2,
  Menu,
  Building2,
  Landmark,
  TrendingUp,
  Briefcase,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── useCountUp Hook ──────────────────────────────────────────
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({
  value, suffix, label, active,
}: {
  value: number; suffix: string; label: string; active: boolean;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="text-center group">
      <p className="text-5xl font-bold text-[#111727] tracking-tight">
        {count}
        <span className="text-amber-600">{suffix}</span>
      </p>
      <p className="text-xs text-slate-400 mt-2 font-semibold uppercase tracking-widest">{label}</p>
    </div>
  );
}

// ─── Pillar Card ─────────────────────────────────────────────
function PillarCard({
  icon: Icon, title, desc,
}: {
  icon: React.ElementType; title: string; desc: string;
}) {
  return (
    <Card className="group border border-slate-100 shadow-none hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
      <CardContent className="p-7">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-[#111727] group-hover:text-amber-400 transition-colors duration-300">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="font-bold text-[#111727] text-base mb-3 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

// ─── Solution Card ───────────────────────────────────────────
function SolutionCard({
  icon: Icon, title, slug, range, term, items,
}: {
  icon: React.ElementType;
  title: string;
  slug: string;
  range: string;
  term: string;
  items: string[];
}) {
  return (
    <Card className="group border border-slate-100 shadow-none hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-7">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="font-bold text-[#111727] text-lg mb-1">{title}</h3>
        <div className="flex gap-3 mb-4">
          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 font-semibold">
            <DollarSign size={9} />
            {range}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5 font-semibold">
            <BarChart3 size={9} />
            {term}
          </span>
        </div>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-slate-100">
          <Link href={`/solutions/${slug}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#111727] hover:text-amber-600 p-0 h-auto font-semibold group/btn"
            >
              Learn More
              <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Process Step ─────────────────────────────────────────────
function ProcessStep({
  step, title, desc, last = false,
}: {
  step: string; title: string; desc: string; last?: boolean;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#111727] flex items-center justify-center flex-shrink-0">
          <span className="text-amber-400 text-lg font-bold">{step}</span>
        </div>
        {!last && <div className="w-px flex-1 bg-slate-200 mt-4 mb-0 min-h-[40px]" />}
      </div>
      <div className="pb-10">
        <h3 className="font-bold text-[#111727] text-lg mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}

// ─── Solutions Dropdown ───────────────────────────────────────
function SolutionsDropdown({
  scrolled,
  navSolutions,
}: {
  scrolled: boolean;
  navSolutions: { title: string; slug: string; desc: string; icon: React.ElementType }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
          scrolled
            ? "text-slate-600 hover:text-[#111727] hover:bg-slate-50"
            : "text-white/80 hover:text-white hover:bg-white/10"
        )}
      >
        Solutions
        <ChevronRight
          size={14}
          className={cn(
            "transition-transform duration-200",
            open ? "rotate-90" : "rotate-0"
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 z-50 w-[600px] p-4 bg-white rounded-2xl shadow-2xl border border-slate-100">
          <div className="px-3 pb-3 mb-1 border-b border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Capital Solutions
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {navSolutions.map(({ title, slug, desc, icon: Icon }) => (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3.5 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors flex-shrink-0 mt-0.5">
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111727] group-hover:text-amber-700 leading-tight">
                    {title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 px-3 flex items-center justify-between">
            <p className="text-xs text-slate-400">Not sure which product fits?</p>
            <Link href="#cta" onClick={() => setOpen(false)}>
              <Button size="sm" className="gold-btn text-white text-xs rounded-lg h-7 px-3 font-semibold">
                Speak With an Advisor
                <ArrowRight size={11} className="ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────
export default function VynraCapitalHomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const solutions = [
    {
      icon: Building2,
      title: "SBA Loans",
      slug: "sba-loans",
      range: "$150K – $5M",
      term: "Up to 25 yrs",
      items: [
        "Business acquisition financing",
        "Owner-occupied real estate",
        "Working capital & expansion",
        "Government-backed stability",
      ],
    },
    {
      icon: Zap,
      title: "Construction Loans",
      slug: "construction-loans",
      range: "$250K – $25M+",
      term: "12–36 months",
      items: [
        "Ground-up development",
        "Multifamily & commercial",
        "Milestone draw schedules",
        "Interest-only during build",
      ],
    },
    {
      icon: Building2,
      title: "Commercial Purchase",
      slug: "commercial-purchase-loans",
      range: "$500K – $20M+",
      term: "5–10 yr fixed",
      items: [
        "Income-producing acquisitions",
        "Office, retail & industrial",
        "20–25 yr amortization",
        "Fixed & adjustable rates",
      ],
    },
    {
      icon: Zap,
      title: "Bridge Loans",
      slug: "bridge-loans",
      range: "$250K – $15M+",
      term: "6–24 months",
      items: [
        "Time-sensitive acquisitions",
        "Asset repositioning",
        "Interest-only payments",
        "Defined exit strategies",
      ],
    },
    {
      icon: Landmark,
      title: "Hard Money Loans",
      slug: "hard-money-loans",
      range: "$100K – $10M",
      term: "6–24 months",
      items: [
        "Asset-based underwriting",
        "Fix & flip financing",
        "Fast approval & funding",
        "No income docs required",
      ],
    },
    {
      icon: TrendingUp,
      title: "DSCR Loans",
      slug: "dscr-loans",
      range: "$100K – $5M+",
      term: "30 yr / 5–10 yr",
      items: [
        "Qualified on rental cash flow",
        "No personal income docs",
        "Single-family & multifamily",
        "Portfolio scaling friendly",
      ],
    },
    {
      icon: Briefcase,
      title: "Merchant Cash Advances",
      slug: "merchant-cash-advances",
      range: "$10K – $500K",
      term: "3–18 months",
      items: [
        "Revenue-based approval",
        "Fund in 24–48 hours",
        "No fixed monthly payments",
        "Minimal documentation",
      ],
    },
  ];

  const pillars = [
    {
      icon: Shield,
      title: "Experience That Reduces Risk",
      desc: "Two decades of hands-on transaction structuring across commercial, hard money, and MCA financing — minimizing exposure at every stage.",
    },
    {
      icon: Network,
      title: "Deep Capital Access",
      desc: "Relationships spanning banks, non-bank lenders, hedge funds, insurance funds, and institutional capital providers nationwide.",
    },
    {
      icon: Layers,
      title: "Strategic Structuring",
      desc: "Every transaction is evaluated for approval and for how it impacts refinancing options, future leverage, and long-term positioning.",
    },
    {
      icon: Zap,
      title: "Speed with Discipline",
      desc: "We move decisively when time matters, while maintaining institutional-level underwriting standards throughout.",
    },
  ];

  const whoWeHelp = [
    "Real Estate Investors",
    "Business Owners",
    "Builders & Developers",
    "Commercial Brokers",
    "Real Estate Agents",
    "Loan Officers",
    "CPAs & Advisors",
    "Growing Enterprises",
  ];

  const navSolutions = [
    {
      title: "SBA Loans",
      slug: "sba-loans",
      desc: "Long-term government-backed business & real estate financing",
      icon: Building2,
    },
    {
      title: "Construction Loans",
      slug: "construction-loans",
      desc: "Ground-up & redevelopment project funding",
      icon: Zap,
    },
    {
      title: "Commercial Purchase",
      slug: "commercial-purchase-loans",
      desc: "Acquisition financing for income-producing properties",
      icon: Building2,
    },
    {
      title: "Bridge Loans",
      slug: "bridge-loans",
      desc: "Short-term transitional capital with defined exit strategies",
      icon: Zap,
    },
    {
      title: "Hard Money Loans",
      slug: "hard-money-loans",
      desc: "Asset-based private capital — fast approvals",
      icon: Landmark,
    },
    {
      title: "DSCR Loans",
      slug: "dscr-loans",
      desc: "Investor financing based on property cash flow",
      icon: TrendingUp,
    },
    {
      title: "Merchant Cash Advances",
      slug: "merchant-cash-advances",
      desc: "Revenue-based working capital in 24–48 hours",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-white antialiased">
      <style>{`
        .font-display { font-family: var(--font-dm-serif), Georgia, serif; }
        .hero-bg {
          background: linear-gradient(135deg, #111727 0%, #111727 45%, #111727 100%);
        }
        .gold-btn {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        }
        .gold-btn:hover {
          background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
        }
        .dot-pattern {
          background-image: radial-gradient(#b45309 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .grid-pattern {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
        }
      `}</style>

      {/* ═══════════════════════════════ NAVBAR ════════════════════════════ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "relative flex-shrink-0 transition-all duration-300 rounded-xl overflow-hidden",
                scrolled ? "w-36 h-10 bg-[#111727] px-2 py-1" : "w-36 h-10"
              )}
            >
              <Image
                src="/Vynra_Capital_Logo.png"
                alt="Vynra Capital"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav — Solutions dropdown + About only */}
            <div className="hidden lg:flex items-center gap-1">
              <SolutionsDropdown scrolled={scrolled} navSolutions={navSolutions} />
              <Link
                href="/about"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  scrolled
                    ? "text-slate-600 hover:text-[#111727] hover:bg-slate-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                About
              </Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium",
                  scrolled
                    ? "text-slate-600 hover:text-[#111727] hover:bg-slate-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                Speak With an Advisor
              </Button>
              <Button className="gold-btn text-white text-sm font-semibold px-5 rounded-xl shadow-none hover:shadow-md hover:shadow-amber-200 transition-all duration-300">
                Request a quote
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </div>

            {/* Mobile Sheet */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-[#111727]" : "text-white"}
                >
                  <Menu size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full overflow-y-auto">
                  <div className="p-6 border-b border-slate-100">
                    <div className="relative w-36 h-10 bg-[#111727] rounded-lg px-2 py-1">
                      <Image
                        src="/Vynra_Capital_Logo.png"
                        alt="Vynra Capital"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <nav className="flex-1 p-6">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
                      Solutions
                    </p>
                    <div className="space-y-1 mb-6">
                      {navSolutions.map(({ title, slug, icon: Icon }) => (
                        <Link
                          key={slug}
                          href={`/solutions/${slug}`}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium text-slate-600 hover:text-[#111727] hover:bg-amber-50 transition-all group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                            <Icon size={13} strokeWidth={1.8} />
                          </div>
                          {title}
                          <ChevronRight size={13} className="ml-auto text-slate-300 group-hover:text-slate-500" />
                        </Link>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
                      Company
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/about"
                        className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-slate-600 hover:text-[#111727] hover:bg-slate-50 transition-all group"
                      >
                        About
                        <ChevronRight size={13} className="text-slate-300 group-hover:text-slate-500" />
                      </Link>
                    </div>
                  </nav>
                  <div className="p-6 space-y-3 border-t border-slate-100">
                    <Button variant="outline" className="w-full rounded-xl text-sm">
                      Speak With an Advisor
                    </Button>
                    <Button className="w-full gold-btn text-white rounded-xl text-sm">
                      Request Capital
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>

      {/* ═══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <Badge
                variant="outline"
                className="border-white/20 bg-white/10 text-white/70 text-[10px] uppercase tracking-widest px-4 py-1.5 mb-8 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse inline-block" />
                Structured Funding for Sustainable Growth
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl xl:text-[4.5rem] text-white leading-[1.07] mb-6">
                Strategic Capital.
                <span className="block text-amber-400 mt-1">Structured for</span>
                <span className="block mt-1">Growth.</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                Over 20 years of experience delivering commercial, hard money, and alternative financing
                solutions through trusted banking, institutional, and private capital relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gold-btn text-white font-semibold rounded-xl px-8 h-13 text-base hover:shadow-lg hover:shadow-amber-600/25 transition-all duration-300 group"
                >
                  Request a quote
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:text-white rounded-xl px-8 h-13 text-base transition-all duration-300"
                >
                  Speak With an Advisor
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
                {["20+ Years Experience", "Multi-Billion Funded", "500+ Transactions Closed"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-500 flex-shrink-0" />
                    <span className="text-white/55 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Floating Dashboard Card */}
            <div className="hidden lg:block relative h-[520px]">
              <Card className="absolute top-6 left-4 right-4 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl shadow-none">
                <CardContent className="p-8">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">
                    Capital Structure Overview
                  </p>
                  <p className="font-display text-white text-2xl mb-7">
                    Multi-Source Financing<br />Approach
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Senior Debt (Bank / SBA)", pct: 65, color: "#d97706" },
                      { label: "Bridge / Hard Money", pct: 20, color: "#3b82f6" },
                      { label: "Private / Institutional", pct: 15, color: "#10b981" },
                    ].map(({ label, pct, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs text-white/50 mb-1.5">
                          <span>{label}</span>
                          <span className="font-semibold" style={{ color }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${pct}%`, background: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute bottom-0 left-0 right-16 bg-amber-600 border-0 rounded-2xl shadow-none">
                <CardContent className="p-5 flex gap-6">
                  {[
                    { v: "$2B+", l: "Volume Structured" },
                    { v: "500+", l: "Deals Closed" },
                    { v: "20+", l: "Years" },
                  ].map(({ v, l }) => (
                    <div key={l}>
                      <p className="text-white font-bold text-xl">{v}</p>
                      <p className="text-amber-100/70 text-xs mt-0.5">{l}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="absolute top-2 right-0 w-20 bg-[#111727] border border-white/15 rounded-xl shadow-none">
                <CardContent className="p-3 text-center">
                  <p className="text-amber-400 text-2xl font-bold">A+</p>
                  <p className="text-white/50 text-[10px] mt-1 leading-tight">Track Record</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 64" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════ STATS ═════════════════════════════ */}
      <section ref={statsRef} className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <StatCard value={20}  suffix="+"  label="Years of Experience"  active={statsActive} />
            <StatCard value={500} suffix="+"  label="Transactions Funded"  active={statsActive} />
            <StatCard value={2}   suffix="B+" label="Capital Structured"   active={statsActive} />
            <StatCard value={50}  suffix="+"  label="Capital Partners"     active={statsActive} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ POSITIONING ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative h-[460px] rounded-3xl overflow-hidden bg-[#111727] flex items-center justify-center">
              <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#111727] via-[#1a2236] to-[#111727]" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <div className="relative z-10 text-center px-10">
                <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-7 rounded-full" />
                <p className="font-display text-white text-2xl leading-relaxed italic">
                  &ldquo;We don&rsquo;t simply place loans. We structure financing designed to strengthen your position today while preparing you for what comes next.&rdquo;
                </p>
                <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-7 rounded-full" />
                <p className="text-amber-500 text-xs font-semibold mt-6 uppercase tracking-[0.2em]">
                  Vynra Capital
                </p>
              </div>
            </div>

            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Our Philosophy
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight mb-6">
                More Than a Lender.<br />A Capital Partner.
              </h2>
              <div className="space-y-4 text-slate-500 text-base leading-relaxed">
                <p>
                  Vynra Capital was founded with a clear objective: to provide business owners and investors access to sophisticated capital solutions without unnecessary friction.
                </p>
                <p>
                  After more than two decades structuring commercial, hard money, and MCA transactions, we recognized that borrowers needed more than approvals — they needed strategic guidance.
                </p>
                <p>
                  Our approach combines experience, relationships, and execution. We evaluate every deal through two lenses: immediate execution and long-term strategic positioning.
                </p>
              </div>
              <Separator className="my-8" />
              <div className="flex gap-8">
                {[
                  { v: "Banks", l: "Traditional Lenders" },
                  { v: "Hedge Funds", l: "Alternative Capital" },
                  { v: "Private", l: "Institutional Sources" },
                ].map(({ v, l }) => (
                  <div key={v}>
                    <p className="text-[#111727] font-bold text-sm">{v}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button variant="link" className="mt-8 p-0 text-[#111727] font-semibold group hover:text-amber-600 hover:no-underline transition-colors">
                  Learn Our Story
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ VALUE PILLARS ══════════════════════ */}
      <section className="py-24 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
              Why Vynra Capital
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight">
              Built on Experience.<br />Driven by Execution.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => <PillarCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SOLUTIONS ══════════════════════════ */}
      <section className="py-24 bg-white" id="solutions">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Capital Solutions
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight max-w-xl">
                7 Financing Products.<br />Every Capital Need Covered.
              </h2>
            </div>
            <Button
              size="lg"
              className="bg-[#111727] hover:bg-amber-600 text-white rounded-xl transition-colors duration-300 group self-start lg:self-auto"
            >
              View All Solutions
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {solutions.slice(0, 4).map((s) => <SolutionCard key={s.slug} {...s} />)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.slice(4).map((s) => <SolutionCard key={s.slug} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ WHO WE HELP ════════════════════════ */}
      <section className="py-24 bg-[#111727] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-amber-500/30 text-amber-400 bg-amber-500/10 text-[10px] uppercase tracking-widest mb-4">
              Our Clients
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              Capital Solutions for a<br />Broad Network.
            </h2>
            <p className="text-white/45 mt-5 max-w-lg mx-auto leading-relaxed">
              Whether you are acquiring your first investment property or managing a multi-asset portfolio,
              we structure financing that aligns with your objectives.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {whoWeHelp.map((role) => (
              <div
                key={role}
                className="border border-white/10 hover:border-amber-500/40 bg-white/5 hover:bg-white/8 rounded-xl px-5 py-5 text-center transition-all duration-300 cursor-default group"
              >
                <p className="text-white/60 group-hover:text-white text-sm font-medium transition-colors duration-200">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ PROCESS ════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Our Process
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight mb-4">
                Capital That Positions<br />You for the Future.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-10">
                The wrong financing can restrict growth. The right structure creates leverage, liquidity, and
                opportunity. We aim to become a long-term capital resource — not a one-time transaction
                facilitator.
              </p>
              <Button
                size="lg"
                className="gold-btn text-white rounded-xl font-semibold group hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                Start a Conversation
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
            <div className="lg:pl-8">
              <ProcessStep
                step="01"
                title="Intake & Discovery"
                desc="We begin with a direct conversation about your project, timeline, and financing objectives — no forms, no friction."
              />
              <ProcessStep
                step="02"
                title="Capital Assessment"
                desc="We evaluate your deal across our full network — banks, private lenders, bridge funds — to identify the optimal structure."
              />
              <ProcessStep
                step="03"
                title="Structuring & Placement"
                desc="We structure the transaction to maximize approval probability while protecting your long-term flexibility."
              />
              <ProcessStep
                step="04"
                title="Execution & Close"
                desc="We manage the process from term sheet to funding — coordinating lenders, legal, and all parties to close efficiently."
                last
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ FINAL CTA ══════════════════════════ */}
      <section className="py-24 bg-amber-50/40" id="cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-amber-200 text-amber-700 bg-white text-[10px] uppercase tracking-widest mb-5">
            Get Started
          </Badge>
          <h2 className="font-display text-4xl lg:text-6xl text-[#111727] leading-tight mb-6">
            Let&rsquo;s Structure the Right<br />Capital Solution.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you are pursuing acquisition, expansion, development, or liquidity — we will evaluate
            your goals and align them with the appropriate capital source.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gold-btn text-white font-semibold px-10 rounded-xl text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 group h-14"
            >
              Start a Conversation
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#111727] text-[#111727] hover:bg-[#111727] hover:text-white rounded-xl text-base px-10 transition-all duration-300 h-14"
            >
              Submit Funding Request
            </Button>
          </div>
        </div>
      </section>

{/* ═══════════════════════════════ FOOTER ═════════════════════════════ */}
      <footer className="bg-[#111727] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-14" />

          <div className="grid lg:grid-cols-5 gap-10 pb-12">

            {/* Brand col */}
            <div className="lg:col-span-2">
              <div className="relative w-50 h-20 bg-[#111727] mb-6">
                <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill className="object-contain" />
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                Strategic capital solutions structured for growth, backed by 20+ years of experience across
                commercial and alternative financing.
              </p>

              {/* Tagline pill */}
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-full px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 animate-pulse" />
                <span className="text-white/35 text-[10px] font-medium uppercase tracking-widest">
                  Structured Funding for Sustainable Growth
                </span>
              </div>

              <Separator className="bg-white/8 mb-6" />

              {/* Contact */}
              <div className="space-y-3">
                {[
                  { icon: Phone,  text: "+1 (800) 000-0000",     href: "tel:+18000000000" },
                  { icon: Mail,   text: "hello@vynracapital.com", href: "mailto:hello@vynracapital.com" },
                  { icon: MapPin, text: "United States",          href: "#" },
                ].map(({ icon: Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-center gap-3 text-white/35 text-sm hover:text-white/70 transition-colors duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors duration-200">
                      <Icon size={13} className="text-amber-500" />
                    </div>
                    {text}
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions col */}
            <div>
              <p className="text-white/60 font-semibold text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-amber-500" />
                Solutions
              </p>
              <ul className="space-y-3">
                {solutions.map(({ title, slug }) => (
                  <li key={slug}>
                    <Link
                      href={`/solutions/${slug}`}
                      className="text-white/35 text-sm hover:text-amber-400 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company col — About Vynra only */}
            <div>
              <p className="text-white/60 font-semibold text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-amber-500" />
                Company
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-white/35 text-sm hover:text-amber-400 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    About Vynra
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources col */}
            <div>
              <p className="text-white/60 font-semibold text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-amber-500" />
                Resources
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Request Capital",        href: "#cta" },
                  { label: "Speak With an Advisor",  href: "#cta" },
                  { label: "Submit Funding Request", href: "#cta" },
                  { label: "Partner With Us",        href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/35 text-sm hover:text-amber-400 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="h-px bg-white/8 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <p className="text-white/20 text-xs">
                © {new Date().getFullYear()} Vynra Capital. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use", "Disclosures"].map((link, i, arr) => (
                <span key={link} className="flex items-center gap-6">
                  <a
                    href="#"
                    className="text-white/20 text-xs hover:text-white/50 transition-colors duration-200"
                  >
                    {link}
                  </a>
                  {i < arr.length - 1 && (
                    <span className="w-px h-3 bg-white/10" />
                  )}
                </span>
              ))}
            </div>
          </div>

        </div>
      </footer>


    </div>
  );
}