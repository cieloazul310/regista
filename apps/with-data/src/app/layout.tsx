import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import ThemeProvider from "@/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regista Using data example",
  description:
    "Simple and type-safe Markdown/MDX content management tool for Next.js App Router",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
