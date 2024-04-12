import { Flex } from "styled-system/jsx";
// import { Loading as Loader } from "@/components";

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
