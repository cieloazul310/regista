import { type FinancialSchema } from "@/content";

export type Mode = "club" | "year";

export type Tab = "pl" | "bs" | "revenue" | "expense";

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

export type RevenueField = Extract<
  keyof FinancialSchema,
  | "revenue"
  | "sponsor"
  | "ticket"
  | "broadcast"
  | "academy_rev"
  | "women_rev"
  | "goods_rev"
  | "other_revs"
  | "related_revenue"
>;

export type ExpenseField = Extract<
  keyof FinancialSchema,
  | "expense"
  | "salary"
  | "game_exp"
  | "team_exp"
  | "academy_exp"
  | "women_exp"
  | "goods_exp"
  | "other_cost"
  | "sga"
  | "manage_exp"
  | "general_exp"
>;
