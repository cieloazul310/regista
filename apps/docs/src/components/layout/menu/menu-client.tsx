"use client";

import { usePathname } from "next/navigation";
import MenuContainer, { type MenuContainerProps } from "./container";

function MenuClient({ nodes }: Pick<MenuContainerProps, "nodes">) {
  const pathname = usePathname();
  return <MenuContainer nodes={nodes} current={pathname} />;
}

export default MenuClient;
