import { Box, Button, Text, Menu, Portal } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";
import { CiBellOn } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "@/Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // const [loading, setLoading] = useState(false)
  // const [loadingChat,setLoadingChat] = useState();

  const { user } = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="2px"
    >
      <Tooltip
        content="search users to chat"
        hasArrow
        positioning={{ placement: "bottom-end" }}
      >
        <Button>
          <FaSearch />
          <Text textStyle="sm" display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work Sans" color="blackAlpha.900">
        Chat-tea-ing
      </Text>

      <Box display="flex" alignItems="center" gap={2}>
        <Menu.Root>
          <Menu.Trigger asChild p={1}>
            <Button fontSize="2xl" m={1}>
              <CiBellOn />
            </Button>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="new-txt">New Text File</Menu.Item>
                <Menu.Item value="new-file">New File...</Menu.Item>
                <Menu.Item value="new-win">New Window</Menu.Item>
                <Menu.Item value="open-file">Open File...</Menu.Item>
                <Menu.Item value="export">Export</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger rounded="full" focusRing="outside">
            <Avatar.Root size="md">
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.img} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Box textAlign="center">
                  <ProfileModal user={user}>
                    <Menu.Item value="account" justifyContent="center">
                      Account
                    </Menu.Item>
                  </ProfileModal>
                  <Menu.Item value="logout" justifyContent="center" onClick={logoutHandler}>Logout</Menu.Item>
                </Box>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Box>
  );
};

export default SideDrawer;
