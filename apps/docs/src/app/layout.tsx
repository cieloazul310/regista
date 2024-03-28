import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Menu, Drawer, Footer } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Regista - Simple and type-safe Markdown/MDX content management tool for Next.js App Router",
  description:
    "Simple and type-safe Markdown/MDX content management tool for Next.js App Router",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Header />
        <div className={css({ maxWidth: "full" })}>
          <Flex
            className={css({
              width: "full",
              maxWidth: "content-width",
              margin: "auto",
            })}
          >
            <nav
              className={vstack({
                gap: "sm",
                width: "sidebar-width",
                flexShrink: 0,
                position: "sticky",
                top: "{sizes.header-height}",
                maxHeight: "calc(100vh - {sizes.header-height})",
                overflowY: "auto",
                pt: "lg",
                px: "sm",
                hideBelow: "md",
              })}
            >
              <Menu />
            </nav>
            <main
              className={vstack({
                gap: "lg",
                alignItems: "stretch",
                flexGrow: 1,
                width: "full",
                maxWidth: "main-width",
                px: "main-px",
                py: "lg",
              })}
            >
              {children}
            </main>
          </Flex>
        </div>
        <Drawer />
        <Footer />
      </body>
    </html>
  );
}
