import type { MDXComponents } from "mdx/types";
import {
  Blockquote,
  Code,
  Hr,
  Paragraph,
  Pre,
  createHeadings,
  Image,
  Link,
  createTables,
} from "@/components/mdx";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    a: Link,
    img: Image,
    blockquote: Blockquote,
    code: Code,
    hr: Hr,
    p: Paragraph,
    pre: Pre,
    ...createTables(),
    ...createHeadings(),
    ...components,
  };
}
