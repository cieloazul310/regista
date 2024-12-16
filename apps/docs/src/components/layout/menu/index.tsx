import { post } from "@/content";
import MenuClient from "./menu-client";
import type { TreeViewProps } from "./tree-view";

async function Menu(props: Omit<TreeViewProps, "collection">) {
  const allPost = await post.getAll();

  const collection = {
    id: "menu",
    name: "Menu",
    children: [
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
    ],
  };

  return <MenuClient {...props} collection={collection} />;
}

export default Menu;
