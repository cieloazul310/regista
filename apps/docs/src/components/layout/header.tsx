import NextLink from "next/link";
import { flex } from "styled-system/patterns";
import { FaGithub } from "react-icons/fa6";
import { IconButton, Heading } from "../ui";

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
      <Heading as="h1">
        <NextLink href="/">Regista</NextLink>
      </Heading>
      <IconButton variant="ghost" asChild>
        <a
          href="https://github.com/cieloazul310/regista"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </IconButton>
    </header>
  );
}

export default Header;
