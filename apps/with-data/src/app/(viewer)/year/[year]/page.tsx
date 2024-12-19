import type { Metadata } from "next";
import FinancialTable from "@/components/table";
import { financial, yearCollection } from "@/content";

export async function generateStaticParams() {
  const allYear = await yearCollection.getAll();
  return allYear.map(({ year, ...rest }) => ({
    ...rest,
    year: year.toString(),
  }));
}

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { year } = params;
  const item = await yearCollection.get("year", parseInt(year, 10));
  if (!item) return null;

  return {
    title: `${item.year}年Jクラブ経営情報`,
  } satisfies Metadata;
}

async function Page(props: PageProps) {
  const params = await props.params;
  const { year } = params;
  const item = await yearCollection.get("year", parseInt(year, 10));
  if (!item) return null;
  const allData = await financial.getAll();
  const clubData = allData
    .filter(({ data }) => data.year === parseInt(year, 10))
    .sort((a, b) => a.data.year - b.data.year);

  return <FinancialTable items={clubData} mode="year" />;
}

export default Page;
