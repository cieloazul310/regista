"use client";

import { usePathname } from "next/navigation";
import { createTreeCollection } from "@ark-ui/react/tree-view";
import { TreeView, type TreeViewProps, type TreeViewNode } from "./tree-view";

function MenuClient({
  collection,
  ...props
}: Omit<TreeViewProps, "selectedIds" | "expandedIds" | "collection"> & {
  collection: TreeViewNode;
}) {
  const pathname = usePathname();
  const parent = pathname.replace(/\/[\w,-]*$/, "");
  const items = createTreeCollection({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: collection,
  });

  return (
    <TreeView
      collection={items}
      defaultExpandedValue={[parent]}
      defaultSelectedValue={[pathname]}
      {...props}
    />
  );
}

export default MenuClient;
