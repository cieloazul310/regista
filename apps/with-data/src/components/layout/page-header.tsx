import type { ReactNode } from "react";
import { flex, vstack, hstack } from "styled-system/patterns";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

type PageHeaderProps = {
  title: string;
  headerText?: ReactNode;
  footerText?: ReactNode;
};

function PageHeader({ title, headerText, footerText }: PageHeaderProps) {
  return (
    <header
      className={flex({
        direction: "column",
        gap: "sm",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      })}
    >
      <hgroup className={vstack({ alignItems: "flex-start", gap: "sm" })}>
        {headerText && (
          <Text className={hstack({ gap: "sm" })}>{headerText}</Text>
        )}
        <Heading as="h1" fontSize={["xl", "2xl", "3xl"]}>
          {title}
        </Heading>
        {footerText && (
          <Text className={hstack({ gap: "sm" })}>{footerText}</Text>
        )}
      </hgroup>
    </header>
  );
}

export default PageHeader;
