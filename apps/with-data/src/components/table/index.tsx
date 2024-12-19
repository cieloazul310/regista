"use client";

import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import type { TabsValueChangeDetails } from "@ark-ui/react";
import type { FinancialSchema } from "@/content";
import { useTableStore } from "@/providers/table-store-provider";
import type { Tab, Mode } from "@/types";
import { Table, THead, TBody } from "./table";
import Tabs from "./tabs";
import { Tabs as ParkTabs } from "../ui/tabs";
import row from "./row";

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

function FinancialTable({ items, mode }: FinancialTableProps) {
  const { tab, setTab } = useTableStore((store) => store);
  const onValueChange = (details: TabsValueChangeDetails) => {
    setTab(details.value as Tab);
  };

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
        defaultValue={tab}
        onValueChange={onValueChange}
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
export default FinancialTable;
