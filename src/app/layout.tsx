import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const el_missiri = localFont({
  src: "./fonts/ElMessiri-VariableFont_wght.ttf",
  variable: "--font-el-missiri",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Travels Den",
  description:
    "Travels Den made by Reboot AI private limited. Here you can find your dream spot travels package in your budget and much more",
  icons: {
    icon: [
      {
        url: "https://www.swarajtravellers.com/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "https://www.swarajtravellers.com/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    shortcut: "https://www.swarajtravellers.com/favicon.ico",
    apple: [
      {
        url: "https://www.swarajtravellers.com/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "https://www.swarajtravellers.com/site.webmanifest",
  openGraph: {
    title: "Travels Den",
    description:
      "Travels Den made by Reboot AI private limited. Here you can find your dream spot travels package in your budget and much more",
    type: "website",
    images: [
      {
        url: "https://www.swarajtravellers.com/favicon-96x96.png",
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
