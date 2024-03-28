import { readFile, readdir } from "fs/promises";
import * as path from "path";
import { z, type ZodRawShape } from "zod";
import { dataSchemaVaridator, dataFormatter, type DataFormat } from "./utils";

export default function defineData<T extends ZodRawShape>({
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
  const dataSchema = z.object({ id: z.string() }).extend(schema).passthrough();
  const varidator = dataSchemaVaridator(dataSchema);

  async function getAll(): Promise<z.infer<typeof dataSchema>[]> {
    const filesInDir = await readdir(contentPath, {
      encoding: "utf8",
      recursive: true,
    });
    const files = filesInDir.filter((fileName) =>
      formatter.extensions.some((ext) => new RegExp(`.${ext}$`).test(fileName)),
    );
    const collection = (
      await Promise.all(
        files.map(async (filename) => {
          const absolutePath = path.join(contentPath, filename);
          const file = await readFile(absolutePath, "utf8");
          const datum = formatter.parser(file);
          return {
            data: { id: filename.replace(/\.[^/.]+$/, ""), ...datum },
            filename,
          };
        }),
      )
    )
      .filter(varidator)
      .map(({ data }) => data);

    return collection;
  }

  async function get(
    key: keyof z.infer<typeof dataSchema>,
    value: unknown,
  ): Promise<z.infer<typeof dataSchema> | undefined> {
    const data = await getAll();
    return data.find((datum) => datum?.[key] === value);
  }

  return {
    schema: dataSchema,
    get,
    getAll,
  };
}
