import { readFile, readdir } from "fs/promises";
import * as path from "path";
import { z, type ZodType } from "zod";
import {
  dataSchemaVaridator,
  dataFormatter,
  type DataFormat,
  type DataMetadata,
} from "./utils";

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
  type DataSchema = z.TypeOf<T>;
  const formatter = dataFormatter(format, extensions);
  const varidator = dataSchemaVaridator(schema);
  const re = new RegExp(`.(${formatter.extensions.join("|")})$`);

  async function getAll(): Promise<DataMetadata<DataSchema>[]> {
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
    key: "id" | keyof DataSchema,
    value: unknown,
  ): Promise<DataMetadata<DataSchema> | undefined> {
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
