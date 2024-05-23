import { describe, it, expect } from "vitest";
import { fileNameToSlug } from "../src/utils";

function arrayMatcher<T>(input: T[], expected: T[]) {
  expect(input.length).toBe(expected.length);
  input.forEach((str, index) => {
    expect(str).toBe(expected[index]);
  });
}

describe("fileName to Slug", () => {
  it("single", () => {
    const slug = fileNameToSlug("bach.mdx");
    const expected = ["bach"];
    arrayMatcher(slug, expected);
  });

  it("double", () => {
    const slug = fileNameToSlug("sebastian/bach.mdx");
    const expected = ["sebastian", "bach"];
    arrayMatcher(slug, expected);
  });

  it("triple", () => {
    const slug = fileNameToSlug("johann/sebastian/bach.mdx");
    const expected = ["johann", "sebastian", "bach"];
    arrayMatcher(slug, expected);
  });

  it("single with index", () => {
    const slug = fileNameToSlug("emanuel/index.mdx");
    const expected = ["emanuel"];
    arrayMatcher(slug, expected);
  });

  it("double with index", () => {
    const slug = fileNameToSlug("philipp/emanuel/index.md");
    const expected = ["philipp", "emanuel"];
    arrayMatcher(slug, expected);
  });

  it("triple with index", () => {
    const slug = fileNameToSlug("carl/philipp/emanuel/index.mdx");
    const expected = ["carl", "philipp", "emanuel"];
    arrayMatcher(slug, expected);
  });
});
