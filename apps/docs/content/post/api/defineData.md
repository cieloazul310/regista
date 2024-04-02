---
title: defineData API
date: 2024-04-01
lastmod: 2024-04-02
category: api
index: 11
---

```ts
import * as path from "path";
import { z, defineData } from "@cieloazul310/regista";

export const author = defineData({
  contentPath: path.resolve(process.cwd(), "content/author"),
  format: "yaml",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    age: z.number().optional(),
  }),
});
```

## API

### Options

#### `contentPath`

type: `string`

Specify the path where data are stored.

#### `schema`

type: `ZodType`

Specify the type definition of the data in the [Zod schema][Zod].

```ts
const schema = z.object({
  name: z.string(),
  description: z.string(),
  age: z.number().optional(),
}) satisfies ZodType;

const anotherSchema = z.string() satisfies ZodType;
```

Zod Objects  
https://zod.dev/?id=objects

#### `format` (*optional*)

type: `"yaml" | "json" | "raw"`  
default: `"yaml"`

Specify the data format to read.

#### `extensions` (*optional*)

type: `string[]`  
default: `undefined`

Specify the extensions of files to be detected as an array.

Default:

| format   | extensions        |
|----------|-------------------|
| `"yaml"` | `["yml", "yaml"]` |
| `"json"` | `["json"]`        |
| `"raw"`  | `["txt"]`         |

### Properties

#### schema

type: `ZodType`

```ts
export type Author = z.infer<typeof author.schema>;
/**
 * {
 *   id: string; // generated from fileName
 *   name: string;
 *   description: string;
 *   age?: number | undefined;
 * }
 */
```

### Methods

#### `getAll()`

returns: `Promise<Metadata<Data>[]>`

Returns all data.

```tsx
async function Example() {
  const allAuthor = await author.getAll();

  return (
    <div>
      {allAuthor
        .map(({ id, data }) => (
          <article key={id}>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            {data.age && <p>{data.age}</p>}
          </article>
        ))
      }
    </div>
  );
}
```

#### `get(key: "id" | keyof Data, value: unknown)`

arguments: `"id" | keyof Data` (`string`), `unknown`
returns: `Promise<Metadata<Data> | undefiend>`

Returns data matching the key and value.

```tsx
async function Example() {
  const item = await author.get("name", "Beethoven");
  if (!item) return null;
  const { data } = item;
  const { name, description, age } = data;

}
```

[Zod]: https://zod.dev/ "Zod"
