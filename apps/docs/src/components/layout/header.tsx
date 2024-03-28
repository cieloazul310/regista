import NextLink from "next/link";
import { flex } from "styled-system/patterns";
import { Heading } from "../ui";
import Address from "./address";

function Header() {
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
        justifyContent: "space-between",
        shadow: "md",
        px: "main-px",
        zIndex: "sticky",
      })}
    >
      <Heading as="h1">
        <NextLink href="/">Regista</NextLink>
      </Heading>
      <Address />
    </header>
  );
}

export default Header;
