import { css } from "styled-system/css";

export default function Code(props: React.ComponentProps<"code">) {
  return (
    <code
      className={css({
        ":not(pre) > &": {
          color: "accent.12",
          bg: "accent.6/18",
          px: "xs",
          rounded: "md",
        },
      })}
      {...props}
    />
  );
}
