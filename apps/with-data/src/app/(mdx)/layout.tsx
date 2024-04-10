import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Menu } from "@/components";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header title="Regista with data example" />
      <div className={css({ maxWidth: "full" })}>
        <Flex
          className={css({
            width: "full",
            maxWidth: "content-width",
            minHeight: "calc(100vh - {sizes.header-height})",
            margin: "auto",
            flexDirection: { base: "column", md: "row-reverse" },
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
    </>
  );
}
