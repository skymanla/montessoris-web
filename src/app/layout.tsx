import type { Metadata } from "next"
import localFont from "next/font/local"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GoogleAdsense from "@/components/GoogleAdsense"
import "./globals.css"
import { LocaleProvider } from "@/components/LocaleContext"
import CounselWidget from "@/features/counsel/CounselWidget"

console.log(1) // deploy smoke test (확인 후 제거)

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
// ... 생략 (기존 메타데이터 유지)
  title: {
    default: "몬테소리 | Montessori",
    template: "%s | 몬테소리"
  },
  description: "아이의 잠재력을 깨우는 정통 AMS 몬테소리 교육. 엄마와 아이가 함께 성장하는 특별한 시간을 만나보세요.",
  keywords: ["몬테소리", "Montessori", "AMS 몬테소리", "유아 교육", "부모 교육", "정통 몬테소리", "아이 중심 교육"],
  authors: [{ name: "Montessori" }],
  creator: "Montessori",
  publisher: "Montessori",
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
    title: "몬테소리 | Montessori",
    description: "아이의 잠재력을 깨우는 정통 AMS 몬테소리 교육",
    url: "https://montessoris.net",
    siteName: "몬테소리",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "몬테소리 | Montessori",
    description: "아이의 잠재력을 깨우는 정통 AMS 몬테소리 교육",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900`}
      >
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
