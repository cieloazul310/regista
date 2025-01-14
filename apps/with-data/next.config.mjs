import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";

const withMdx = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: "slack-dark",
          },
        },
      ],
    ],
  },
});

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default withMdx(nextConfig);
