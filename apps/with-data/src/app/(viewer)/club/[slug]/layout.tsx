import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Drawer } from "@/components";
import { clubCollection } from "@/content";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    slug: string;
  };
}>) {
  const { slug } = params;
  const item = await clubCollection.get("slug", slug);
  if (!item) return null;

  return (
    <>
      <Header title={`${item.name}の経営情報`} />
      <div className={css({ maxWidth: "full" })}>
        <Flex
          className={css({
            width: "full",
            minHeight: "calc(100vh - {sizes.header-height})",
            margin: "auto",
            flexDirection: "row",
            pb: "lg",
            gap: "lg",
          })}
        >
          <main
            className={vstack({
              gap: "lg",
              alignItems: "stretch",
              flexGrow: 1,
              bg: "bg.default",
              rounded: "l2",
              width: "full",
              mx: "auto",
              px: "main-px",
              py: "lg",
            })}
          >
            {children}
          </main>
        </Flex>
      </div>
      <Drawer />
    </>
  );
}
