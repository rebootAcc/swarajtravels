import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const el_missiri = localFont({
  src: "./fonts/ElMessiri-VariableFont_wght.ttf",
  variable: "--font-el-missiri",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Swaraj Travels",
  description:
    "Swaraj Travels made by Reboot AI private limited. Here you can find your dream spot travels package in your budget and much more",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Swaraj Travels",
    description:
      "Swaraj Travels made by Reboot AI private limited. Here you can find your dream spot travels package in your budget and much more",
    type: "website",
    images: [
      {
        url: "/favicon-96x96.png",
        width: 96,
        height: 96,
      },
    ],
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
        className={`${el_missiri.variable} ${el_missiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
