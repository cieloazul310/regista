import { readFile } from "fs/promises";
import { z, type ZodType } from "zod";
import {
  schemaVaridator,
  dataFormatter,
  type DataFormat,
} from "@cieloazul310/regista-utils";

export default function defineDataFromFile<T extends ZodType>({
  filePath,
  schema,
  format = "yaml",
}: {
  filePath: string;
  schema: T;
  format?: DataFormat;
}) {
  const { parser } = dataFormatter(format);
  const varidator = schemaVaridator(schema);

  async function getAll(): Promise<z.TypeOf<T>[]> {
    const file = await readFile(filePath, "utf8");
    const raw = parser(file);
    if (!Array.isArray(raw)) throw new Error("Data must be array");
    const data = raw.filter(varidator);
    return data;
  }

  /** @todo should be adapted to any data */
  async function get(
    key: keyof z.TypeOf<T>,
    value: unknown,
  ): Promise<z.TypeOf<T> | undefined> {
    const data = await getAll();
    return data.find((datum) => datum?.[key] === value);
  }

  return {
    schema,
    get,
    getAll,
  };
}
