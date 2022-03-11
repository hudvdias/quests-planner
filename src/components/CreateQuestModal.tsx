import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useQuest } from "../hooks/useQuest";

type CreateQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateQuestModal: React.FC<CreateQuestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createQuest } = useQuest();

  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!title) {
      setTitleError(true);
      return;
    }

    try {
      await createQuest(title);
      toast({
        description: "Nova missão adicionada.",
        status: "success",
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
        variant: "left-accent",
        position: "top-right",
      });
    }

    handleClose();
    setLoading(false);
  };

  const handleClose = () => {
    setTitle("");
    setTitleError(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleClose()}>
      <ModalOverlay />
      <ModalContent as="form">
        <ModalHeader>
          <ModalCloseButton />
          <Text>Nova missão</Text>
        </ModalHeader>
        <ModalBody>
          <FormControl isRequired isInvalid={titleError}>
            <FormLabel>Título</FormLabel>
            <Input
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
            <FormErrorMessage>
              <FormErrorIcon />
              <Text>O título da missão é obrigatório.</Text>
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            onClick={(event) => handleSubmit(event)}
            isDisabled={title ? false : true}
            isLoading={loading}
          >
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
