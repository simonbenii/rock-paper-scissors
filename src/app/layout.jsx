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
