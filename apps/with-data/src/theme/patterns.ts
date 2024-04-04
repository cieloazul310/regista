import { definePattern } from "@pandacss/dev";

const article = definePattern({
  properties: {
    spacing: { type: "enum", value: ["inherit", "xs", "sm", "md", "lg", "xl"] },
  },
  defaultValues: {
    spacing: "md",
  },
  transform(props) {
    const { spacing, ...rest } = props;
    const my = (() => {
      if (!spacing || spacing === "inherit") return undefined;
      return spacing;
    })();

    return {
      my,
      ...rest,
      _first: {
        mt: 0,
      },
      _last: {
        mb: 0,
      },
    };
  },
});

export default { article };
