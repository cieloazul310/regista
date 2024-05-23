---
title: defineDataFromFile API
date: 2024-04-01
lastmod: 2024-04-02
category: api
index: 12
---

```ts
import * as path from "path";
import { z, defineDataFromFile } from "@cieloazul310/regista";

export const categories = defineDataFromFile({
  filePath: path.resolve(process.cwd(), "content/categories.yml"),
  format: "yaml",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
```

## API

### Options

#### `filePath`

type: `string`

Specify the path of the file to read.

#### `schema`

type: `ZodType`

Specify the type definition of the data in the [Zod schema][Zod].

```ts
const schema: ZodType = {
  title: z.string(),
  description: z.string(),
};
```

Zod Objects  
https://zod.dev/?id=objects

#### `format` (*optional*)

type: `"yaml" | "json"`  
default: `"yaml"`

Specify the data format to read.

### Properties

#### schema

type: `ZodType`

```ts
export type Categories = z.infer<typeof categories.schema>;
/**
 * {
 *   id: string; // required
 *   title: string;
 *   description: string;
 * }
 */
```

### Methods

#### `getAll()`

returns: `Promise<Data[]>`

Returns all data.

```tsx
async function Example() {
  const allCategories = await categories.getAll();

  return (
    <div>
      {allCategories
        .map(({ id, title, description }) => (
          <article key={id}>
            <h1>{title}</h1>
            <p>{description}</p>
          </article>
        ))
      }
    </div>
  );
}
```

#### `get(key: keyof Data, value: unknown)`

arguments: `keyof Data` (`string`), `unknown`  
returns: `Promise<Data | undefiend>`

Returns data matching the key and value.

```tsx
async function Example() {
  const item = await categories.get("title", "Blog");
  if (!item) return null;
  const { title, description } = item;

}
```

[Zod]: https://zod.dev/ "Zod"
