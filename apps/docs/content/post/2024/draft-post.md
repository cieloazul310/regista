---
title: Draft post
date: 2024-03-22
category: News
author: cieloazul310
draft: true
---

これは下書きの投稿です。フロントマターの**draft**フィールドを`true`に設定すると、本番モードでは表示されません。

```tsx
import * as path from "path";
import { z, defineMdx } from "@cieloazul310/regista";

const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/post",
  schema: {
    author: z.string().optional(),
  },
});
```
