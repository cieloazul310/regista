import { readFile, readdir } from "fs/promises";
import * as path from "path";
import type { ZodType, output } from "zod";
import {
  dataSchemaVaridator,
  dataFormatter,
  type DataFormat,
  type DataMetadata,
} from "@cieloazul310/regista-utils";

/**
 * https://cieloazul310.github.io/regista/api/defineData
 */
export default function defineData<T extends ZodType>({
  contentPath,
  schema,
  format = "yaml",
  extensions = undefined,
}: {
  contentPath: string;
  schema: T;
  format?: DataFormat;
  extensions?: string[];
}) {
  const formatter = dataFormatter(format, extensions);
  const varidator = dataSchemaVaridator(schema);
  const re = new RegExp(`.(${formatter.extensions.join("|")})$`);

  async function getAll(): Promise<DataMetadata<T>[]> {
    const filesInDir = await readdir(contentPath, {
      recursive: true,
    });
    const files = filesInDir.filter((fileName) => re.test(fileName));
    const collection = (
      await Promise.all(
        files.map(async (filename) => {
          const absolutePath = path.join(contentPath, filename);
          const file = await readFile(absolutePath, "utf8");
          const datum = formatter.parser(file);
          return {
            data: datum,
            id: filename.replace(/\.[^/.]+$/, ""),
            filename,
            absolutePath,
          };
        }),
      )
    ).filter(varidator);

    return collection;
  }

  async function get(
    key: "id" | keyof output<T>,
    value: unknown,
  ): Promise<DataMetadata<T> | undefined> {
    const data = await getAll();
    if (key === "id") return data.find((datum) => datum.id === value);

    return data.find((datum) => datum?.data[key] === value);
  }

  return {
    schema,
    get,
    getAll,
  };
}
