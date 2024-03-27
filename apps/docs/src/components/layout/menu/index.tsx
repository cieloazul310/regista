import { categories, author } from "@/content";
import MenuClient from "./menu-client";
import type { TreeViewProps, TreeViewData } from "./tree-view";

async function Menu(props: Omit<TreeViewProps, "data">) {
  const allCategories = await categories.getAll();
  const allAuthor = await author.getAll();

  const data: TreeViewData = {
    label: "Menu",
    children: [
      {
        id: "/",
        name: "Top",
      },
      {
        id: "/post",
        name: "Post",
      },
      {
        id: "/categories",
        name: "Categories",
        children: allCategories.map(({ id, name }) => ({
          id: `/categories/${id}`,
          name,
        })),
      },
      {
        id: "/author",
        name: "Author",
        children: allAuthor.map(({ id, name }) => ({
          id: `/author/${id}`,
          name,
        })),
      },
    ],
  };

  return <MenuClient data={data} {...props} />;
}

export default Menu;
