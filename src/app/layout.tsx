import { Suspense } from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Hahmlet, IBM_Plex_Sans_KR } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import GoogleAdsense from "@/components/GoogleAdsense"
import "./globals.css"
import CounselWidget from "@/features/counsel/CounselWidget"
import { GoogleTagManager } from "@next/third-parties/google"
import { absoluteUrl, siteConfig } from "@/lib/site"

// Display: a high-contrast contemporary Korean serif — dignified, editorial.
const displaySerif = Hahmlet({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

// Body / UI: more character than Noto, highly legible at small sizes.
const bodySans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

// Utility: measurements, eyebrows, age labels — the "precise materials" voice.
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 24H 무료 AI 육아 상담 & 몬테소리 가이드`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["몬테소리", "AMS 몬테소리", "유아 교육", "부모 코칭", "준비된 환경", "몬테소리 교구"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} | 24H 무료 AI 육아 상담 & 몬테소리 가이드`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1600,
        height: 1200,
        alt: "낮은 원목 교구장과 아동용 가구가 배치된 몬테소리 교실",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | 24H 무료 AI 육아 상담 & 몬테소리 가이드`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
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
  // other: {
  //   "google-adsense-account": "ca-pub-1586372003132738",
  // },
  verification: {
    google: siteConfig.verification.google || undefined,
    other: siteConfig.verification.naver
      ? { "naver-site-verification": siteConfig.verification.naver }
      : undefined,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === "production"

  return (
    <html lang="ko">
      {isProduction && <GoogleTagManager gtmId="GTM-PZRT52KL" />}
      <body
        className={`${displaySerif.variable} ${bodySans.variable} ${geistMono.variable} antialiased bg-paper text-ink`}
      >
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/*
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        */}
        {/* Google Tag Manager (noscript) */}
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PZRT52KL"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {/* <GoogleAdsense pId="ca-pub-1586372003132738" /> */}
        <Header />
        {children}
        <Footer />
        <Suspense fallback={null}>
          <CounselWidget />
        </Suspense>
      </body>
    </html>
  )
}
