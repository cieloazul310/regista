"use client";

import { usePathname } from "next/navigation";
import { TreeView, type TreeViewProps } from "./tree-view";

function MenuClient(props: Omit<TreeViewProps, "selectedIds" | "expandedIds">) {
  const pathname = usePathname();
  const parent = pathname.replace(/\/[\w,-]*$/, "");

  return (
    <TreeView expandedIds={[parent]} selectedIds={[pathname]} {...props} />
  );
}

export default MenuClient;
