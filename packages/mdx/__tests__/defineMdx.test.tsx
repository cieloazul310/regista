/* eslint react/function-component-definition: off */
import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as path from "path";
import { z } from "zod";
// import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import defineMdx, { type UseMDXOptions } from "../src/defineMdx";

const testDir = "packages/mdx/__tests__";

describe("defineMdx", () => {
  const post = defineMdx({
    contentPath: path.resolve(process.cwd(), testDir, "content/post"),
    basePath: "/post",
    schema: {
      category: z.enum(["News", "コラム"]).optional(),
      author: z
        .enum(["cieloazul310", "那珂川緑波", "ショスタコおもち"])
        .optional(),
    },
  });

  const Page = async ({
    params,
    mdxOptions = {},
  }: {
    params: { slug: string[] };
    mdxOptions?: UseMDXOptions;
  }) => {
    const { slug } = params;
    const mdx = await post.useMdx(slug, mdxOptions);
    if (!mdx) return null;
    const { frontmatter, content } = mdx;

    return (
      <article>
        <h1>{frontmatter.title}</h1>
        {content}
      </article>
    );
  };

  it("check all posts", async () => {
    const allPosts = await post.getAll();
    expect(allPosts.length).toBe(4);

    const firstPost = allPosts[0];
    expect(firstPost.href).toBe("/post/2023/london-calling");
    expect(firstPost.context.older).toBeNull();
    expect(firstPost.context.newer?.href).toBe("/post/2023/remember-tensai");
  });

  it("check get function", async () => {
    const specifiedPost = await post.get(["2024", "lonesome-cowboy"]);

    expect(specifiedPost?.frontmatter.title).toBe("論寒牛男");
    expect(specifiedPost?.href).toBe("/post/2024/lonesome-cowboy");
    expect(specifiedPost?.context.older?.href).toBe(
      "/post/2023/remember-tensai",
    );
  });

  it("render mdx", async () => {
    const Result = await Page({
      params: { slug: ["2023", "remember-tensai"] },
    });
    render(Result);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /天災は忘れた頃来る/,
      }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: /一体どこにあるのか/,
      }),
    ).toBeInTheDocument();

    cleanup();
  });

  it("render with custom component", async () => {
    const components = {
      h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
        <h2 aria-current="page" {...props} />
      ),
    };

    const Result = await Page({
      params: { slug: ["2023", "remember-tensai"] },
      mdxOptions: { components },
    });
    render(Result);

    expect(
      await screen.findByRole("heading", {
        level: 2,
        current: "page",
      }),
    ).toBeInTheDocument();

    cleanup();
  });
});
