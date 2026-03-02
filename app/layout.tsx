import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vynra Capital — Structured Funding for Sustainable Growth",
  description:
    "Over 20 years of experience delivering commercial, hard money, and alternative financing solutions through trusted banking, institutional, and private capital relationships.",
  keywords: [
    "commercial loans",
    "hard money lender",
    "SBA loans",
    "DSCR investor loans",
    "bridge financing",
    "merchant cash advance",
    "capital partner",
    "Vynra Capital",
  ],
  authors: [{ name: "Vynra Capital" }],
  openGraph: {
    title: "Vynra Capital — Strategic Capital. Structured for Growth.",
    description:
      "Access sophisticated commercial, hard money, and alternative financing solutions backed by 20+ years of structured capital experience.",
    url: "https://vynracapital.com",
    siteName: "Vynra Capital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vynra Capital — Structured Funding for Sustainable Growth",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vynra Capital — Strategic Capital. Structured for Growth.",
    description:
      "Access sophisticated commercial, hard money, and alternative financing solutions backed by 20+ years of structured capital experience.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}