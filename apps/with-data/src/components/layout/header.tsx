import NextLink from "next/link";
import { flex } from "styled-system/patterns";
import { Heading } from "../ui";
import { ColorModeHandler } from "../client";
import Address from "./address";

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header
      className={flex({
        width: "full",
        position: "sticky",
        top: 0,
        direction: "row",
        gap: "sm",
        bg: "bg.canvas",
        height: "header-height",
        alignItems: "center",
        shadow: "md",
        px: "main-px",
        zIndex: "sticky",
      })}
    >
      <Heading as="h1" flexGrow={1}>
        <NextLink href="/">{title}</NextLink>
      </Heading>
      <Address />
      <ColorModeHandler />
    </header>
  );
}

export default Header;
