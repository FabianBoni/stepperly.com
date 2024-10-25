import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import 'tailwindcss/tailwind.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stepperly",
  description: "Step-by-step guides powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased bg-[#f3f3f3] flex justify-center`}>
          <div className="max-w-[1920px] w-full min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}