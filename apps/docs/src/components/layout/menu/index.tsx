import { post } from "@/content";
import MenuClient from "./menu-client";
import type { TreeViewProps, TreeViewData } from "./tree-view";

async function Menu(props: Omit<TreeViewProps, "data">) {
  const allPost = await post.getAll();

  const data: TreeViewData = {
    label: "Menu",
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

  return <MenuClient data={data} {...props} />;
}

export default Menu;
