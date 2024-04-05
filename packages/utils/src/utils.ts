import { z, type ZodType } from "zod";
import * as yaml from "yaml";

export type DataMetadata<TData extends ZodType> = {
  id: string;
  data: TData;
  absolutePath: string;
};

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
  return (data: unknown): data is z.TypeOf<T> => {
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
  }): input is { data: z.TypeOf<T>; filename: string } => {
    const { data, filename } = input;
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(filename, result.error.message);
    }
    return result.success;
  };
}

export const dataFormat = z.enum(["yaml", "json", "raw"]);
export type DataFormat = z.infer<typeof dataFormat>;

export function dataformatToExts(format: DataFormat) {
  if (format === "yaml") return ["yml", "yaml"];
  if (format === "json") return ["json"];
  return ["txt"];
}

export function parseData(format: DataFormat) {
  if (format === "yaml") return (raw: string) => yaml.parse(raw);
  if (format === "json") return (raw: string) => JSON.parse(raw);
  return (raw: string) => raw;
}

export function dataFormatter(format: DataFormat, extensions?: string[]) {
  const parser = parseData(format);
  return { extensions: extensions ?? dataformatToExts(format), parser };
}
