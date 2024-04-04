import { article } from "styled-system/patterns";
import { Text } from "../ui";

export default function Paragraph(props: React.ComponentPropsWithoutRef<"p">) {
  return <Text className={article()} {...props} />;
}
