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
  Menu,
  Building2,
  Landmark,
  TrendingUp,
  Briefcase,
  Zap,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Quote,
  Users,
  Handshake,
  Target,
  Award,
  Star,
  TrendingUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav Data ─────────────────────────────────────────────────
const navSolutions = [
  { title: "SBA Loans",              slug: "sba-loans",               desc: "Long-term government-backed business & real estate financing", icon: Building2  },
  { title: "Construction Loans",     slug: "construction-loans",      desc: "Ground-up & redevelopment project funding",                   icon: Zap         },
  { title: "Commercial Purchase",    slug: "commercial-purchase-loans", desc: "Acquisition financing for income-producing properties",     icon: Building2  },
  { title: "Bridge Loans",           slug: "bridge-loans",            desc: "Short-term transitional capital with defined exit strategies", icon: Zap        },
  { title: "Hard Money Loans",       slug: "hard-money-loans",        desc: "Asset-based private capital — fast approvals",                icon: Landmark   },
  { title: "DSCR Loans",            slug: "dscr-loans",              desc: "Investor financing based on property cash flow",              icon: TrendingUp  },
  { title: "Merchant Cash Advances", slug: "merchant-cash-advances",  desc: "Revenue-based working capital in 24–48 hours",               icon: Briefcase  },
];

