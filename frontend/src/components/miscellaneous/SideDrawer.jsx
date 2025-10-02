import {
  Box,
  Button,
  Text,
  Menu,
  Portal,
  CloseButton,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";
import { CiBellOn } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "@/Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";



const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState();
  
  const [open, setOpen] = useState(false);
  const { user , setSelectedChat, chats,setChats} = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async() => {
    if (!search) {
      toaster.create({
        description: "Please Search for the user!",
        type: "warning",
        closable: true,
        placement: 'bottom-end'
      });

      return;
    }

    try {
      setLoading(true);

      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      
       console.log("Search results:", data);

       setTimeout(()=> {
        setLoading(false);
        setSearchResult(data);

        console.log("Rendering results:", searchResult);

      }, 2000);
      
     
    
    } catch (error) {
      setLoading(false);
      toaster.create({
        title:"Error Occurred!",
        description: error.message,
        type: "error",
        duration:5000,
        closable: true,
        placement: 'bottom-end'
      });
    }
  };

  const accessChat = async(userId) => {
   try {
    setLoadingChat(true);

    const config = {
      headers:{
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    }


    const {data} = await axios.post('/api/chat', {userId}, config);

    if(!chats.find((c) => c._id === data._id ))
    {  setChats([data,...chats]);}

    setSelectedChat(data);
    setLoadingChat(false);

   } catch (error) {
    setLoading(false);
      toaster.create({
        title:"Error Occurred while fetching the chat!",
        description: error.message,
        type: "error",
        duration:5000,
        closable: true,
        placement: 'bottom-end'
      });
   } 
  
  };

  return (
    <>
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
          <Button onClick={() => setOpen(true)}>
            <FaSearch />
            <Text textStyle="sm" display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Poppins" color="blackAlpha.900">
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
                    <ProfileModal
                      user={user}
                      isOpen={open}
                      onClose={() => setOpen(false)}
                    >
                      <Menu.Item 
                      value="account" 
                      justifyContent="center" 
                      >
                        Account
                      </Menu.Item>
                    </ProfileModal>
                    <Menu.Item
                      value="logout"
                      justifyContent="center"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Menu.Item>
                  </Box>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Box>

      <Drawer.Root
        placement="start"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        color="white"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px">
                <Drawer.Title>Search Users</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                
                <Box display="flex" pb={2}>
                  <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>

                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) =>(
                    <UserListItem 
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                    />
                  ))
                )}

                {loadingChat && <Spinner ml="auto" size="md" display="flex" />}

              </Drawer.Body>
              {/* <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer> */}
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default SideDrawer;
