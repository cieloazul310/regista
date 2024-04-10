import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import type { FinancialSchema } from "@/content";
import { Table, THead, TBody } from "./table";
import Tabs from "./tabs";
import { Tabs as ParkTabs } from "../../ui";
import row from "./row";
import type { Tab, Mode } from "./types";

type FinancialTableProps = {
  items: {
    data: FinancialSchema;
  }[];
  mode: Mode;
};

const options: { id: Tab; label: string }[] = [
  { id: "pl", label: "損益計算書" },
  { id: "bs", label: "貸借対照表" },
  { id: "revenue", label: "営業収入" },
  { id: "expense", label: "営業費用" },
];

export function FinancialTable({ items, mode }: FinancialTableProps) {
  return (
    <section
      className={flex({
        bg: "bg.default",
        maxWidth: "full",
        direction: { base: "column", lg: "row" },
        gap: "md",
      })}
    >
      <Tabs
        className={css({ width: "full" })}
        size="sm"
        defaultValue="pl"
        orientation="horizontal"
        variant="enclosed"
        options={options}
      >
        {options.map(({ id }) => {
          const { head, renderRow } = row[id];
          return (
            <ParkTabs.Content key={id} value={id}>
              <Table>
                <THead>{head(mode)}</THead>
                <TBody>{items.map(({ data }) => renderRow(data, mode))}</TBody>
              </Table>
            </ParkTabs.Content>
          );
        })}
      </Tabs>
    </section>
  );
}

export * from "./types";
