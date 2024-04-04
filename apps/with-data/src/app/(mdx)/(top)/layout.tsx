import type { PropsWithChildren } from "react";
import { PageHeader } from "@/components";

export default function MDXPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageHeader title="Regista" />
      <article>{children}</article>
    </>
  );
}
