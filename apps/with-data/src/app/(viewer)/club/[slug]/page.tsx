import type { Metadata } from "next";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Table, THead, TBody, createPLTable } from "@/components";
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

  const { head, renderRow } = createPLTable.pl;

  return (
    <>
      <Header title={item.name} />
      <div className={css({ maxWidth: "full" })}>
        <Flex
          className={css({
            width: "full",
            minHeight: "calc(100vh - {sizes.header-height})",
            margin: "auto",
            flexDirection: "row",
            pb: "lg",
            gap: "lg",
          })}
        >
          <main
            className={vstack({
              gap: "lg",
              alignItems: "stretch",
              flexGrow: 1,
              bg: "bg.default",
              rounded: "l2",
              width: "full",
              mx: "auto",
              px: "main-px",
              py: "lg",
            })}
          >
            <section
              className={css({
                bg: "bg.default",
                mx: "auto",
                maxWidth: "full",
              })}
            >
              <Table>
                <THead>{head("club")}</THead>
                <TBody>
                  {clubData.map(({ data }) => renderRow(data, "club"))}
                </TBody>
              </Table>
            </section>
          </main>
        </Flex>
      </div>
    </>
  );
}

export default Page;
