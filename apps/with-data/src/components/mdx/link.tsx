import NextLink from "next/link";
import type { ComponentProps } from "react";
import { css } from "styled-system/css";

function isInternal(href: ComponentProps<"a">["href"]) {
  if (!href) return false;
  return /^\/(?!\/)/.test(href);
}

const linkStyle = css({
  color: { base: "accent.9", _hover: "accent.7", _active: "accent.10" },
});

function Link({ href, children, ...props }: ComponentProps<"a">) {
  if (!href) return null;
  if (isInternal(href)) {
    return <NextLink className={linkStyle} href={href} {...props} />;
  }
  return (
    <a
      className={linkStyle}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
