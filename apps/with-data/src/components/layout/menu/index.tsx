import { clubCollection, yearCollection } from "@/content";
import MenuClient from "./menu-client";
import type { TreeViewProps, TreeViewData } from "./tree-view";

async function Menu(props: Omit<TreeViewProps, "data">) {
  const allClub = await clubCollection.getAll();
  const allYear = await yearCollection.getAll();

  const data: TreeViewData = {
    label: "Menu",
    children: [
      {
        id: "/",
        name: "Top",
      },
      {
        id: "/club",
        name: "Club",
        children: allClub.map(({ slug, name }) => ({
          id: `/club/${slug}`,
          name,
        })),
      },
      {
        id: "/year",
        name: "Year",
        children: allYear
          .sort((a, b) => a.year - b.year)
          .map(({ year }) => ({
            id: `/year/${year}`,
            name: `${year}年`,
          })),
      },
    ],
  };

  return <MenuClient data={data} {...props} />;
}

export default Menu;
