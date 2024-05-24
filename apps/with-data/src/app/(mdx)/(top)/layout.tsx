import type { PropsWithChildren } from "react";
import PageHeader from "@/components/layout/page-header";

export default function MDXPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageHeader title="Regista" />
      <article>{children}</article>
    </>
  );
}
