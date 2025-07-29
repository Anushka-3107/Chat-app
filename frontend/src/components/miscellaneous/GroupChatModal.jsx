import { ChatState } from "@/Context/ChatProvider";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Field,
  Fieldset,
  NativeSelect,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { toaster } from "../ui/toaster";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      
      toaster.create({
        title: "Error Occurred!",
        description: error.message,
        type: "error",
        duration: 5000,
        closable: true,
        placement: "bottom-end",
      });
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <Dialog.Root placement="center">
        <Dialog.Trigger asChild textAlign="center">
          <Button>{children}</Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg="white"
              borderRadius="lg"
              p={6}
              alignItems="center"
            >
              <Dialog.Header>
                <Dialog.Title
                  fontSize="30px"
                  fontFamily="Work sans"
                  display="flex"
                  color="black"
                >
                  Create Group Chat
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body display="flex" flexDir="column" alignItems="center">
                <Fieldset.Root size="lg" maxW="md" color="black">
                  <Fieldset.Content>
                    <Field.Root>
                      <Input
                        placeholder="chat name"
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Input
                        placeholder="Add Users"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
                {/* {selected users} */}
                {/* render searched users */}
                             {loading ? (<Spinner size="sm" />) : (
                                searchResult?.slice(0,4).map(user => (
                                    <UserListItem 
                                     key={user._id}
                                      user={user} 
                                      handleFunction={()=> handleGroup(user)} />
                                ))
                             )}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    color="black"
                    _hover={{ color: "white" }}
                    onClick={handleSubmit}
                  >
                    Create Chat
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" variant="solid" color="black" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default GroupChatModal;
