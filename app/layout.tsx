import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'tailwindcss/tailwind.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stepperly",
  description: "Step-by-step guides powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f3f3f3] flex justify-center`}
      >
        <div className="max-w-[1920px] w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}