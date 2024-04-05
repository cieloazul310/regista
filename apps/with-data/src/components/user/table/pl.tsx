import { cx, css } from "styled-system/css";
import { financial, type FinancialSchema } from "@/content";

export type PLField = Extract<
  keyof FinancialSchema,
  | "revenue"
  | "expense"
  | "op_profit"
  | "no_rev"
  | "no_exp"
  | "ordinary_profit"
  | "sp_rev"
  | "sp_exp"
  | "profit_before_tax"
  | "tax"
  | "profit"
>;

export const plField: PLField[] = [
  "revenue",
  "expense",
  "op_profit",
  "no_rev",
  "no_exp",
  "ordinary_profit",
  "sp_rev",
  "sp_exp",
  "profit_before_tax",
  "tax",
  "profit",
];

const cellStyle = css({
  px: 2,
  py: 1,
});
const theadCellStyle = cx(
  cellStyle,
  css({
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "sm",
    lineHeight: 1.2,
    minWidth: "6em",
  }),
);
const tbodyCellStyle = (field: PLField) => {
  const emphasized = [
    "op_profit",
    "ordinary_profit",
    "profit_before_tax",
    "profit",
  ].includes(field);
  const emphasizedStyle = css({
    bg: "accent.a2",
  });

  return cx(
    cellStyle,
    css({
      textAlign: "right",
      fontFamily: "Arial",
      bg: "bg.default",
    }),
    emphasized ? emphasizedStyle : undefined,
  );
};

function createPLTable() {
  const head = (mode: "club" | "year") => (
    <tr>
      <th scope="column">{mode === "club" ? "年" : "クラブ"}</th>
      {plField.map((field) => (
        <th className={theadCellStyle} scope="column" key={field}>
          {financial.schema.shape[field]?.description}
        </th>
      ))}
    </tr>
  );
  const renderRow = (
    data: Pick<FinancialSchema, "name" | "year" | PLField>,
    mode: "club" | "year",
  ) => (
    <tr key={data.year.toString()}>
      <th className={theadCellStyle} scope="row">
        {mode === "club" ? data.year : data.name}
      </th>
      {plField.map((field) => (
        <td className={tbodyCellStyle(field)} key={field}>
          {data[field]}
        </td>
      ))}
    </tr>
  );

  return { head, renderRow };
}

export default createPLTable;
