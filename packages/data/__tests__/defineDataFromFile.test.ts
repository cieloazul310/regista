import { describe, it, expect } from "vitest";
import * as path from "path";
import { z } from "zod";
import defineDataFromFile from "../src/defineDataFromFile";

const testDir = "packages/data/__tests__";

describe("default", () => {
  const categories = defineDataFromFile({
    filePath: path.resolve(
      process.cwd(),
      testDir,
      "content/singleFiles/categories.yml",
    ),
    schema: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    }),
  });

  it("length", async () => {
    const allCategories = await categories.getAll();
    expect(allCategories.length).toBe(2);
  });
  it("get", async () => {
    const item = await categories.get("id", "column");
    expect(item?.name).toBe("コラム");
  });
});

describe("array with zod validation", () => {
  const nums = defineDataFromFile({
    filePath: path.resolve(
      process.cwd(),
      testDir,
      "content/singleFiles/array.json",
    ),
    format: "json",
    schema: z.number().int().nonnegative(),
  });

  it("length", async () => {
    const all = await nums.getAll();
    expect(all.length).toBe(4);
  });
  /*
  it("get", async () => {
    const item = await nums.get(12);
  });
  */
});

describe("invalid", () => {
  const invalidData = defineDataFromFile({
    filePath: path.resolve(
      process.cwd(),
      testDir,
      "content/singleFiles/invalid.yml",
    ),
    schema: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    }),
  });

  it("length", async () => {
    await expect(async () => {
      await invalidData.getAll();
    }).rejects.toThrow();
  });
});
