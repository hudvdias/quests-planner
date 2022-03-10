import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { Aside } from "./Aside";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      h="100vh"
      w="100vw"
      bg="gray.200"
      direction={isWideVersion ? "row" : "column"}
    >
      {isWideVersion ? <Aside /> : <Header />}
      <Box as="main" w="full" overflowY="auto">
        {children}
      </Box>
    </Flex>
  );
};
