import {
  Avatar,
  Box,
  DarkMode,
  Divider,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MdPowerSettingsNew } from "react-icons/md";
import { ConfirmationSignOutModal } from "./ConfirmationSignOutModal";

export const Aside: React.FC = () => {
  const session = useSession();
  const user = session.data?.user;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSignOut = () => {
    onOpen();
  };

  return (
    <Box as="aside" minW="xs" bg="gray.800" color="gray.50" p="4">
      {user && (
        <Flex>
          <Avatar
            name={user.name as string}
            src={user.image as string}
            mr="4"
          />
          <Box mt="auto">
            <Text color="gray.400" fontSize="sm">
              Olá,
            </Text>
            <Text fontSize="lg">{user.name}!</Text>
          </Box>
          <DarkMode>
            <Tooltip label="Sair" placement="bottom" hasArrow>
              <IconButton
                aria-label="singOut"
                ml="auto"
                icon={<MdPowerSettingsNew />}
                color="red.400"
                size="sm"
                fontSize="md"
                onClick={() => handleSignOut()}
              />
            </Tooltip>
          </DarkMode>
        </Flex>
      )}
      <Divider borderColor="gray.600" mt="6" mb="4" />
      <ConfirmationSignOutModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
