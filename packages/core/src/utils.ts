import { z, type ZodType } from "zod";
import * as yaml from "yaml";

/**
 * example:
 * getting-started.mdx => ["getting-started"]
 * 2024/hoge.mdx => ["2024", "hoge"]
 * 2024/nested-post/index.md => ["2024", "nested-post"]
 */
export function fileNameToSlug(fileName: string) {
  const pattern = /\/index.(md|mdx)$|.(md|mdx)$/;
  return fileName.replace(pattern, "").split("/");
}

export function schemaVaridator<T extends ZodType>(schema: T) {
  return (data: unknown): data is z.infer<typeof schema> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(result.error.message);
    }
    return result.success;
  };
}

export function dataSchemaVaridator<T extends ZodType>(schema: T) {
  return (input: {
    data: unknown;
    filename: string;
  }): input is { data: z.infer<typeof schema>; filename: string } => {
    const { data, filename } = input;
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(filename, result.error.message);
    }
    return result.success;
  };
}

export const dataFormat = z.enum(["yaml", "json", "buffer"]);
export type DataFormat = z.infer<typeof dataFormat>;

export function dataformatToExts(format: DataFormat) {
  if (format === "yaml") return ["yml", "yaml"];
  return ["json"];
}

export function parseData(format: DataFormat) {
  if (format === "yaml") return (raw: string) => yaml.parse(raw);
  return (raw: string) => JSON.parse(raw);
}

export function dataFormatter(format: DataFormat, extensions?: string[]) {
  const parser = parseData(format);
  return { extensions: extensions ?? dataformatToExts(format), parser };
}
