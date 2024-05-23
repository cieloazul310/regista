import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export function Table({ children }: PropsWithChildren) {
  return (
    <div
      className={css({
        width: "full",
        maxWidth: "full",
        overflowX: "auto",
        overflowY: "auto",
      })}
    >
      <figure className={css({ width: "max-content", height: "max-content" })}>
        <table>{children}</table>
      </figure>
    </div>
  );
}

export function THead({ children }: PropsWithChildren) {
  return (
    <thead
      className={css({
        zIndex: 1,
        bg: "bg.default",
        borderBottomColor: "accent.4",
        borderBottomWidth: "1px",
      })}
    >
      {children}
    </thead>
  );
}

export function TBody({ children }: PropsWithChildren) {
  return (
    <tbody className={css({ borderBottomRadius: "l2" })}>{children}</tbody>
  );
}

export function TBodyRow({ children }: PropsWithChildren) {
  return (
    <tr
      className={css({
        borderBottomColor: "accent.4",
        borderBottomWidth: "1px",
        _hover: { bg: "accent.a2" },
      })}
    >
      {children}
    </tr>
  );
}
