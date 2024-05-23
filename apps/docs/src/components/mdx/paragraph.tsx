import { article } from "styled-system/patterns";
import { Text } from "../ui/text";

export default function Paragraph(props: React.ComponentPropsWithoutRef<"p">) {
  return <Text className={article()} {...props} />;
}
