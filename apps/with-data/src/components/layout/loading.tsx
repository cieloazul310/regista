import { Flex, Circle } from "styled-system/jsx";

export default function Loading() {
  return (
    <Flex
      width="full"
      height="full"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
    >
      <Circle size={24} bg="accent.10" />
    </Flex>
  );
}
