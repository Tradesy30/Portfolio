import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import ShootingStars from "@/components/ShootingStars";
import FloatingIcons from "@/components/FloatingIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christopher Rodriguez | Full Stack Developer",
  description: "Full Stack Developer specializing in modern web applications with Next.js, TypeScript, and React. Explore my portfolio featuring interactive animations and responsive design.",
  openGraph: {
    title: "Christopher Rodriguez | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web applications with Next.js, TypeScript, and React. Explore my portfolio featuring interactive animations and responsive design.",
    url: "https://portfolio-v2-tradesy30.vercel.app/",
    siteName: "Christopher Rodriguez Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Christopher Rodriguez - Full Stack Developer Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Rodriguez | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web applications with Next.js, TypeScript, and React.",
    images: ["/opengraph-image.png"],
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
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-full">
            <ThemeToggle />
            <div className="fixed inset-0 pointer-events-none select-none">
              <div className="absolute inset-0 transform-gpu">
                <ShootingStars />
              </div>
              <div className="absolute inset-0 transform-gpu">
                <FloatingIcons />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
