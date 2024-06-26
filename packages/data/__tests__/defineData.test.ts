import { describe, it, expect } from "vitest";
import * as path from "path";
import { z } from "zod";
import defineData from "../src/defineData";

const testDir = "packages/data/__tests__";

describe("author", () => {
  const author = defineData({
    contentPath: path.resolve(process.cwd(), testDir, "content/author"),
    schema: z.object({
      name: z.string(),
    }),
  });

  it("length", async () => {
    const allAuthors = await author.getAll();
    expect(allAuthors.length).toBe(3);
  });
  it("get", async () => {
    const itemOne = await author.get("id", "roppa");
    expect(itemOne?.data.name).toBe("那珂川緑波");

    const itemTwo = await author.get("id", "enoken");
    expect(itemTwo).toBeUndefined();
  });
});

describe("safeParse filtering", () => {
  const author = defineData({
    contentPath: path.resolve(process.cwd(), testDir, "content/author"),
    schema: z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
    }),
  });

  it("length", async () => {
    const allAuthors = await author.getAll();
    expect(allAuthors.length).toBe(2);
  });
});

describe("json file", () => {
  const jsonData = defineData({
    contentPath: path.resolve(process.cwd(), testDir, "content/json"),
    format: "json",
    schema: z.object({
      name: z.string(),
      values: z.array(z.number().int().nonnegative().lte(10)),
    }),
  });

  it("length", async () => {
    const allJsonData = await jsonData.getAll();
    expect(allJsonData.length).toBe(2);
  });
});

describe("custom extension", () => {
  const geojson = defineData({
    contentPath: path.resolve(process.cwd(), testDir, "content/geojson"),
    format: "json",
    schema: z.object({
      type: z.enum(["FeatureCollection"]),
      features: z.array(
        z.object({
          type: z.enum(["Feature"]),
          geometry: z.object({
            type: z.enum([
              "Point",
              "MultiPoint",
              "LineString",
              "MultiLineString",
              "Polygon",
              "MultiPolygon",
            ]),
            coordinates: z.array(z.any()),
          }),
          properties: z.any(),
        }),
      ),
    }),
    extensions: ["geojson"],
  });
  it("length", async () => {
    const allData = await geojson.getAll();
    expect(allData.length).toBe(3);
  });
  it("get", async () => {
    const item = await geojson.get("id", "datum1");
    expect(item?.data.type).toBe("FeatureCollection");
  });
});

describe("text", () => {
  const text = defineData({
    contentPath: path.resolve(process.cwd(), testDir, "content/text"),
    format: "raw",
    schema: z.string(),
  });

  it("length", async () => {
    const allData = await text.getAll();
    expect(allData.length).toBe(3);
  });
  it("get", async () => {
    const item = await text.get("id", "hoge_one");
    expect(item?.data.slice(0, 9)).toBe("今年の正月のある晩");
  });
});
