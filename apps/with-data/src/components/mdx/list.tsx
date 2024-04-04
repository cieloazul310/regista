import { article } from "styled-system/patterns";

export function Ol(props: React.ComponentProps<"ol">) {
  return (
    <ol
      className={article({
        listStyleType: "decimal",
        paddingInlineStart: "md",
      })}
      {...props}
    />
  );
}

export function Ul(props: React.ComponentProps<"ul">) {
  return (
    <ul
      className={article({
        listStyleType: "disc",
        paddingInlineStart: "md",
      })}
      {...props}
    />
  );
}
