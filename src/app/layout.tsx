import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import type React from "react";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer";
import TanstackProvider from "../providers/TanstackProvider";
import CurrencyProvider from "../providers/CurrencyProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const satioshi = localFont({
  src: "./fonts/satoshi.ttf",
  variable: "--font-satoshi",
  weight: "100 900",
});

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const metaDescription =
  "Invoicen is a simple invoice generator for freelancers and small businesses. It is a self hostable web application that can be used to generate invoices and download PDFs";

export const metadata: Metadata = {
  title: "Invoicen",
  description: metaDescription,
  openGraph: {
    title: "Invoicen",
    description: metaDescription,
    url: "https://invoicen.ayushchugh.com",
    siteName: "Invoicen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/og/og.png",
        alt: "Invoicen Logo",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },

  twitter: {
    title: "Invoicen",
    card: "summary_large_image",
    creator: "@aayushchugh_x",
    creatorId: "@aayushchugh_x",
    site: "@aayushchugh_x",
    siteId: "@aayushchugh_x",
    description: metaDescription,
    images: [
      {
        url: "/assets/og/og.png",
        alt: "Invoicen Logo",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  icons: {
    shortcut: "/assets/logos/logo-icon.png",
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
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logos/logo-icon.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/assets/logos/logo-icon.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${manrope.variable} ${satioshi.variable} font-primary antialiased flex items-center justify-center`}
      >
        <TanstackProvider>
          <CurrencyProvider>
            <div className="mx-0 w-full">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                {children}
                <Footer />
              </ThemeProvider>
            </div>
          </CurrencyProvider>
        </TanstackProvider>
      </body>

      {process.env.GOOGLE_ANALYTICS_ID && process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
