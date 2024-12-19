import { clubCollection, yearCollection } from "@/content";
import MenuClient from "./menu-client";
import type { MenuGroupNode } from "./container";

async function Menu() {
  const allClub = await clubCollection.getAll();
  const allYear = await yearCollection.getAll();

  const nodes = [
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
  ] satisfies MenuGroupNode[];

  return <MenuClient nodes={nodes} />;
}

export default Menu;
