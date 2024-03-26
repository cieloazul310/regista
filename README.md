# Regista

Simple and type-safe Markdown/MDX content management tool for Next.js App Router.

## Usage

### Example project structure (Next.js App Router)

```txt
.
├── content
│   ├── author
│   ├── post
│   └── categories.yml
├── public
│   └── assets
├── src
│   ├── app
│   └── content
├── next.config.mjs
├── package.json
└── tsconfig.json
```

### Directories and files

- `content/author`
- `content/post`
- `content/categories.yml`
- `src/content/index.ts`

## Getting started

### 1. Installation

```sh
npm install @cieloazul310/regista
```

### 2. Set up

```tsx
// src/content.index.ts
import * as path from "path";
import { z, defineMdx } from "@cieloazul310/regista";

export const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/post",
  schema: {
    author: z.string().optional(),
  },
});
export type PostFrontmatter = z.infer<typeof post.schema>;
export type PostMetadata = z.infer<typeof post.metadataSchema>;
```

### 3. Using with Dynamic routes

```tsx
// src/app/post/[...slug].tsx
import NextLink from "next/link";
import type { Metadata } from "next";
import { post } from "@/content";

export async function generateStaticParams() {
  const allPosts = await post.getAll(); // => PostMetadata[]
  return allPosts;
}

async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const item = await post.useMdx(slug);
  if (!item) return null;
  const { content, frontmatter, context } = item;
  const { title, date, lastmod, author } = frontmatter;
  const { older, newer } = context;

  return (
    <>
      <article>
        <header>
          <h1>{title}</h1>
          <small>
            <time>{date.toDateString()}</time>
          </small>
        </header>
        <section>{content}</section>
      </article>
      <nav>
        {older && (
          <div>
            <p>Older post</p>
            <NextLink href={older.href}>{older.frontmatter.title}</NextLink>
          </div>
        )}
        {newer && (
          <div>
            <p>Newer post</p>
            <NextLink href={newer.href}>{newer.frontmatter.title}</NextLink>
          </div>
        )}
      </nav>
    </>
  );
}

export default Page;
```

Dynamic Routes
<https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes>

## API

- [`defineMdx`](./docs/api//defineMdx.md)

### `defineData`

#### Options

#### Methods

### `defineDataFromFile`

#### Options

#### Methods

[Zod]: https://zod.dev/ "Zod"
[next-mdx-remote]: https://github.com/hashicorp/next-mdx-remote "next-mdx-remote"
