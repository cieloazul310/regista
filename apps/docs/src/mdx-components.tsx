import type { MDXComponents } from "mdx/types";
import { Image, Link } from "@/components";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    a: Link,
    img: Image,
    ...components,
  };
}
