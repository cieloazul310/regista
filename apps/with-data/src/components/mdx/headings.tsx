import { article } from "styled-system/patterns";
import { Heading } from "../ui/heading";

type HeadingTag = `h${1 | 2 | 3 | 4 | 5}`;

export default function createHeadings(): Record<HeadingTag, React.FC<any>> {
  return {
    h1: (props) => (
      <Heading
        className={article({ spacing: "inherit" })}
        as="h1"
        fontSize={["xl", "2xl", "3xl"]}
        mt="xl"
        mb="md"
        {...props}
      />
    ),
    h2: (props) => (
      <Heading
        className={article({ spacing: "inherit" })}
        as="h2"
        fontSize={["xl", "2xl"]}
        mt="lg"
        mb="md"
        {...props}
      />
    ),
    h3: (props) => (
      <Heading
        className={article()}
        as="h3"
        fontSize={["lg", "lg", "xl"]}
        mt="lg"
        mb="md"
        {...props}
      />
    ),
    h4: (props) => (
      <Heading
        className={article()}
        as="h4"
        mt="lg"
        mb="sm"
        fontSize={["md", "lg", "xl"]}
        {...props}
      />
    ),
    h5: (props) => (
      <Heading
        className={article()}
        as="h5"
        mt="sm"
        mb="sm"
        fontSize={["md", "md", "lg"]}
        {...props}
      />
    ),
  };
}
