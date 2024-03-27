import { flex } from "styled-system/patterns";
import { Button, Heading } from "../ui";

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
        boxShadow: "md",
        px: "md",
        zIndex: "sticky",
      })}
    >
      <Heading as="h1">Regista</Heading>
      <Button>Hoge</Button>
    </header>
  );
}

export default Header;
