import { article } from "styled-system/patterns";

export default function Blockquote(props: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={article({ bg: "accent.a2", rounded: "l2", p: "lg" })}
      {...props}
    />
  );
}
