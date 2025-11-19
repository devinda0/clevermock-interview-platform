import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CleverMock - AI-Powered Voice Interview Practice",
    template: "%s | CleverMock"
  },
  description: "Master your next interview with CleverMock. Practice real voice-to-voice interviews with AI, get instant feedback, and land your dream job.",
  keywords: ["mock interview", "AI interview", "voice interview", "interview practice", "tech interview", "system design", "behavioral interview"],
  authors: [{ name: "CleverMock Team" }],
  creator: "CleverMock",
  metadataBase: new URL("https://clevermock.com"), // Placeholder domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clevermock.com",
    title: "CleverMock - AI-Powered Voice Interview Practice",
    description: "Practice real voice-to-voice interviews with AI, get instant feedback, and land your dream job.",
    siteName: "CleverMock",
    images: [
      {
        url: "/og-image.png", // We should probably create this or ensure it exists, but for now we reference it
        width: 1200,
        height: 630,
        alt: "CleverMock Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleverMock - AI-Powered Voice Interview Practice",
    description: "Practice real voice-to-voice interviews with AI, get instant feedback, and land your dream job.",
    creator: "@clevermock",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
