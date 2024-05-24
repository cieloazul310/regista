import type { FinancialSchema } from "@/content";
import type { ExpenseField } from "@/types";
import { TBodyRow } from "./table";
import { TableHeadCell, TableBodyHeadCell, TableBodyCell } from "./table-cell";

function createExpenseRow() {
  const head = (mode: "club" | "year") => (
    <tr>
      <TableHeadCell scope="column">
        {mode === "club" ? "年" : "クラブ"}
      </TableHeadCell>
      <TableHeadCell scope="column">所属</TableHeadCell>
      <TableHeadCell scope="column">順位</TableHeadCell>
      <TableHeadCell scope="column">営業費用</TableHeadCell>
      <TableHeadCell scope="column">チーム人件費</TableHeadCell>
      <TableHeadCell scope="column">試合関連</TableHeadCell>
      <TableHeadCell scope="column">トップチーム運営</TableHeadCell>
      <TableHeadCell scope="column">アカデミー運営</TableHeadCell>
      <TableHeadCell scope="column">女子チーム運営</TableHeadCell>
      <TableHeadCell scope="column">物販関連</TableHeadCell>
      <TableHeadCell scope="column">その他売上原価</TableHeadCell>
      <TableHeadCell scope="column">販売費</TableHeadCell>
      <TableHeadCell scope="column">一般管理費</TableHeadCell>
    </tr>
  );
  const renderRow = (
    data: Pick<
      FinancialSchema,
      "name" | "year" | "category" | "rank" | ExpenseField
    >,
    mode: "club" | "year",
  ) => {
    const {
      year,
      name,
      category,
      rank,
      expense,
      salary,
      game_exp,
      team_exp,
      academy_exp,
      women_exp,
      goods_exp,
      other_cost,
      sga,
      general_exp,
      manage_exp,
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
    const expenseData = (inputYear: number) => {
      if (inputYear <= 2005 && !salary)
        return (
          <>
            <TableBodyCell align="center" colSpan={8}>
              {general_exp}
            </TableBodyCell>
            <TableBodyCell align="center">{sga}</TableBodyCell>
          </>
        );
      if (inputYear <= 2010)
        return (
          <>
            <TableBodyCell>{salary}</TableBodyCell>
            <TableBodyCell align="center" colSpan={7}>
              {manage_exp}
            </TableBodyCell>
            <TableBodyCell align="center">{sga}</TableBodyCell>
          </>
        );
      if (inputYear <= 2015)
        return (
          <>
            <TableBodyCell>{salary}</TableBodyCell>
            <TableBodyCell>{game_exp}</TableBodyCell>
            <TableBodyCell>{team_exp}</TableBodyCell>
            <TableBodyCell>{academy_exp}</TableBodyCell>
            <TableBodyCell>{women_exp}</TableBodyCell>
            <TableBodyCell align="center" colSpan={4}>
              {sga}
            </TableBodyCell>
          </>
        );
      if (inputYear <= 2021)
        return (
          <>
            <TableBodyCell>{salary}</TableBodyCell>
            <TableBodyCell>{game_exp}</TableBodyCell>
            <TableBodyCell>{team_exp}</TableBodyCell>
            <TableBodyCell>{academy_exp}</TableBodyCell>
            <TableBodyCell>{women_exp}</TableBodyCell>
            <TableBodyCell>{goods_exp}</TableBodyCell>
            <TableBodyCell align="center" colSpan={3}>
              {sga}
            </TableBodyCell>
          </>
        );

      return (
        <>
          <TableBodyCell>{salary}</TableBodyCell>
          <TableBodyCell>{game_exp}</TableBodyCell>
          <TableBodyCell>{team_exp}</TableBodyCell>
          <TableBodyCell>{academy_exp}</TableBodyCell>
          <TableBodyCell>{women_exp}</TableBodyCell>
          <TableBodyCell>{goods_exp}</TableBodyCell>
          <TableBodyCell>{other_cost}</TableBodyCell>
          <TableBodyCell align="center" colSpan={2}>
            {sga}
          </TableBodyCell>
        </>
      );
    };

    return (
      <TBodyRow key={year.toString()}>
        {rowHead}
        <TableBodyCell emphasized bgEmphasized>
          {expense}
        </TableBodyCell>
        {expenseData(year)}
      </TBodyRow>
    );
  };

  return { head, renderRow };
}

export default createExpenseRow;
