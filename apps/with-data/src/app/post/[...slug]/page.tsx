import type { Metadata } from "next";
import { PageHeader } from "@/components";
import { post } from "@/content";
import { useMDXComponents } from "@/mdx-components";

export async function generateStaticParams() {
  const allPost = await post.getAll();
  return allPost;
}

type PageProps = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const item = await post.get(slug);
  if (!item) return null;
  const { frontmatter } = item;
  const { title } = frontmatter;

  return {
    title,
  } satisfies Metadata;
}

async function Page({ params }: PageProps) {
  const { slug } = params;
  const components = useMDXComponents();
  const item = await post.useMdx(slug, { components });
  if (!item) return null;
  const { frontmatter, content } = item;
  const { title } = frontmatter;

  return (
    <article>
      <PageHeader title={title} />
      {content}
    </article>
  );
}

export default Page;
