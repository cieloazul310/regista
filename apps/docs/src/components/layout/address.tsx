import type { ComponentProps } from "react";
import { FaGithub, FaNpm } from "react-icons/fa6";
import { hstack } from "styled-system/patterns";
import { IconButton } from "../ui";

function AddressIcon({ children, href, ...props }: ComponentProps<"a">) {
  return (
    <IconButton variant="ghost" asChild>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        title={props["aria-label"]}
        aria-label={props["aria-label"]}
      >
        {children}
      </a>
    </IconButton>
  );
}

function Address() {
  return (
    <address className={hstack({ gap: "sm" })}>
      <AddressIcon
        href="https://github.com/cieloazul310/regista"
        aria-label="GitHub"
      >
        <FaGithub />
      </AddressIcon>
      <AddressIcon
        href="https://www.npmjs.com/package/@cieloazul310/regista"
        aria-label="npm"
      >
        <FaNpm />
      </AddressIcon>
    </address>
  );
}

export default Address;
