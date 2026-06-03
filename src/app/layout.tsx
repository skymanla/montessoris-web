import type { Metadata } from "next"
import localFont from "next/font/local"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GoogleAdsense from "@/components/GoogleAdsense"
import "./globals.css"
import { LocaleProvider } from "@/components/LocaleContext"
import CounselWidget from "@/features/counsel/CounselWidget"
import { GoogleTagManager } from "@next/third-parties/google"
import { absoluteUrl, siteConfig } from "@/lib/site"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AMS 몬테소리 유아교육과 부모 코칭`,
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
    icon: "/icon.png",
    apple: "/icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} | AMS 몬테소리 유아교육과 부모 코칭`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 4032,
        height: 3024,
        alt: "낮은 원목 교구장과 아동용 가구가 배치된 몬테소리 교실",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | AMS 몬테소리 유아교육과 부모 코칭`,
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
  other: {
    "google-adsense-account": "ca-pub-1586372003132738",
  },
  verification: {
    other: {
      "naver-site-verification": "ca09bbfa2269181a0351ef541e4c00135b2265f5",
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900`}
      >
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
        <GoogleAdsense pId="ca-pub-1586372003132738" />
        <LocaleProvider>
          <Header />
          {children}
          <Footer />
          <CounselWidget />
        </LocaleProvider>
      </body>
    </html>
  )
}
