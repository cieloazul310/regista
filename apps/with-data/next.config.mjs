import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";

const withMdx = createMDX({
  experimental: {
    mdxRs: true,
  },
  options: {
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

/** @type {import('next').NextConfig} */
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
