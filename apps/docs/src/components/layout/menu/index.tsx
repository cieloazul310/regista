import { post } from "@/content";
import MenuClient from "./menu-client";
import type { MenuGroupNode } from "./container";

async function Menu() {
  const allPost = await post.getAll();

  const nodes = [
    {
      id: "/",
      name: "Top",
    },
    {
      id: "/guide",
      name: "Guide",
      children: allPost
        .filter(({ frontmatter }) => frontmatter.category === "guide")
        .map(({ href, frontmatter }) => ({
          id: href,
          name: frontmatter.title,
        })),
    },
    {
      id: "/api",
      name: "API",
      children: allPost
        .filter(({ frontmatter }) => frontmatter.category === "api")
        .map(({ href, frontmatter }) => ({
          id: href,
          name: frontmatter.title,
        })),
    },
  ] satisfies MenuGroupNode[];

  return <MenuClient nodes={nodes} />;
}

export default Menu;
