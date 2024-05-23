import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import Header from "@/components/layout/header";
import Menu from "@/components/layout/menu";
import Drawer from "@/components/layout/drawer";
import Footer from "@/components/layout/footer";
import ThemeProvider from "@/providers/theme-provider";
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
        <ThemeProvider>
          <Header />
          <div className={css({ maxWidth: "full" })}>
            <Flex
              className={css({
                width: "full",
                maxWidth: "content-width",
                minHeight: "calc(100vh - {sizes.header-height})",
                margin: "auto",
                flexDirection: { base: "column-reverse", md: "row" },
                pb: "lg",
                gap: { base: "lg", md: "sm" },
              })}
            >
              <nav
                className={vstack({
                  gap: "sm",
                  width: "full",
                  flexShrink: 0,
                  position: "inherit",
                  top: undefined,
                  maxHeight: undefined,
                  overflowY: undefined,
                  px: "sm",
                  pt: "lg",
                  bg: "bg.default",
                  rounded: "l2",
                  md: {
                    width: "sidebar-width",
                    flexShrink: 0,
                    position: "sticky",
                    top: "{sizes.header-height}",
                    maxHeight: "calc(100vh - {sizes.header-height})",
                    overflowY: "auto",
                  },
                })}
              >
                <Menu />
              </nav>
              <main
                className={vstack({
                  gap: "lg",
                  alignItems: "stretch",
                  flexGrow: 1,
                  bg: "bg.default",
                  rounded: "l2",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
