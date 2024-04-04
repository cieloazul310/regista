import { article } from "styled-system/patterns";

export default function Pre(props: React.ComponentProps<"pre">) {
  return (
    <pre
      className={article({
        bg: "accent.a2",
        rounded: "l2",
        p: "md",
        overflowX: "auto",
      })}
      {...props}
    />
  );
}
