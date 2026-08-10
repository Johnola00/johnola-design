import type { Metadata, Viewport } from "next";
import { Inter, PT_Sans_Caption } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ptSansCaption = PT_Sans_Caption({
  variable: "--font-pt-sans-caption",
  subsets: ["latin"],
  weight: ["700"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "John Oduntan — Product Designer & AI Builder",
  description:
    "Product designer creating clear, usable web and mobile products and experimenting with AI to turn ideas into working digital products.",
  authors: [{ name: "John Oduntan" }],
  creator: "John Oduntan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "John Oduntan",
    title: "John Oduntan — Product Designer & AI Builder",
    description:
      "Product designer creating clear, usable web and mobile products and experimenting with AI to turn ideas into working digital products.",
    images: [
      {
        url: "/brand/Johnola.jpg",
        alt: "John Oduntan — Product Designer & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Oduntan — Product Designer & AI Builder",
    description:
      "Product designer creating clear, usable web and mobile products and experimenting with AI to turn ideas into working digital products.",
    images: ["/brand/Johnola.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ptSansCaption.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
