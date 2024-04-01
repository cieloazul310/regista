---
title: defineData API
date: 2024-03-26
---

# defineData

```ts
import * as path from "path";
import { z, defineData } from "@cieloazul310/regista";

export const author = defineData({
  contentPath: path.resolve(process.cwd(), "content/author"),
  format: "yaml",
  schema: {
    name: z.string(),
    description: z.string(),
    age: z.number().optional(),
  },
});
```

## API

### Options

#### `contentPath`

type: `string`

Specify the path where data are stored.

#### `schema`

type: `ZodRawShape`

Specify the type definition of the data in the [Zod schema][Zod].

```ts
const schema: ZodRawShape = {
  name: z.string(),
  description: z.string(),
  age: z.number().optional(),
};
```

Zod Objects
<https://zod.dev/?id=objects>

#### `format` (*optional*)

type: `"yaml" | "json"`
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

### Properties

#### schema

type: `ZodObject`

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

returns: `Promise<Data[]>`

Returns all data.

```tsx
async function Example() {
  const allAuthor = await author.getAll();

  return (
    <div>
      {allAuthor
        .map(({ id, name, description, age }) => (
          <article key={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            {age && <p>{age}</p>}
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
  const item = await author.get("name", "Beethoven");
  if (!item) return null;
  const { name, description, age } = item;

}
```

[Zod]: https://zod.dev/ "Zod"
