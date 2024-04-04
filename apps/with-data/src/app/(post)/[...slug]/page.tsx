import NextLink from "next/link";
import rehypeShiki from "@shikijs/rehype";
import { css } from "styled-system/css";
import { flex, vstack } from "styled-system/patterns";
import { PageHeader } from "@/components";
import { Text } from "@/components/ui";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";

export async function generateStaticParams() {
  const allPost = await post.getAll();
  return allPost;
}

const neighborStyle = flex({
  maxWidth: { base: "full", md: "50%" },
  direction: "column",
});
const neighborPlaceholderStyle = css({
  maxWidth: { base: "full", md: "50%" },
});

async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const components = useMDXComponents();
  const mdx = await post.useMdx(slug, {
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [
            // @ts-expect-error
            rehypeShiki,
            {
              themes: {
                light: "slack-dark",
              },
            },
          ],
        ],
      },
    },
  });
  if (!mdx) return null;
  const { content, frontmatter, context } = mdx;
  const { title } = frontmatter;
  const { older, newer } = context;

  return (
    <>
      <article className={vstack({ gap: "md", alignItems: "stretch" })}>
        <PageHeader title={title} />
        <div>{content}</div>
      </article>
      <nav
        className={flex({
          direction: { base: "column", md: "row" },
          gap: "md",
          width: "full",
          justifyContent: "space-between",
        })}
      >
        {older ? (
          <div className={neighborStyle}>
            <Text>Previous</Text>
            <NextLink href={older.href}>
              <Text fontWeight="bold" fontSize="lg">
                {older.frontmatter.title}
              </Text>
            </NextLink>
          </div>
        ) : (
          <div className={neighborPlaceholderStyle} />
        )}
        {newer ? (
          <div className={neighborStyle}>
            <Text>Next</Text>
            <NextLink href={newer.href}>
              <Text fontWeight="bold" fontSize="lg">
                {newer.frontmatter.title}
              </Text>
            </NextLink>
          </div>
        ) : (
          <div className={neighborPlaceholderStyle} />
        )}
      </nav>
    </>
  );
}

export default Page;
