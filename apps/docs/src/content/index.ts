import * as path from "path";
import { z, defineMdx } from "@cieloazul310/regista";

export const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/",
  schema: {
    index: z.number(),
    category: z.enum(["guide", "api"]),
  },
  sortFunction: (a, b) => a.frontmatter.index - b.frontmatter.index,
});
export type PostFrontmatter = z.infer<typeof post.schema>;
export type PostMetadata = z.infer<typeof post.metadataSchema>;
