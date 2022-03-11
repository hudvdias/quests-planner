import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CreateQuestModal } from "../../components/CreateQuestModal";
import { Layout } from "../../components/Layout";
import { QuestListItem } from "../../components/QuestListItem";
import { useQuest } from "../../hooks/useQuest";

const Dashboard: NextPage = () => {
  const [loading, setLoading] = useState(true);

  const { quests, getUserQuests } = useQuest();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getUserQuests()
      .then(() => setLoading(false))
      .catch((error) => {
        toast({
          title: "Erro ao carregar missões.",
          description: error.message,
          status: "error",
          variant: "left-accent",
          isClosable: true,
          position: "top-right",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateQuest = () => {
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Missões | Planner</title>
      </Head>
      <Layout>
        <Container maxW="container.md">
          <Flex align="end" my="8" as="header">
            <Heading>Missões</Heading>
            {!loading && quests.length > 0 && (
              <Button
                colorScheme="blue"
                fontSize="sm"
                ml="auto"
                onClick={() => handleCreateQuest()}
              >
                Nova missão
              </Button>
            )}
          </Flex>
          {loading ? (
            <Center flexDirection="column">
              <CircularProgress
                isIndeterminate
                color="blue.500"
                mb="4"
                capIsRound
              />
              <Text>Carregando missões...</Text>
            </Center>
          ) : (
            <>
              {quests.length > 0 ? (
                <Box bg="gray.50" borderRadius="lg" shadow="md" p="4">
                  <Stack divider={<StackDivider />} spacing="4">
                    {quests.map((quest) => {
                      return <QuestListItem quest={quest} key={quest.id} />;
                    })}
                  </Stack>
                </Box>
              ) : (
                <Center flexDirection="column">
                  <Image
                    src="/images/undraw_adventure_map_hnin.svg"
                    alt="no data"
                    boxSize="300px"
                  />
                  <Text>Você ainda não tem nenhuma missão...</Text>
                  <Button
                    onClick={() => handleCreateQuest()}
                    colorScheme="blue"
                    mt="4"
                  >
                    Criar missão
                  </Button>
                </Center>
              )}
            </>
          )}
        </Container>
        <CreateQuestModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </>
  );
};

export default Dashboard;
