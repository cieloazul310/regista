import type { FinancialSchema } from "@/content";
import type { RevenueField } from "@/types";
import { TBodyRow } from "./table";
import { TableHeadCell, TableBodyHeadCell, TableBodyCell } from "./table-cell";

function createRevenueRow() {
  const head = (mode: "club" | "year") => (
    <tr>
      <TableHeadCell scope="column">
        {mode === "club" ? "年" : "クラブ"}
      </TableHeadCell>
      <TableHeadCell scope="column">所属</TableHeadCell>
      <TableHeadCell scope="column">順位</TableHeadCell>
      <TableHeadCell scope="column">営業収入</TableHeadCell>
      <TableHeadCell scope="column">スポンサー</TableHeadCell>
      <TableHeadCell scope="column">入場料</TableHeadCell>
      <TableHeadCell scope="column">配分金</TableHeadCell>
      <TableHeadCell scope="column">アカデミー関連</TableHeadCell>
      <TableHeadCell scope="column">物販</TableHeadCell>
      <TableHeadCell scope="column">女子チーム</TableHeadCell>
      <TableHeadCell scope="column">その他</TableHeadCell>
      <TableHeadCell scope="column">(関連法人)</TableHeadCell>
    </tr>
  );
  const renderRow = (
    data: Pick<
      FinancialSchema,
      "name" | "year" | "category" | "rank" | RevenueField
    >,
    mode: "club" | "year",
  ) => {
    const {
      year,
      name,
      category,
      rank,
      revenue,
      sponsor,
      ticket,
      broadcast,
      academy_rev,
      women_rev,
      goods_rev,
      other_revs,
      related_revenue,
    } = data;

    const rowHead = (
      <>
        <TableBodyHeadCell scope="row">
          {mode === "club" ? year : name}
        </TableBodyHeadCell>
        <TableBodyHeadCell scope="row">{category}</TableBodyHeadCell>
        <TableBodyHeadCell scope="row">{rank}</TableBodyHeadCell>
      </>
    );
    const otherRevs = (inputYear: number) => {
      if (inputYear <= 2010)
        return (
          <TableBodyCell align="center" colSpan={4}>
            {other_revs}
          </TableBodyCell>
        );
      if (inputYear <= 2015)
        return (
          <>
            <TableBodyCell align="center">{academy_rev}</TableBodyCell>
            <TableBodyCell align="center" colSpan={3}>
              {other_revs}
            </TableBodyCell>
          </>
        );
      if (inputYear <= 2021)
        return (
          <>
            <TableBodyCell align="center">{academy_rev}</TableBodyCell>
            <TableBodyCell align="center">{goods_rev}</TableBodyCell>
            <TableBodyCell colSpan={2} align="center">
              {other_revs}
            </TableBodyCell>
          </>
        );
      return (
        <>
          <TableBodyCell align="center">{academy_rev}</TableBodyCell>
          <TableBodyCell align="center">{goods_rev}</TableBodyCell>
          <TableBodyCell align="center">{women_rev}</TableBodyCell>
          <TableBodyCell align="center">{other_revs}</TableBodyCell>
        </>
      );
    };

    return (
      <TBodyRow key={year.toString()}>
        {rowHead}
        <TableBodyCell emphasized bgEmphasized>
          {revenue}
        </TableBodyCell>
        <TableBodyCell>{sponsor}</TableBodyCell>
        <TableBodyCell>{ticket}</TableBodyCell>
        <TableBodyCell>{broadcast}</TableBodyCell>
        {otherRevs(year)}
        <TableBodyCell>{related_revenue}</TableBodyCell>
      </TBodyRow>
    );
  };

  return { head, renderRow };
}

export default createRevenueRow;
