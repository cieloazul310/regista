---
title: Getting Started
date: 2024-04-01
category: guide
index: 1
---

## Getting started

### 1. Installation

```sh
npm install @cieloazul310/regista
```

and install peer dependencies.

```sh
npm install --save-dev @mdx-js/mdx
```

If you are using `@next/mdx`, the above process is not necessary as `@mdx-js/loader` already has `@mdx-js/mdx` as a dependency.

### 2. Configure your content

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
