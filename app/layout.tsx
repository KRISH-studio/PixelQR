import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pixel QR | Create QR Codes for URLs, Text, WiFi & More",
  description:
    "Free online QR code generator for URLs, text, WiFi credentials, email addresses, and phone numbers. Create, customize, and download QR codes instantly.",
  keywords:
    "free qr code generator, online qr code for text, wifi qr code generator, url qr code, email qr code, phone qr code, qr code maker",
  manifest: "/manifest",
  icons: {
    icon: [
      { url: "/icon?size=16", sizes: "16x16", type: "image/png" },
      { url: "/icon?size=32", sizes: "32x32", type: "image/png" },
      { url: "/icon?size=96", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    title: "Pixel QR",
    statusBarStyle: "black-translucent",
    capable: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

           {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0BCTTH4GWL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0BCTTH4GWL');
            `,
          }}
        />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5670862530868386"
        crossorigin="anonymous"></script>
        
        <meta name="google-adsense-account"
          content="ca-pub-5670862530868386"/>
          
        <meta name="google-site-verification"
        content="ad-qcNq_GrrumhwGtiGccvsvrFy2TsdRtVJyqWBiKZk" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5670862530868386"
     crossorigin="anonymous"></script>
        
      </head>
      <link rel="shortcut icon" href="download.png" type="image/x-icon" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
