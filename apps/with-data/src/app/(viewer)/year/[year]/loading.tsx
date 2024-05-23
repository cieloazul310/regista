import { Flex } from "styled-system/jsx";

export default function Loading() {
  return (
    <Flex
      height="calc(90vh - var(--sizes-header-height))"
      alignItems="center"
      justifyContent="center"
    >
      <p>Loading...</p>
    </Flex>
  );
}