// ─── Solutions Dropdown ───────────────────────────────────────
function SolutionsDropdown({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
          className={cn("transition-transform duration-200", open ? "rotate-90" : "rotate-0")}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 z-50 w-[620px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Dropdown header */}
          <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Capital Solutions</p>
              <p className="text-xs text-slate-500 mt-0.5">7 financing products across all capital needs</p>
            </div>
            <Link href="/#solutions" onClick={() => setOpen(false)}>
              <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-widest hover:text-amber-700 flex items-center gap-1">
                View All <ArrowRight size={10} />
              </span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-0.5 p-3 bg-slate-50/40">
            {navSolutions.map(({ title, slug, desc, icon: Icon }) => (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3.5 hover:bg-white hover:shadow-sm transition-all group bg-transparent"
              >
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5 border border-slate-100">
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111727] group-hover:text-amber-700 leading-tight">{title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 bg-[#111727] flex items-center justify-between">
            <div>
              <p className="text-white text-xs font-semibold">Not sure which product fits your deal?</p>
              <p className="text-white/40 text-[10px] mt-0.5">We'll evaluate and recommend the right structure.</p>
            </div>
            <Link href="/#cta" onClick={() => setOpen(false)}>
              <Button size="sm" className="gold-btn text-white text-xs rounded-lg h-8 px-4 font-semibold flex-shrink-0">
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

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
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
            <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill className="object-contain" priority />
          </Link>

          {/* Desktop Nav — Solutions + About only */}
          <div className="hidden lg:flex items-center gap-1">
            <SolutionsDropdown scrolled={scrolled} />
            <Link
              href="/about"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                scrolled
                  ? "text-[#111727] bg-slate-50 font-semibold"
                  : "text-white bg-white/10 font-semibold"
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
              <Button variant="ghost" size="icon" className={scrolled ? "text-[#111727]" : "text-white"}>
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-36 h-10 bg-[#111727] rounded-lg px-2 py-1">
                    <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill className="object-contain" />
                  </div>
                </div>
                <nav className="flex-1 p-6">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">Solutions</p>
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
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">Company</p>
                  <div className="space-y-1">
                    <Link
                      href="/about"
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-[#111727] bg-amber-50 transition-all"
                    >
                      About
                      <ChevronRight size={13} className="text-amber-500" />
                    </Link>
                  </div>
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
  );
}

// ─── About Page ───────────────────────────────────────────────
export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const values = [
    {
      icon: Target,
      title: "Disciplined Execution",
      desc: "Every transaction is managed with institutional-level rigor — from initial intake through closing, with no detail left unaddressed.",
    },
    {
      icon: Handshake,
      title: "Long-Term Relationships",
      desc: "We are not a one-time transaction provider. Our goal is to become a trusted, long-term capital resource for every client we serve.",
    },
    {
      icon: Award,
      title: "Intelligent Structuring",
      desc: "We evaluate every deal for immediate approval and for how it positions the borrower for refinancing, future leverage, and growth.",
    },
    {
      icon: Users,
      title: "Broad Capital Access",
      desc: "Relationships with banks, hedge funds, insurance-backed lenders, private capital, and institutional funding groups nationwide.",
    },
  ];

  const capitalPartners = [
    "Commercial Banks",
    "Non-Bank Lenders",
    "Hedge Funds",
    "Insurance-Backed Capital",
    "Private Lenders",
    "Institutional Funding Groups",
  ];

  const timeline = [
    {
      year: "2004",
      title: "Career Begins at Triumph Funding",
      desc: "Jason starts as the first loan officer at Triumph Funding in New York, quickly becoming a trusted resource for complex commercial and hard money transactions.",
      highlight: "First Loan Officer",
    },
    {
      year: "2007",
      title: "Triumph Funding Scales to 100+ Loan Officers",
      desc: "Playing a key role in growing the firm into one of the largest mortgage brokerage operations on Long Island, with over 100 loan officers.",
      highlight: "100+ Loan Officers",
    },
    {
      year: "2010s",
      title: "Co-Ownership of Flagstar Bank Branch",
      desc: "Jason co-owns a branch of Flagstar Bank, deepening his institutional banking experience and expanding his relationships across multiple lending platforms.",
      highlight: "Bank Co-Owner",
    },
    {
      year: "Present",
      title: "Vynra Capital Founded",
      desc: "Drawing on 20+ years across banking, brokerage, and private lending, Jason founds Vynra Capital to deliver strategic, structured capital solutions with speed and discipline.",
      highlight: "Founder & CEO",
    },
  ];

  return (
    <div className="min-h-screen bg-white antialiased">
      <style>{`
        .font-display { font-family: var(--font-dm-serif), Georgia, serif; }
        .hero-bg { background: linear-gradient(135deg, #0d1421 0%, #111727 60%, #152035 100%); }
        .gold-btn { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); }
        .gold-btn:hover { background: linear-gradient(135deg, #b45309 0%, #92400e 100%); }
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
        .timeline-card:hover .timeline-year {
          background: #d97706;
        }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="hero-bg relative min-h-[72vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/60 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-28 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/35 text-xs mb-12">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span className="text-white/60 font-medium">About</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left — 3 cols */}
            <div className="lg:col-span-3">
              <Badge
                variant="outline"
                className="border-white/20 bg-white/8 text-white/60 text-[10px] uppercase tracking-widest px-4 py-1.5 mb-7 rounded-full backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse inline-block" />
                About Vynra Capital
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-6">
                More Than a Lender.
                <span className="block text-amber-400 mt-2">A Capital Partner.</span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
                Founded by Jason Smith after 20+ years across banking, brokerage, and commercial lending — Vynra Capital delivers financing with discipline, strategy, and long-term positioning at the forefront.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Founded 2004",
                  "20+ Years Experience",
                  "500+ Transactions",
                  "$2B+ Structured",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                    <span className="text-white/50 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 2 cols stat cards */}
            <div className="hidden lg:grid lg:col-span-2 grid-cols-2 gap-3">
              {[
                { value: "20+", label: "Years of Experience", sub: "Since 2004", icon: Award },
                { value: "500+", label: "Transactions Closed", sub: "Across all products", icon: CheckCircle2 },
                { value: "$2B+", label: "Volume Structured", sub: "Commercial & private", icon: TrendingUp },
                { value: "50+", label: "Capital Partners", sub: "Banks to hedge funds", icon: Users },
              ].map(({ value, label, sub, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/6 backdrop-blur-xl border border-white/12 rounded-2xl p-5 group hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 mb-3">
                    <Icon size={15} strokeWidth={1.8} />
                  </div>
                  <p className="text-3xl font-bold text-amber-400 leading-none mb-1">{value}</p>
                  <p className="text-white/80 font-semibold text-xs leading-tight">{label}</p>
                  <p className="text-white/30 text-[10px] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 64" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </section>

      {/* ════════════════════ FOUNDER BIO ════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left — Photo + Quick Facts */}
            <div className="lg:sticky lg:top-28">
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111727] mb-7">
                <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d1421] via-[#111727] to-[#1a2840]" />
                {/* Replace with: <Image src="/jason-smith.jpg" alt="Jason Smith" fill className="object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-5xl font-bold font-display">JS</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl font-display mt-2">Jason Smith</p>
                    <p className="text-amber-400 text-sm mt-1 font-medium">Founder, Vynra Capital</p>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-white/30 text-xs mt-1">20+ Years in Lending</p>
                  </div>
                </div>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111727]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>

              {/* Quick facts */}
              <Card className="border border-slate-100 shadow-none rounded-2xl overflow-hidden">
                <div className="bg-[#111727] px-7 py-4">
                  <p className="text-[10px] text-amber-400/70 uppercase tracking-widest font-semibold">Quick Facts</p>
                </div>
                <CardContent className="p-0">
                  {[
                    { label: "Career Start", value: "2004, New York" },
                    { label: "First Role", value: "Loan Officer #1 — Triumph Funding" },
                    { label: "Team Built", value: "100+ Loan Officers at Triumph" },
                    { label: "Bank Ownership", value: "Co-Owner, Flagstar Bank Branch" },
                    { label: "Specialty", value: "Commercial & Structured Deals" },
                    { label: "Founded Vynra", value: "After 20+ Years in Lending" },
                  ].map(({ label, value }, i, arr) => (
                    <div
                      key={label}
                      className={cn(
                        "flex justify-between items-center px-7 py-4 gap-6",
                        i < arr.length - 1 ? "border-b border-slate-50" : "",
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      )}
                    >
                      <span className="text-slate-400 text-sm flex-shrink-0">{label}</span>
                      <span className="text-[#111727] font-semibold text-sm text-right">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right — Full Bio */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest">
                  Founder &amp; Principal
                </Badge>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight mb-2">
                Jason Smith
              </h2>
              <p className="text-amber-600 font-semibold text-base mb-8 flex items-center gap-2">
                Founder, Vynra Capital
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-slate-400 font-normal text-sm">New York</span>
              </p>

              <div className="space-y-5 text-slate-500 text-base leading-relaxed mb-10">
                <p>
                  Jason Smith is the Founder of Vynra Capital, bringing more than 20 years of experience in commercial, asset-based, and structured financing.
                </p>
                <p>
                  Jason began his career in 2004 in New York as the first loan officer at Triumph Funding. He helped grow the firm into one of the largest mortgage brokerage operations on Long Island, expanding to more than 100 loan officers. During this period, Jason became a trusted resource for complex hard money and commercial transactions, supporting both clients and fellow loan officers.
                </p>
                <p>
                  He later went on to co-own a branch of Flagstar Bank and has worked across multiple banks and brokerages throughout his career. While his experience spans residential and institutional lending environments, his expertise and passion have consistently centered on commercial and structured deals.
                </p>
                <p>
                  Jason leverages longstanding relationships with banks, non-bank lenders, hedge funds, insurance-backed capital providers, private lenders, and institutional funding groups to structure financing solutions that serve both immediate objectives and long-term positioning.
                </p>
                <p>
                  At Vynra Capital, Jason focuses on disciplined execution, intelligent structuring, and long-term advisory relationships with investors, business owners, builders, and financial professionals.
                </p>
              </div>

              <Separator className="mb-10" />

              {/* Founder's letter */}
              <div className="relative rounded-2xl overflow-hidden bg-[#111727] mb-10">
                <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <div className="relative z-10 p-8">
                  <Quote size={32} className="text-amber-500/60 mb-5" strokeWidth={1.5} />
                  <p className="text-white/75 text-base leading-relaxed italic mb-8">
                    I started Vynra Capital after more than 20 years in banking, brokerage, and commercial lending because I saw a gap in the market. Too often, borrowers were offered financing without strategy. Through every role, my focus gravitated toward commercial and structured transactions. Those relationships allow Vynra Capital to structure financing thoughtfully and position clients for long-term growth. My mission is simple: deliver capital with discipline, integrity, and a forward-looking strategy that strengthens every client's financial position.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                        <span className="text-amber-400 font-bold text-sm">JS</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Jason Smith</p>
                        <p className="text-amber-500/70 text-xs">Founder, Vynra Capital</p>
                      </div>
                    </div>
                    <div className="w-12 h-0.5 bg-amber-500/30 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Capital network */}
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-4">Capital Network</p>
                <div className="flex flex-wrap gap-2">
                  {capitalPartners.map((partner) => (
                    <span
                      key={partner}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3.5 py-1.5 hover:bg-amber-100 transition-colors cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CAREER TIMELINE ════════════════════ */}
      <section className="py-28 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.025]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
              Career History
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight">
              20+ Years of Building.<br />Structuring. Executing.
            </h2>
            <p className="text-slate-400 text-base mt-4 max-w-lg mx-auto">
              A career built deal by deal — from first loan officer to institutional bank co-owner to founding Vynra Capital.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map(({ year, title, desc, highlight }, i) => (
              <div key={year} className="flex gap-8 timeline-card group">
                <div className="flex flex-col items-center">
                  <div className="timeline-year w-16 h-16 rounded-2xl bg-[#111727] flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors duration-300 shadow-lg">
                    <span className="text-amber-400 text-xs font-bold text-center leading-tight group-hover:text-white transition-colors duration-300">{year}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-slate-200 to-slate-100 mt-4 min-h-[56px]" />
                  )}
                </div>
                <div className="pb-14 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-[#111727] text-lg leading-snug">{title}</h3>
                    <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5">
                      {highlight}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ VALUES ════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Our Approach
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-[#111727] leading-tight">
                How We Operate.
              </h2>
            </div>
            <p className="text-slate-500 text-base leading-relaxed">
              Every engagement at Vynra Capital is grounded in four operating principles that define how we evaluate deals, build relationships, and deliver results for our clients.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Card key={title} className="group border border-slate-100 shadow-none hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1.5 bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-7">
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-5">
                    0{i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-[#111727] group-hover:text-amber-400 transition-colors duration-300">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-bold text-[#111727] text-base mb-3 leading-snug">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO WE HELP ════════════════════ */}
      <section className="py-28 bg-[#111727] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-amber-500/3 blur-[80px] -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-400 bg-amber-500/10 text-[10px] uppercase tracking-widest mb-5">
                Who We Serve
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
                Built for Investors,<br />Owners &amp; Builders.
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Whether you are acquiring your first investment property, scaling a commercial portfolio, or developing ground-up, Vynra Capital structures financing that aligns with your objectives and long-term position.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gold-btn text-white font-semibold rounded-xl group hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  Start a Conversation
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Link href="/#solutions">
                  <Button variant="outline" className="border-white/25 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:text-white rounded-xl transition-all duration-300">
                    View All Solutions
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Real Estate Investors",
                "Business Owners",
                "Builders & Developers",
                "Commercial Brokers",
                "Real Estate Agents",
                "Loan Officers",
                "CPAs & Advisors",
                "Growing Enterprises",
              ].map((role) => (
                <div
                  key={role}
                  className="border border-white/10 hover:border-amber-500/50 bg-white/4 hover:bg-amber-500/8 rounded-xl px-5 py-5 text-center transition-all duration-300 cursor-default group"
                >
                  <p className="text-white/55 group-hover:text-white text-sm font-medium transition-colors duration-200">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-[80px]" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-6">
            Get Started
          </Badge>
          <h2 className="font-display text-4xl lg:text-6xl text-[#111727] leading-tight mb-6">
            Let&rsquo;s Structure the Right<br />Capital Solution.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Tell us about your project and goals. Jason and the Vynra Capital team will evaluate your situation and align it with the best capital source available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gold-btn text-white font-semibold px-10 rounded-xl text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 group h-14"
            >
              Request a quote
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#111727] text-[#111727] hover:bg-[#111727] hover:text-white rounded-xl text-base px-10 transition-all duration-300 h-14"
            >
              Speak With an Advisor
            </Button>
          </div>
        </div>
      </section>

{/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="bg-[#111727] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-14" />

          <div className="grid lg:grid-cols-5 gap-10 pb-12">

            {/* Brand col */}
            <div className="lg:col-span-2">
              <div className="relative w-50 h-20 mb-6">
                <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill className="object-contain" />
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                Strategic capital solutions structured for growth, backed by 20+ years of experience across commercial and alternative financing.
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
                {navSolutions.map(({ title, slug }) => (
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
