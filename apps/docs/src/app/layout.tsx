import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Menu, Drawer, Footer, Provider } from "@/components";
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
        <Provider>
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
                  width: "full",
                  maxWidth: "main-width",
                  px: "main-px",
                  pt: "lg",
                })}
              >
                {children}
              </main>
            </Flex>
          </div>
          <Drawer />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
