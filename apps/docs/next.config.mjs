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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withMdx(nextConfig);
