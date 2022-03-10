import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <Head>
        <title>Login | Quests Planner</title>
      </Head>
      <Flex
        h="100vh"
        w="100vw"
        direction={isWideVersion ? "row" : "column-reverse"}
      >
        <Center
          w="full"
          h="full"
          bg="gray.200"
          alignItems={isWideVersion ? "center" : "start"}
        >
          <Box
            bg="gray.50"
            p="6"
            borderRadius="md"
            shadow="md"
            marginTop={isWideVersion ? undefined : "-20"}
            zIndex="docked"
          >
            <Text fontWeight="bold" mb="4">
              Login
            </Text>
            <Button
              fontSize="sm"
              colorScheme="red"
              onClick={() => handleSignIn()}
            >
              Entrar com uma conta do Google
            </Button>
          </Box>
        </Center>
        <Center w="full" h="full" bg="gray.800" flexDir="column">
          <Heading color="gray.50">Quests Planner</Heading>
          <Text color="gray.400" fontWeight="bold">
            Planeje as missões da vida real.
          </Text>
        </Center>
      </Flex>
    </>
  );
};

export default Home;
