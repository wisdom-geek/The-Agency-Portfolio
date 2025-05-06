import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Agency | Where Tech Meets Imagination",
  description:
    "A cutting-edge tech agency offering Full-Stack Development, UI/UX & Product Design, and Blockchain Solutions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${inter.className} antialiased`}
      suppressHydrationWarning
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
       
      </ThemeProvider>
    </body>
  </html>
  );
}
