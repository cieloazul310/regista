import { divider } from "styled-system/patterns";

export default function Hr(props: React.ComponentProps<"hr">) {
  return (
    <hr
      className={divider({ my: "md", orientation: "horizontal" })}
      {...props}
    />
  );
}
