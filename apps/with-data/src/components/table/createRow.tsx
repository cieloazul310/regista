import type { FinancialSchema } from "@/content";
import type { Mode } from "@/types";
import { TBodyRow } from "./table";
import { TableHeadCell, TableBodyHeadCell, TableBodyCell } from "./table-cell";

function createRow<T extends keyof FinancialSchema>({
  fields,
  emphasizedFields = [],
  bgEmphasizedFields = [],
}: {
  fields: T[];
  emphasizedFields?: T[];
  bgEmphasizedFields?: T[];
}) {
  const head = (mode: Mode) => (
    <tr>
      <TableHeadCell scope="column">
        {mode === "club" ? "年" : "クラブ"}
      </TableHeadCell>
      <TableHeadCell scope="column">所属</TableHeadCell>
      <TableHeadCell scope="column">順位</TableHeadCell>
      {fields.map((field) => (
        <TableHeadCell scope="column" key={field}>
          {field}
        </TableHeadCell>
      ))}
    </tr>
  );
  const renderRow = (
    data: Pick<FinancialSchema, "name" | "year" | "category" | "rank" | T>,
    mode: Mode,
  ) => (
    <TBodyRow key={`${data.name}${data.year.toString()}`}>
      <TableBodyHeadCell scope="row">
        {mode === "club" ? data.year : data.name}
      </TableBodyHeadCell>
      <TableBodyHeadCell scope="row">{data.category}</TableBodyHeadCell>
      <TableBodyHeadCell scope="row">{data.rank}</TableBodyHeadCell>
      {fields.map((field) => (
        <TableBodyCell
          key={field}
          emphasized={emphasizedFields.includes(field)}
          bgEmphasized={bgEmphasizedFields.includes(field)}
        >
          {data[field]}
        </TableBodyCell>
      ))}
    </TBodyRow>
  );

  return { head, renderRow };
}

export default createRow;
