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
      <link rel="shortcut icon" href="download.png" type="image/x-icon" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
