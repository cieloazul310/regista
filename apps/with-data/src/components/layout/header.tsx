import type { ReactNode } from "react";
import { flex } from "styled-system/patterns";
import { Heading } from "../ui/heading";
import ColorModeHandler from "../client/color-mode-handler";
import Address from "./address";

type HeaderProps = {
  title: ReactNode;
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
        {title}
      </Heading>
      <Address />
      <ColorModeHandler />
    </header>
  );
}

export default Header;
