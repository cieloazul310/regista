import type { Metadata } from "next";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { Flex } from "styled-system/jsx";
import { Header, Table, THead, TBody, createPLTable } from "@/components";
import { financial, yearCollection } from "@/content";

export async function generateStaticParams() {
  const allYear = await yearCollection.getAll();
  return allYear.map(({ year }) => year.toString());
}

type PageProps = {
  params: {
    year: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { year } = params;
  const item = await yearCollection.get("year", parseInt(year, 10));
  if (!item) return null;

  return {
    title: `${item.year}年Jクラブ経営情報`,
  } satisfies Metadata;
}

async function Page({ params }: PageProps) {
  const { year } = params;
  const item = await yearCollection.get("year", parseInt(year, 10));
  if (!item) return null;
  const allData = await financial.getAll();
  const clubData = allData
    .filter(({ data }) => data.year === parseInt(year, 10))
    .sort((a, b) => a.data.year - b.data.year);
  const { head, renderRow } = createPLTable.pl;

  return (
    <>
      <Header title={`${item.year}年Jクラブ経営情報`} />
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
                <THead>{head("year")}</THead>
                <TBody>
                  {clubData.map(({ data }) => renderRow(data, "year"))}
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
