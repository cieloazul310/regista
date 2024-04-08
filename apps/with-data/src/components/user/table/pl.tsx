import { type FinancialSchema } from "@/content";
import createRow from "./row";

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
  | "related_revenue"
>;

export type BSField = Extract<
  keyof FinancialSchema,
  | "assets"
  | "curr_assets"
  | "fixed_assets"
  | "liabilities"
  | "curr_liabilities"
  | "fixed_liabilities"
  | "net_worth"
  | "capital_stock"
  | "capital_surplus"
  | "retained_earnings"
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
  "related_revenue",
];

export const bsField: BSField[] = [
  "assets",
  "curr_assets",
  "fixed_assets",
  "liabilities",
  "curr_liabilities",
  "fixed_liabilities",
  "net_worth",
  "capital_stock",
  "capital_surplus",
  "retained_earnings",
  "profit",
];

export default {
  pl: createRow({
    fields: plField,
    emphasizedFields: [
      "revenue",
      "expense",
      "op_profit",
      "ordinary_profit",
      "profit",
    ],
    bgEmphasizedFields: [
      "op_profit",
      "ordinary_profit",
      "profit_before_tax",
      "profit",
    ],
  }),
  bs: createRow({
    fields: bsField,
    emphasizedFields: ["assets", "liabilities", "net_worth"],
    bgEmphasizedFields: ["assets", "liabilities", "net_worth"],
  }),
};
