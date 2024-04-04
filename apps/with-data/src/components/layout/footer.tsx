import NextLink from "next/link";
import { vstack } from "styled-system/patterns";
import { Heading, Text } from "../ui";
import Address from "./address";

function Footer() {
  return (
    <footer
      className={vstack({
        width: "full",
        gap: "md",
        bg: "bg.muted",
        alignItems: "center",
        py: "lg",
      })}
    >
      <Heading fontSize="lg">
        <NextLink href="/">Regista</NextLink>
      </Heading>
      <Text>© 2023 cieloazul310 All rights reserved.</Text>
      <Address />
    </footer>
  );
}

export default Footer;
