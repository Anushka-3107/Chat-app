import { ChatState } from '@/Context/ChatProvider'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toaster } from '../ui/toaster';
import { BiBox } from 'react-icons/bi';
import { Box, Button, Stack,Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { getSender } from '../../../config/ChatLogics';

const MyChats = () => {
  const [loggedUser,setLoggedUser] =useState();
  const {selectedChat, setSelectedChat, user,chats, setChats} = ChatState();
  
  const fetchChats = async() => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const {data} = await axios.get("/api/chat", config);
      console.log('chat data', data);
      setChats(data);
      console.log('setchats', data);
    } catch (error) {
       toaster.create({
              title:"Error Occured!",
              description: error.message,
              type: "error",
              duration:5000,
              closable: true,
              placement: 'bottom-end'
            });
    }
  }


  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [])
  
  return (
    <Box 
    display={{base: selectedChat ? "none" : "flex" , md: "flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%", md:"31%"}}
    borderWidth="lg"
    borderRadius="1px"
    >
      <Box
      pb={3}
      px={3}
      fontSize={{base:"28px", md:"30px"}}
      fontFamily="work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
      My chats
      <Button
      display="flex"
      fontSize={{base: "17px" , md: "10px", lg:"17px"}}
      background="red.400"
      >
        New Group Chats
        <FaPlus 
          color='white'
        />
      </Button>
      </Box>


      <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
      >
      {
        chats ? (
          <Stack overflowY="scroll">
          {
            chats.map((chat) => (
              <Box
              onClick={()=>setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white": "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
              >
              <Text>
                {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
              </Text>
              </Box>
            ))
          }
          </Stack>
        ): (
          <ChatLoading />
        )
      }
      </Box>
    </Box>
  )
}

export default MyChats