import * as path from "path";
import {
  z,
  defineMdx,
  defineData,
  defineDataFromFile,
} from "@cieloazul310/regista";

export const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/post",
  schema: {
    club: z.array(z.string()).optional(),
  },
});
export type PostFrontmatter = z.infer<typeof post.schema>;
export type PostMetadata = z.infer<typeof post.metadataSchema>;

export const categories = z.enum(["J1", "J2", "J3"]);

export const financial = defineData({
  contentPath: path.resolve(process.cwd(), "content/financial"),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    year: z.number().gte(2005),
    category: categories,
    revenue: z.number({ description: "営業収入" }).nonnegative(),
    expense: z.number({ description: "営業収入" }).nonnegative(),
    op_profit: z.number({ description: "営業利益" }),
    no_rev: z.number({ description: "営業外収益" }).optional(),
    no_exp: z.number({ description: "営業外費用" }).optional(),
    ordinary_profit: z.number({ description: "経常利益" }).optional(),
    sp_rev: z.number({ description: "特別利益" }).optional(),
    sp_exp: z.number({ description: "特別費用" }).optional(),
    profit_before_tax: z.number({ description: "税引き前利益" }).optional(),
    tax: z.number({ description: "住民税等" }).optional(),
    profit: z.number({ description: "当期純利益" }),
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
