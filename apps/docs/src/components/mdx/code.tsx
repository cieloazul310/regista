import { css } from "styled-system/css";

export default function Code(props: React.ComponentProps<"code">) {
  return (
    <code
      className={css({
        ":not(pre) > &": {
          color: "colorPalette.12",
          bg: "colorPalette.a4",
          px: "xs",
          rounded: "md",
        },
      })}
      {...props}
    />
  );
}
