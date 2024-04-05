import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Footer, Provider } from "@/components";
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
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
