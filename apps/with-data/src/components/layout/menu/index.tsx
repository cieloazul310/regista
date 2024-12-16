import { clubCollection, yearCollection } from "@/content";
import MenuClient from "./menu-client";
import type { TreeViewProps } from "./tree-view";

async function Menu(props: Omit<TreeViewProps, "collection">) {
  const allClub = await clubCollection.getAll();
  const allYear = await yearCollection.getAll();

  const collection = {
    id: "root",
    name: "Root",
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

  return <MenuClient {...props} collection={collection} />;
}

export default Menu;
