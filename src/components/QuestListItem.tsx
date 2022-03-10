import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  HiCheckCircle,
  HiDotsCircleHorizontal,
  HiExclamationCircle,
  HiPause,
  HiTrash,
} from "react-icons/hi";
import { useQuest } from "../hooks/useQuest";
import { Quest } from "../types/types";

type QuestListItemProps = {
  quest: Quest;
};

export const QuestListItem: React.FC<QuestListItemProps> = ({ quest }) => {
  const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);
  const [loadingDeleteQuest, setLoadingDeleteQuest] = useState(false);

  const isWideVersion = useBreakpointValue({ base: false, md: true });

  const { changeQuestStatus, deleteQuest } = useQuest();

  const cancelDeleteRef = useRef(null);

  const toast = useToast();

  const handleChangeQuestStatus = async (id: string, status: string) => {
    setLoadingChangeStatus(true);

    try {
      await changeQuestStatus(id, status);
      if (status === "completed") {
        toast({
          description: "Missão concluída com sucesso!",
          status: "success",
          variant: "left-accent",
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          description: "Status da missão alterado.",
          status: "info",
          variant: "left-accent",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
        variant: "left-accent",
        isClosable: true,
        position: "top-right",
      });
    }

    setLoadingChangeStatus(false);
    return;
  };

  const handleDeleteQuest = async (id: string) => {
    setLoadingDeleteQuest(true);

    try {
      await deleteQuest(id);
      toast({
        description: "Missão deletada.",
        status: "info",
        variant: "left-accent",
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
        variant: "left-accent",
        isClosable: true,
        position: "top-right",
      });
    }

    setLoadingDeleteQuest(false);
    return;
  };

  return (
    <Skeleton isLoaded={!loadingChangeStatus}>
      <SimpleGrid
        columns={isWideVersion ? 4 : 3}
        templateColumns={
          isWideVersion
            ? "max-content 1fr max-content max-content"
            : "max-content 1fr max-content"
        }
        gap="2"
        alignItems="center"
      >
        <Box>
          {quest.questStatus === "todo" && (
            <Icon
              as={HiExclamationCircle}
              display="block"
              h="6"
              w="6"
              color="yellow.500"
            />
          )}
          {quest.questStatus === "progress" && (
            <Icon
              as={HiDotsCircleHorizontal}
              display="block"
              h="6"
              w="6"
              color="blue.500"
            />
          )}
          {quest.questStatus === "waiting" && (
            <Icon as={HiPause} display="block" h="6" w="6" color="orange.500" />
          )}
          {quest.questStatus === "completed" && (
            <Icon
              as={HiCheckCircle}
              display="block"
              h="6"
              w="6"
              color="green.500"
            />
          )}
        </Box>
        <Box>
          <Text
            fontWeight={quest.questStatus === "progress" ? "bold" : undefined}
            color={quest.questStatus === "completed" ? "gray.400" : undefined}
            as={quest.questStatus === "completed" ? "del" : undefined}
          >
            {quest.title}
          </Text>
        </Box>
        {isWideVersion && (
          <Box>
            <Select
              defaultValue={quest.questStatus}
              size="sm"
              variant="filled"
              w="max"
              ml="auto"
              onChange={(event) =>
                handleChangeQuestStatus(quest.id, event.currentTarget.value)
              }
            >
              <option value="todo">A Fazer</option>
              <option value="waiting">Aguardando</option>
              <option value="progress">Em progresso</option>
              <option value="completed">Concluída</option>
            </Select>
          </Box>
        )}
        <Box>
          <Popover placement="end" initialFocusRef={cancelDeleteRef}>
            {({ onClose }) => {
              return (
                <>
                  <PopoverTrigger>
                    <IconButton
                      color="gray.600"
                      aria-label="quest-actions"
                      icon={<HiTrash />}
                      size="sm"
                      variant="outline"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <Text>Deseja deletar a missão?</Text>
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="end">
                      <ButtonGroup size="sm">
                        <Button onClick={() => onClose()} ref={cancelDeleteRef}>
                          Cancelar
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteQuest(quest.id)}
                          isLoading={loadingDeleteQuest}
                        >
                          Deletar
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </>
              );
            }}
          </Popover>
        </Box>
        {!isWideVersion && (
          <>
            <Box></Box>
            <Box>
              <Select
                defaultValue={quest.questStatus}
                size="sm"
                variant="filled"
                w="max"
                onChange={(event) =>
                  handleChangeQuestStatus(quest.id, event.currentTarget.value)
                }
              >
                <option value="todo">A Fazer</option>
                <option value="waiting">Aguardando</option>
                <option value="progress">Em progresso</option>
                <option value="completed">Concluída</option>
              </Select>
            </Box>
          </>
        )}
      </SimpleGrid>
    </Skeleton>
  );
};
