"use client";

import { useParams, notFound } from "next/navigation";
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
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Clock,
  BarChart3,
  Menu,
  Building2,
  Landmark,
  TrendingUp,
  Briefcase,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getLoanBySlug, loanProducts } from "@/lib/loan-data";

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
function SolutionsDropdown({ scrolled, activeSlug }: { scrolled: boolean; activeSlug: string }) {
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
          // Highlight Solutions as active since we're on a solution page
          scrolled
            ? "text-[#111727] bg-slate-50 font-semibold"
            : "text-white bg-white/10 font-semibold"
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
                className={cn(
                  "flex items-start gap-3 rounded-xl p-3.5 transition-all group",
                  slug === activeSlug
                    ? "bg-amber-50 border border-amber-100"
                    : "hover:bg-white hover:shadow-sm bg-transparent"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 border",
                  slug === activeSlug
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white shadow-sm text-amber-600 group-hover:bg-amber-600 group-hover:text-white border-slate-100"
                )}>
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <div>
                  <p className={cn(
                    "text-sm font-semibold leading-tight",
                    slug === activeSlug ? "text-amber-700" : "text-[#111727] group-hover:text-amber-700"
                  )}>
                    {title}
                  </p>
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
function Navbar({ scrolled, activeSlug }: { scrolled: boolean; activeSlug: string }) {
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <SolutionsDropdown scrolled={scrolled} activeSlug={activeSlug} />
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
                        className={cn(
                          "flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium transition-all group",
                          slug === activeSlug
                            ? "text-[#111727] bg-amber-50 font-semibold"
                            : "text-slate-600 hover:text-[#111727] hover:bg-amber-50"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                          slug === activeSlug
                            ? "bg-amber-600 text-white"
                            : "bg-amber-50 text-amber-600"
                        )}>
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
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-slate-600 hover:text-[#111727] hover:bg-slate-50 transition-all group"
                    >
                      About
                      <ChevronRight size={13} className="text-slate-300 group-hover:text-slate-500" />
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

// ─── Term Item ───────────────────────────────────────────────
function TermItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:border-amber-200 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">{label}</p>
        <p className="text-[#111727] font-semibold text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─── Use Case Card ───────────────────────────────────────────
function UseCaseCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="group border border-slate-100 shadow-none hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
      <CardContent className="p-7">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mb-4" />
        <h3 className="font-bold text-[#111727] text-base mb-2 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

// ─── Related Card ────────────────────────────────────────────
function RelatedCard({ slug, headline, subheadline, icon: Icon }: {
  slug: string; headline: string; subheadline: string; icon: React.ElementType;
}) {
  return (
    <Link href={`/solutions/${slug}`}>
      <div className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md bg-white transition-all duration-300 cursor-pointer">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-[#111727] group-hover:text-amber-400 transition-colors duration-300 flex-shrink-0">
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#111727] text-sm leading-snug">{headline}</p>
          <p className="text-slate-400 text-xs mt-0.5 truncate">{subheadline}</p>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors duration-200 flex-shrink-0" />
      </div>
    </Link>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function LoanProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const loan = getLoanBySlug(slug);
  if (!loan) notFound();

  const [scrolled, setScrolled] = useState(false);
  const Icon = loan.icon;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const related = loanProducts.filter((p) => p.slug !== loan.slug).slice(0, 4);

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
      `}</style>

      <Navbar scrolled={scrolled} activeSlug={slug} />

      {/* ════════ HERO ════════ */}
      <section className="hero-bg relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/4 blur-3xl" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/#solutions" className="hover:text-white/70 transition-colors">Solutions</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{loan.headline}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <Badge
                variant="outline"
                className="border-white/20 bg-white/10 text-white/70 text-[10px] uppercase tracking-widest px-4 py-1.5 mb-6 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse inline-block" />
                {loan.badge}
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl text-white leading-[1.07] mb-4">
                {loan.headline}
              </h1>
              <p className="text-amber-400 text-lg font-medium mb-6">{loan.subheadline}</p>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-lg">
                {loan.overview}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gold-btn text-white font-semibold rounded-xl px-8 h-13 text-base hover:shadow-lg hover:shadow-amber-600/25 transition-all duration-300 group"
                >
                  {loan.ctaLabel}
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
            </div>

            {/* Right — Summary Card */}
            <div className="hidden lg:block">
              <Card className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl shadow-none">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-base">{loan.headline}</p>
                      <p className="text-white/40 text-xs">{loan.badge}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[
                      { label: "Loan Range", value: `${loan.loanRange.min} – ${loan.loanRange.max}` },
                      { label: "Term",        value: loan.terms.term },
                      { label: "Amortization", value: loan.terms.amortization },
                      { label: "Rate",        value: loan.terms.rateStructure },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                        <span className="text-white/40 text-sm">{label}</span>
                        <span className="text-white font-semibold text-sm text-right max-w-[180px]">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 gold-btn text-white rounded-xl font-semibold group">
                    {loan.ctaLabel}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
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

      {/* ════════ LOAN TERMS ════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Loan Structure
              </Badge>
              <h2 className="font-display text-4xl text-[#111727] leading-tight mb-6">
                Typical Terms &<br />Loan Parameters
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10">
                Every transaction is structured individually. The parameters below represent typical ranges — actual terms depend on the asset, borrower profile, and market conditions.
              </p>
              <div className="grid gap-4">
                <TermItem icon={Clock}      label="Loan Term"      value={loan.terms.term} />
                <TermItem icon={BarChart3}  label="Amortization"   value={loan.terms.amortization} />
                <TermItem icon={BarChart3}  label="Rate Structure"  value={loan.terms.rateStructure} />
                <TermItem icon={DollarSign} label="Loan Range"     value={`${loan.loanRange.min} – ${loan.loanRange.max}`} />
              </div>
            </div>
            <div>
              <div className="bg-slate-50/60 rounded-3xl p-8 border border-slate-100 mb-6">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-5">Key Highlights</p>
                <ul className="space-y-3">
                  {loan.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-amber-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#111727] p-7">
                <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <div className="relative z-10">
                  <div className="w-8 h-0.5 bg-amber-500 mb-5 rounded-full" />
                  <p className="text-white/80 text-sm leading-relaxed italic">&ldquo;{loan.positioning}&rdquo;</p>
                  <p className="text-amber-500 text-xs font-semibold mt-4 uppercase tracking-[0.15em]">Vynra Capital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ USE CASES ════════ */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
              Common Applications
            </Badge>
            <h2 className="font-display text-4xl text-[#111727] leading-tight">
              When to Use {loan.headline}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {loan.useCases.map((uc) => <UseCaseCard key={uc.title} {...uc} />)}
          </div>
        </div>
      </section>

      {/* ════════ RELATED SOLUTIONS ════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] uppercase tracking-widest mb-4">
                Explore More
              </Badge>
              <h2 className="font-display text-4xl text-[#111727] leading-tight mb-4">
                Other Capital<br />Solutions
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Vynra Capital offers a comprehensive suite of financing options. Many transactions involve multiple structures working together.
              </p>
              <Button
                size="lg"
                className="gold-btn text-white font-semibold rounded-xl group hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                View All Solutions
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
            <div className="grid gap-3">
              {related.map((r) => (
                <RelatedCard key={r.slug} slug={r.slug} headline={r.headline} subheadline={r.subheadline} icon={r.icon} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 bg-amber-50/40" id="cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-amber-200 text-amber-700 bg-white text-[10px] uppercase tracking-widest mb-5">
            Get Started
          </Badge>
          <h2 className="font-display text-4xl lg:text-6xl text-[#111727] leading-tight mb-6">
            Ready to Structure the<br />Right {loan.headline}?
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Tell us about your project and goals. We&rsquo;ll evaluate your situation and align it with the best capital source available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gold-btn text-white font-semibold px-10 rounded-xl text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 group h-14"
            >
              {loan.ctaLabel}
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

{/* ════════ FOOTER ════════ */}
      <footer className="bg-[#111727] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-14" />

          <div className="grid lg:grid-cols-5 gap-10 pb-12">

            {/* Brand */}
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
                ].map(({ icon: FIcon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-center gap-3 text-white/35 text-sm hover:text-white/70 transition-colors duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors duration-200">
                      <FIcon size={13} className="text-amber-500" />
                    </div>
                    {text}
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <p className="text-white/60 font-semibold text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-amber-500" />
                Solutions
              </p>
              <ul className="space-y-3">
                {navSolutions.map(({ title, slug: s }) => (
                  <li key={s}>
                    <Link
                      href={`/solutions/${s}`}
                      className={cn(
                        "text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block",
                        s === slug
                          ? "text-amber-400 font-semibold"
                          : "text-white/35 hover:text-amber-400"
                      )}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company — About Vynra only */}
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

            {/* Resources */}
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
