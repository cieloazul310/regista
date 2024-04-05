import { financial, type FinancialSchema } from "@/content";

export type HeaderField = Extract<
  keyof FinancialSchema,
  "name" | "slug" | "category" | "year" | "rank"
>;

function createTHeadRowHeader(mode: "club" | "year") {
  return (
    <>
      <th scope="column">{mode === "club" ? "年" : "クラブ"}</th>
      <th scope="column">所属</th>
      <th scope="column">順位</th>
    </>
  );
}

function createTBodyRowHeader(
  data: Pick<FinancialSchema, HeaderField>,
  mode: "club" | "year",
) {
  return (
    <>
      <th scope="row">{mode === "club" ? data.year : data.name}</th>
      <td>{data.category}</td>
      <td>{data.slug}</td>
    </>
  );
}
