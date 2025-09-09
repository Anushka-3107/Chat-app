import { ChatState } from '@/Context/ChatProvider'
import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import { IconButton } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa";
import { getSender , getSenderFullInfo} from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdatedGroupChatModal from '../miscellaneous/UpdateGroupChatModal'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
  
    const {user,selectedChat, setSelectedChat} = ChatState();
  
  
    return (
    <>
    {selectedChat ? (
    <>
    <Text
    fontSize={{base:"28px", md:"30px"}}
    pb={3}
    px={2}
    w="100%"
    fontFamily="Work sans"
    display="flex"
    justifyContent={{base: "space-between"}}
    alignItems="center"
    >
      <IconButton 
      display={{base:"flex", md:"none"}}
      onClick={()=>setSelectedChat("")}
      color= "red.500"
      >
      <FaArrowLeft />
      </IconButton>


    {
        !selectedChat.isGroupChat ? (
            <>
                {getSender(user,selectedChat.users)}
                <ProfileModal 
                user={getSenderFullInfo(user,selectedChat.users)} />
            </>
        ): (
            <>
            {selectedChat.chatName.toUpperCase()}
            <UpdatedGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
            />
            </>
        )} 
    </Text>
    <Box
    display='flex'
    justifyContent='flex-end'
    p={3}
    bg="#E8E8E8"
    w="100%"
    h="100%"
    borderRadius="lg"
    overflowY="hidden"
    >
    {/* messages here */}
    </Box>
    </>
    ) : (
        <Box 
        display={'flex'}
        alignItems="center"
        justifyContent="center"
        h="100%"
        >
        <Text fontSize="3xl" pb={3} fontFamily="work sans"
        color="black"
        >
            Click on a user to start chatting
        </Text>
        </Box>
    )} 
    </>
  )
}

export default SingleChat