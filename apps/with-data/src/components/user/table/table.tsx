import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export function Table({ children }: PropsWithChildren) {
  return (
    <div
      className={css({
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
  return <tbody>{children}</tbody>;
}
