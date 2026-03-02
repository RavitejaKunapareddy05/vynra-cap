"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  icon: Icon, title, items,
}: {
  icon: React.ElementType; title: string; items: string[];
}) {
  return (
    <Card className="group border border-slate-100 shadow-none hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-7">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="font-bold text-[#111727] text-lg mb-4">{title}</h3>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-slate-100">
          <Button variant="ghost" size="sm" className="text-[#111727] hover:text-amber-600 p-0 h-auto font-semibold group/btn">
            Learn More
            <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
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

  // ── Data ──────────────────────────────────────────────────
  const solutions = [
    {
      icon: Building2,
      title: "Commercial Real Estate",
      items: ["SBA Loans", "Commercial Purchase Loans", "Construction & Development", "Bridge Financing"],
    },
    {
      icon: Landmark,
      title: "Hard Money & Private",
      items: ["Fix & Flip Financing", "Hard Money Loans", "Asset-Based Lending", "Private Capital Solutions"],
    },
    {
      icon: TrendingUp,
      title: "Investor Financing",
      items: ["DSCR Investor Loans", "Portfolio Loans", "Multi-Family Financing", "Ground-Up Construction"],
    },
    {
      icon: Briefcase,
      title: "Business Capital",
      items: ["Merchant Cash Advances", "Revenue-Based Funding", "Working Capital", "Equipment Financing"],
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
    { title: "Commercial Real Estate", desc: "SBA, purchase, construction & bridge loans" },
    { title: "Hard Money & Private", desc: "Fast asset-based & private capital" },
    { title: "DSCR Investor Loans", desc: "Investor financing without income docs" },
    { title: "Merchant Cash Advances", desc: "Revenue-based working capital" },
  ];

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
        .font-display { font-family: 'DM Serif Display', Georgia, serif !important; }
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
            <a
              href="/"
              className={cn(
                "relative flex-shrink-0 transition-all duration-300 rounded-xl overflow-hidden",
                scrolled ? "w-36 h-10 bg-[#111727] px-2 py-1" : "w-45 h-35"
              )}
            >
              <Image
                src="/Vynra_Capital_Logo.png"
                alt="Vynra Capital"
                fill
                className="object-contain"
                priority
              />
            </a>

            {/* Desktop Nav — shadcn NavigationMenu */}
            <div className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Solutions Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent hover:bg-transparent focus:bg-transparent text-sm font-medium transition-colors",
                        scrolled ? "text-slate-600 hover:text-[#111727]" : "text-white/80 hover:text-white data-[state=open]:text-white"
                      )}
                    >
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[480px] p-4 grid grid-cols-2 gap-2">
                        {navSolutions.map(({ title, desc }) => (
                          <NavigationMenuLink key={title} asChild>
                            <a
                              href="#"
                              className="block rounded-xl p-4 hover:bg-amber-50 transition-colors group"
                            >
                              <p className="text-sm font-semibold text-[#111727] group-hover:text-amber-700">{title}</p>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {["About", "Who We Help", "Process"].map((item) => (
                    <NavigationMenuItem key={item}>
                      <NavigationMenuLink
                        href="#"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-transparent text-sm font-medium transition-colors",
                          scrolled ? "text-slate-600 hover:text-[#111727]" : "text-white/80 hover:text-white"
                        )}
                      >
                        {item}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium",
                  scrolled ? "text-slate-600 hover:text-[#111727] hover:bg-slate-50" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                Speak With an Advisor
              </Button>
              <Button
                className="gold-btn text-white text-sm font-semibold px-5 rounded-xl shadow-none hover:shadow-md hover:shadow-amber-200 transition-all duration-300"
              >
                Request Capital
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
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100">
                    <div className="relative w-45 h-25">
                      <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill className="object-contain" />
                    </div>
                  </div>
                  <nav className="flex-1 p-6 space-y-1">
                    {["Solutions", "About", "Who We Help", "Process", "Contact"].map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="flex items-center justify-between py-3 text-sm font-medium text-slate-600 hover:text-[#111727] border-b border-slate-50 group"
                      >
                        {link}
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </nav>
                  <div className="p-6 space-y-3 border-t border-slate-100">
                    <Button variant="outline" className="w-full rounded-xl text-sm">Speak With an Advisor</Button>
                    <Button className="w-full gold-btn text-white rounded-xl text-sm">Request Capital</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>

      {/* ═══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">

        {/* BG layers */}
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
                  Request Capital
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
              {/* Main card */}
              <Card className="absolute top-6 left-4 right-4 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl shadow-none">
                <CardContent className="p-8">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Capital Structure Overview</p>
                  <p className="font-display text-white text-2xl mb-7">Multi-Source Financing<br />Approach</p>
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

              {/* Bottom metrics strip */}
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

              {/* Track record badge */}
              <Card className="absolute top-2 right-0 w-20 bg-[#111727] border border-white/15 rounded-xl shadow-none">
                <CardContent className="p-3 text-center">
                  <p className="text-amber-400 text-2xl font-bold">A+</p>
                  <p className="text-white/50 text-[10px] mt-1 leading-tight">Track Record</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>

        {/* Wave divider */}
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
            <StatCard value={20}  suffix="+"  label="Years of Experience"    active={statsActive} />
            <StatCard value={500} suffix="+"  label="Transactions Funded"    active={statsActive} />
            <StatCard value={2}   suffix="B+" label="Capital Structured"     active={statsActive} />
            <StatCard value={50}  suffix="+"  label="Capital Partners"       active={statsActive} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ POSITIONING ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Visual Quote Block */}
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
                <p className="text-amber-500 text-xs font-semibold mt-6 uppercase tracking-[0.2em]">Vynra Capital</p>
              </div>
            </div>

            {/* Text */}
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
              <Button variant="link" className="mt-8 p-0 text-[#111727] font-semibold group hover:text-amber-600 hover:no-underline transition-colors">
                Learn Our Story
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Capital Solutions
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight max-w-xl">
                Comprehensive Financing<br />Across Every Need.
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s) => <SolutionCard key={s.title} {...s} />)}
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
              Whether you are acquiring your first investment property or managing a multi-asset portfolio, we structure financing that aligns with your objectives.
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
                The wrong financing can restrict growth. The right structure creates leverage, liquidity, and opportunity. We aim to become a long-term capital resource — not a one-time transaction facilitator.
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
                title="Evaluate Your Goals"
                desc="We start by understanding your transaction objectives, timeline, and long-term capital strategy — not just the immediate funding need."
              />
              <ProcessStep
                step="02"
                title="Structure the Right Solution"
                desc="Drawing on deep relationships across capital markets, we identify the right source and structure that maximizes your leverage and flexibility."
              />
              <ProcessStep
                step="03"
                title="Execute with Precision"
                desc="From underwriting preparation to closing, we manage the process with institutional discipline — moving decisively while protecting your interests."
                last
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ FINAL CTA ══════════════════════════ */}
      <section className="py-24 bg-amber-50/40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-amber-200 text-amber-700 bg-white text-[10px] uppercase tracking-widest mb-5">
            Get Started
          </Badge>
          <h2 className="font-display text-4xl lg:text-6xl text-[#111727] leading-tight mb-6">
            Let&rsquo;s Structure the Right<br />Capital Solution.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you are pursuing acquisition, expansion, development, or liquidity — we will evaluate your goals and align them with the appropriate capital source.
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
          <div className="grid lg:grid-cols-5 gap-10 pb-12">

            {/* Brand col */}
            <div className="lg:col-span-2">
              <div className="relative w-70 h-18 mb-4">
                <Image
                  src="/Vynra_Capital_Logo.png"
                  alt="Vynra Capital"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
                Strategic capital solutions structured for growth, backed by 20+ years of experience across commercial and alternative financing.
              </p>
              <div className="flex items-center gap-3 text-white/30 text-xs font-medium uppercase tracking-widest">
                <span className="w-6 h-px bg-amber-500" />
                Structured Funding for Sustainable Growth
              </div>
              <Separator className="bg-white/10 mt-8 mb-6" />
              <div className="space-y-2">
                {[
                  { icon: Phone, text: "+1 (800) 000-0000" },
                  { icon: Mail, text: "hello@vynracapital.com" },
                  { icon: MapPin, text: "United States" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-white/40 text-sm">
                    <Icon size={13} className="text-amber-500 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {[
              {
                heading: "Solutions",
                links: ["Commercial Real Estate", "Hard Money Loans", "DSCR Investor Loans", "SBA Loans", "Bridge Financing", "Merchant Cash Advances"],
              },
              {
                heading: "Company",
                links: ["About Vynra", "Who We Help", "Our Process", "Capital Partners", "Careers"],
              },
              {
                heading: "Resources",
                links: ["Request Capital", "Speak With an Advisor", "Submit Funding Request", "Partner With Us"],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-white font-semibold text-xs uppercase tracking-widest mb-5">{heading}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 text-sm hover:text-amber-400 transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-white/10 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs">© 2025 Vynra Capital. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use", "Disclosures"].map((link) => (
                <a key={link} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}