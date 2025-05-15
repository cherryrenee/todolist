import type { Metadata } from "next";;
import "./globals.css";



export const metadata: Metadata = {
  title: "do it;",
  description: "Making a to do list",
  icons:{
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>      {children}
      </body>
    </html>
  );
}
