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
import PlausibleProvider from "next-plausible";

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

export const metadata: Metadata = {
  title: "Invoicen",
  description:
    "Invoicen is a simple invoice generator for freelancers and small businesses. It is a self hostable web application that can be used to generate invoices and download PDFs",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/logos/logo-icon-light.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/logos/logo-icon-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? ""}
          customDomain={process.env.NEXT_PUBLIC_ANALYTICS_FILE_URL ?? ""}
          selfHosted
          trackFileDownloads
          enabled={process.env.NODE_ENV === "production"}
          trackLocalhost
        />
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
    </html>
  );
}
