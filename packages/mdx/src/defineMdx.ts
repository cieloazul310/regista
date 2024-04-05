import * as path from "path";
import { readdir, readFile } from "fs/promises";
import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { z, type ZodRawShape, type ZodObject } from "zod";
import {
  fileNameToSlug,
  dataSchemaVaridator,
} from "@cieloazul310/regista-utils";

const defaultFrontmatterSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  lastmod: z.coerce.date(),
  draft: z.boolean(),
});

const defaultFrontmatterSchemaInput = defaultFrontmatterSchema.partial({
  lastmod: true,
  draft: true,
});

export type Frontmatter<
  T extends Record<string, any> = Record<string, unknown>,
> = T & z.infer<typeof defaultFrontmatterSchema>;

export type FrontmatterInput<
  T extends Record<string, any> = Record<string, unknown>,
> = T & z.infer<typeof defaultFrontmatterSchemaInput>;

export type MdxMetadata<
  TFrontmatter extends Record<string, any> = Record<string, unknown>,
> = {
  frontmatter: TFrontmatter;
  absolutePath: string;
  slug: string[];
  href: string;
};

function complementFrontmatter<T extends Record<string, any>>({
  title,
  date,
  lastmod,
  draft,
  ...rest
}: FrontmatterInput<T>): Frontmatter<T> {
  return {
    title,
    date: new Date(date),
    lastmod: lastmod ? new Date(lastmod) : new Date(date),
    draft: typeof draft === "boolean" ? draft : false,
    ...rest,
  } as Frontmatter<T>;
}

export default function defineMdx<Z extends ZodRawShape>({
  contentPath,
  basePath,
  schema,
  extensions = ["md", "mdx"],
  sortFunction,
}: {
  contentPath: string;
  basePath: string;
  schema: Z;
  extensions?: string[];
  sortFunction?: (
    a: MdxMetadata<Frontmatter<z.TypeOf<ZodObject<Z>>>>,
    b: MdxMetadata<Frontmatter<z.TypeOf<ZodObject<Z>>>>,
  ) => number;
}) {
  type RestFrontmatter = z.TypeOf<ZodObject<Z>>;
  const frontmatterSchema = defaultFrontmatterSchema
    .extend(schema)
    .passthrough();
  const metadataSchema = z.object({
    frontmatter: frontmatterSchema,
    absolutePath: z.string(),
    slug: z.array(z.string()),
    href: z.string(),
  });
  const varidator = dataSchemaVaridator(frontmatterSchema);
  const re = new RegExp(`.(${extensions.join("|")})$`);

  async function getAll(): Promise<
    (MdxMetadata<Frontmatter<RestFrontmatter>> & {
      context: {
        older: MdxMetadata<Frontmatter<RestFrontmatter>> | null;
        newer: MdxMetadata<Frontmatter<RestFrontmatter>> | null;
      };
    })[]
  > {
    const filesInDir = await readdir(contentPath, {
      encoding: "utf8",
      recursive: true,
    });
    const files = filesInDir.filter((fileName) => re.test(fileName));

    const allPosts: MdxMetadata<Frontmatter<RestFrontmatter>>[] = (
      await Promise.all(
        files.map(async (filename) => {
          const absolutePath = path.join(contentPath, filename);
          const source = await readFile(absolutePath, { encoding: "utf8" });
          const { frontmatter } = await compileMDX<
            FrontmatterInput<RestFrontmatter>
          >({
            source,
            options: { parseFrontmatter: true },
          });
          return {
            data: complementFrontmatter(frontmatter),
            absolutePath,
            filename,
          };
        }),
      )
    )
      .filter(varidator)
      .map(({ data, absolutePath, filename }) => {
        const slug = fileNameToSlug(filename);
        const href = path.join(basePath, ...slug);

        return {
          frontmatter: data,
          absolutePath,
          slug,
          href,
        };
      });

    return allPosts
      .filter(
        ({ frontmatter }) =>
          process.env.NODE_ENV === "development" || !frontmatter.draft,
      )
      .sort(
        (a, b) =>
          sortFunction?.(a, b) ??
          (a.frontmatter.date.getTime() - b.frontmatter.date.getTime() ||
            a.frontmatter.lastmod.getTime() - b.frontmatter.lastmod.getTime()),
      )
      .map((post, index, arr) => ({
        ...post,
        context: {
          older: arr[index - 1] ?? null,
          newer: arr[index + 1] ?? null,
        },
      }));
  }

  async function get(slug: string[]) {
    const alls = await getAll();
    const datum = alls.find((post) => post.slug.join("/") === slug.join("/"));
    return datum;
  }

  async function useMdx(
    slug: string[],
    { components, options }: Omit<MDXRemoteProps, "source"> = {},
  ) {
    const datum = await get(slug);
    if (!datum) return null;
    const { absolutePath, context, frontmatter } = datum;
    const file = await readFile(absolutePath, { encoding: "utf8" });
    const { content } = await compileMDX({
      source: file,
      components,
      options: {
        ...options,
        parseFrontmatter: true,
      },
    });
    return {
      content,
      context,
      frontmatter,
    };
  }

  return {
    schema: frontmatterSchema,
    metadataSchema,
    get,
    getAll,
    useMdx,
  };
}