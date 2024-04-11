import * as path from "path";
import { z, defineData, defineDataFromFile } from "@cieloazul310/regista-data";

export const categories = z.enum(["J1", "J2", "J3"]);

export const financial = defineData({
  contentPath: path.resolve(process.cwd(), "content/financial"),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    year: z.number().gte(2005),
    category: categories,
    rank: z.number().nonnegative(),
    revenue: z.number({ description: "営業収入" }).nonnegative(),
    expense: z.number({ description: "営業費用" }).nonnegative(),
    op_profit: z.number({ description: "営業利益" }),
    no_rev: z.number({ description: "営業外収益" }).optional(),
    no_exp: z.number({ description: "営業外費用" }).optional(),
    ordinary_profit: z.number({ description: "経常利益" }).optional(),
    sp_rev: z.number({ description: "特別利益" }).optional(),
    sp_exp: z.number({ description: "特別費用" }).optional(),
    profit_before_tax: z.number({ description: "税引き前利益" }).optional(),
    tax: z.number({ description: "住民税等" }).optional(),
    profit: z.number({ description: "当期純利益" }),
    related_revenue: z
      .number({ description: "関連する法人の営業収益" })
      .nonnegative()
      .optional(),
    assets: z.number({ description: "資産の部" }).nonnegative(),
    curr_assets: z.number({ description: "流動資産" }).nonnegative().optional(),
    fixed_assets: z
      .number({ description: "固定資産等" })
      .nonnegative()
      .optional(),
    liabilities: z.number({ description: "負債の部" }).nonnegative(),
    curr_liabilities: z
      .number({ description: "流動負債" })
      .nonnegative()
      .optional(),
    fixed_liabilities: z
      .number({ description: "固定負債" })
      .nonnegative()
      .optional(),
    net_worth: z.number({ description: "純資産の部" }),
    capital_stock: z.number({ description: "資本金" }).nonnegative().optional(),
    capital_surplus: z
      .number({ description: "資本剰余金等" })
      .nonnegative()
      .optional(),
    retained_earnings: z.number({ description: "利益剰余金等" }).optional(),
    sponsor: z
      .number({ description: "スポンサー収入" })
      .nonnegative()
      .optional(),
    ticket: z.number({ description: "入場料収入" }).nonnegative().optional(),
    broadcast: z
      .number({ description: "Jリーグ配分金" })
      .nonnegative()
      .optional(),
    academy_rev: z
      .number({ description: "アカデミー関連収入" })
      .nonnegative()
      .optional(),
    women_rev: z
      .number({ description: "女子チーム関連収入" })
      .nonnegative()
      .optional(),
    goods_rev: z
      .number({ description: "物販関連収入" })
      .nonnegative()
      .optional(),
    other_revs: z
      .number({ description: "その他収入" })
      .nonnegative()
      .optional(),
    salary: z.number({ description: "チーム人件費" }).nonnegative().optional(),
    game_exp: z
      .number({ description: "試合関連経費" })
      .nonnegative()
      .optional(),
    team_exp: z
      .number({ description: "トップチーム関連経費" })
      .nonnegative()
      .optional(),
    academy_exp: z
      .number({ description: "アカデミー関連経費" })
      .nonnegative()
      .optional(),
    women_exp: z
      .number({ description: "女子チーム関連経費" })
      .nonnegative()
      .optional(),
    goods_exp: z
      .number({ description: "物販関連経費" })
      .nonnegative()
      .optional(),
    other_cost: z
      .number({ description: "その他売上原価" })
      .nonnegative()
      .optional(),
    sga: z
      .number({ description: "販売費及び一般管理費" })
      .nonnegative()
      .optional(),
    manage_exp: z.number({ description: "事業費" }).nonnegative().optional(),
    general_exp: z.number({ description: "総事業費" }).nonnegative().optional(),
  }),
});
export type FinancialSchema = z.infer<typeof financial.schema>;

export const clubCollection = defineDataFromFile({
  filePath: path.resolve(process.cwd(), "content/clubs.yml"),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    fullname: z.string(),
    short_name: z.string(),
    company: z.string(),
    category: categories,
    hometown: z.string(),
    website: z.string().url(),
    relatedCompanies: z.array(z.string()).optional(),
  }),
});
export type ClubSchema = z.infer<typeof clubCollection.schema>;

export const yearCollection = defineDataFromFile({
  filePath: path.resolve(process.cwd(), "content/year.yml"),
  schema: z.object({
    id: z.string(),
    year: z.number().int().gte(2005).lte(2022),
    categories: z.array(categories),
  }),
});
export type YearSchema = z.infer<typeof yearCollection.schema>;
