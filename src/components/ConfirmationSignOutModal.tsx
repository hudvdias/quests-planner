import {
  Button,
  HStack,
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
import { signOut } from "next-auth/react";

type ConfirmationSignOutModal = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmationSignOutModal: React.FC<ConfirmationSignOutModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    toast({
      description: "Conta desconectada.",
      status: "success",
      variant: "left-accent",
      position: "top-right",
      isClosable: true,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleClose()}>
      <ModalOverlay />
      <ModalContent as="form">
        <ModalHeader>
          <ModalCloseButton size="sm" />
          <Text>Sair</Text>
        </ModalHeader>
        <ModalBody>
          <Text>Tem certeza que deseja sair da conta?</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={() => handleClose()}>Cancelar</Button>
            <Button onClick={() => handleSignOut()} colorScheme="red">
              Sair
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
