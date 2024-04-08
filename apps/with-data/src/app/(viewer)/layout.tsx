import type { PropsWithChildren } from "react";
import { Drawer } from "@/components";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Drawer />
    </>
  );
}
