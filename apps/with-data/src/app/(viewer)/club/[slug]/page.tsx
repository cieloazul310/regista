import type { Metadata } from "next";
import { css } from "styled-system/css";
import { VStack } from "styled-system/jsx";
import { Header, createPLTable } from "@/components";
import { financial, clubCollection } from "@/content";

export async function generateStaticParams() {
  const allPost = await clubCollection.getAll();
  return allPost;
}

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const item = await clubCollection.get("slug", slug);
  if (!item) return null;

  return {
    title: `${item.name}の経営情報`,
  } satisfies Metadata;
}

async function Page({ params }: PageProps) {
  const { slug } = params;
  const item = await clubCollection.get("slug", slug);
  if (!item) return null;
  const allData = await financial.getAll();
  const clubData = allData
    .filter(({ data }) => data.slug === slug)
    .sort((a, b) => a.data.year - b.data.year);

  const { head, renderRow } = createPLTable();

  return (
    <>
      <Header title={item.name} />
      <VStack
        gap="md"
        alignItems="stretch"
        maxWidth="content-width"
        margin="auto"
      >
        <section className={css({ bg: "bg.default" })}>
          <table>
            <thead>{head("club")}</thead>
            <tbody>{clubData.map(({ data }) => renderRow(data, "club"))}</tbody>
          </table>
        </section>
      </VStack>
    </>
  );
}

export default Page;
