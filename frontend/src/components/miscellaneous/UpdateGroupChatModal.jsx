import { Box, IconButton, Spinner } from "@chakra-ui/react";
import { GrFormView } from "react-icons/gr";
import React, { useState } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ChatState } from "@/Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { Field, Fieldset, Input } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../ui/toaster";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain,fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  console.log("SelectedChat:", selectedChat);
  console.log("Renaming chat with ID:", selectedChat?._id);

  const handleRemove = async(user1) => {
    if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
      toaster.create({
        title: "Only Admins can remove someone!",
        description: "error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const {data} = await axios.put('/api/chat/groupremove', {
        chatId:selectedChat._id,
        userId: user1._id,
      }, config);

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);

    } catch (error) {
      toaster.create({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }


  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      console.log("Renaming chat:", selectedChat._id, "New name:", groupChatName);

      console.log("User Token:", user.token);
      
      const { data } = await axios.put(
         "http://localhost:5000/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log("Rename response data:", data);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);

    } catch (error) {
      console.error("Rename error:", error);
      toaster.create({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async(query) => {
    setSearch(query);
    if(!query){
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        }
      };

      const {data} = await axios.get(`/api/user?search=${search}`,config)
      console.log(data);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toaster.create({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

  };

  const handleAddUser = async(user1) => {
    if(selectedChat.users.find((u) => u._id === user1._id)){
      toaster.create({
        title: "User Already exists in group!",
        description: "error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if(selectedChat.groupAdmin._id === user._id){
      toaster.create({
        title: "Only Admins can add someone!",
        description: "error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }


    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const {data} = await axios.put('/api/chat/groupadd', {
        chatId:selectedChat._id,
        userId: user1._id,
      }, config);

      console.log(data);

      setSelectedChat(data);
      setFetchAgain(fetchAgain);
      setLoading(false);

    } catch (error) {
      toaster.create({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }

  };



  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <IconButton variant="solid" size="lg" bg="gray.200">
            <GrFormView />
          </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header
                fontSize="35px"
                fontFamily="Poppins"
                display=" flex"
                justifyContent="center"
              >
                <Dialog.Title>
                  {selectedChat?.chatName || "No Chat Selected"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                  {selectedChat.users.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleRemove(u)}
                    />
                  ))}
                </Box>

                <Fieldset.Root size="lg" maxW="md">
                  <Fieldset.Content>
                    <Field.Root>
                      <Box display="flex" alignItems="flex-end" gap={2} mb={3}>
                        <Input
                          name="chat name"
                          placeholder="chat name"
                          value={groupChatName}
                          onChange={(e) => setGroupChatName(e.target.value)}
                        />

                        <Button
                          variant="solid"
                          bg="blue.400"
                          color="white"
                          ml={1}
                          _hover={{ bg: "blue.300" }}
                          loading={renameLoading}
                          onClick={handleRename}
                        >
                          Update
                        </Button>
                      </Box>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                <Fieldset.Root>
                  <Fieldset.Content>
                    <Field.Root>
                      <Input
                        name="add users to group"
                        placeholder="add users to group "
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                {
                  loading? (
                    <Spinner size="lg" />
                  ):(
                    searchResult?.map((user) => (
                      <UserListItem 
                        key={user._id}
                        user={user}
                        handleFunction={()=>handleAddUser(user)}
                      />
                    ))
                  )}

              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="solid"
                    bg="red"
                    color="white"
                    _hover={{ bg: "red.400" }}
                    onClick={() => handleRemove(user)}
                  >
                    Leave Group
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default UpdateGroupChatModal;
