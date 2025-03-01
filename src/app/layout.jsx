import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kő - Papír - Olló",
  manifest: "/manifest.json",
  themeColor: "black-translucent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          background: "linear-gradient(135deg, #1abc9c, #ffffff)",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
