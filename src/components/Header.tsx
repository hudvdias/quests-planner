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

export const Header: React.FC = () => {
  const session = useSession();
  const user = session.data?.user;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSignOut = () => {
    onOpen();
  };

  return (
    <Box as="header" bg="gray.800" color="gray.50" p="4">
      {user && (
        <Flex align="center">
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
      <ConfirmationSignOutModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
