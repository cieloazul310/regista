---
title: defineMdx API
date: 2024-03-26
---

# defineMdx

```ts
import * as path from "path";
import { z, defineMdx } from "@cieloazul310/regista";

export const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/post",
  schema: {
    author: z.string(),
    categories: z.array(z.string()).optional(),
  },
  extensions: ["md", "mdx"],
});
```

## API

### Options

#### `contentPath`

type: `string`

Specify the path where Markdown/MDX contents are stored.

#### `basePath`

type: `string`

Specify the route for creating Markdown/MDX pages.

```ts
const post = defineMdx({
  ...options,
  basePath: "/post",
});

async function Example() {
  const slug = ["slug", "of", "mdx"];
  const item = await post.get(slug);
  if (!item) return;
  const { href } = item;
  console.log(href);
  // => /post/slug/of/mdx
}
```

#### `schema`

type: `ZodRawShape`

Specify the type definition of the frontmatter to be added in the [Zod schema][Zod].

```ts
const schema: ZodRawShape = {
  author: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
};
```

Specified frontmatter schema would be merged with default frontmatter schema.

```ts
const defaultFrontmatterSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  lastmod: z.coerce.date(),
  draft: z.boolean(),
});

const frontmatterSchema = defaultFrontmatterSchema.extend(schema);
type FrontmatterSchema = z.infer<typeof frontmatterSchema>;
/**
 * {
 *   title: string;
 *   date: Date;
 *   lastmod: Date;
 *   draft: boolean;
 *   author: string;
 *   category?: string | undefined;
 *   tags?: string[] | undefined;
 * }
 */
```

Zod Objects
<https://zod.dev/?id=objects>

#### `extensions` (*optional*)

type: `string[]`
default: `["md", "mdx"]`

Specify the extensions of Markdown/MDX files to be detected as an array.

#### `sortFunction` (*optional*)

type: `(a: Metadata<Frontmatter>, b: Metadata<Frontmatter>) => number`  
default: `undefined`

```tsx
export const docs = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/docs"),
  basePath: "/docs",
  schema: {
    index: z.number(),
  },
  sortFunction: (a, b) => a.frontmatter.index - b.frontmatter.index,
});
```

Specify the sort function for context which detect the older/newer posts. If no sort function is set, the items will be sorted by `date`, then by `lastmod`.

### Properties

#### schema

type: `ZodObject`

```ts
export type Frontmatter = z.infer<typeof post.schema>;
/**
 * {
 *   title: string;
 *   date: Date;
 *   lastmod: Date;
 *   draft: boolean;
 * } & UserFrontmatter
 */
```

#### metadataSchema

type: `ZodObject`

```ts
export type Metadata = z.infer<typeof post.metadataSchema>;
/**
 * {
 *   frontmatter: Frontmatter;
 *   absolutePath: string;
 *   slug: string[];
 *   href: string;
 * }
 */
```

### Methods

#### `getAll()`

returns: `Promise<Metadata[]>`

Returns all specified Markdown/MDX metadata. The metadata includes the specified frontmatter.

```tsx
async function Example() {
  const allPost = await post.getAll();

  return (
    <nav>
      {allPost
        .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
        .map(({ href, frontmatter }) => (
          <NextLink key={href} href={href}>
            {frontmatter.title}
          </NextLink>
        ))
      }
    </nav>
  )
}
```

Markdown/MDX content with the frontmatter draft property set to `true` will be filtered out in production mode.

#### `get(slug: string[])`

argument: `string[]`
returns: `Promise<Metadata | undefiend>`

Returns the metadata of the Markdown/MDX content that matches the slug argument.

```tsx
async function Example() {
  const item = await post.get(["this", "is", "slug"]);
  if (!item) return null;
  const { slug, absolutePath, href, frontmatter } = item;
}
```

#### `useMdx(slug: string[], options?)`

arguments: `string[]`
returns: `Promise<{ content, frontmatter, context }>`

Returns a `ReactElement` that converts the body of Markdown/MDX content as `content` that matches the argument slug. Additionally, it returns `frontmatter` and adjacent content metadata as `context`.

```tsx
async function Example() {
  const item = await post.useMdx(["this", "is", "slug"]);
  if (!item) return null;
  const { content, frontmatter, context } = item;

  return <article>{content}</article>
}
```

##### options (*optional*)

The second argument is an option for the MDX compiler and corresponds to the argument of the `compileMDX` function in [next-mdx-remote].

```tsx
import { shortcodes } from "@/components";
import { post } from "@/content";
import { useMDXComponents } from "@/mdx-components";

async function Page() {
  const mdxComponents = useMDXComponents();
  const components = { ...mdxComponents, ...shortcodes };

  const item = await post.useMdx(slug, {
    components,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });
  if (!item) return null;
  const { content } = item;

  return <article>{content}</article>;
}
```

## Migration from v0

### BREAKING CHANGE: `useMdx` options

```diff
const item = await post.useMdx(slug, {
  components,
- options: {
-   mdxOptions: {
-     remarkPlugins: [],
-     rehypePlugins: [],
-   },
- },
+ mdxOptions: {
+   remarkPlugins: [],
+   rehypePlugins: [],
+ },
});
```

@mdx-js/mdx `CompileOptions`
<https://mdxjs.com/packages/mdx/#compileoptions>

[Zod]: https://zod.dev/ "Zod"
[next-mdx-remote]: https://github.com/hashicorp/next-mdx-remote "next-mdx-remote"
