import { ChatState } from '@/Context/ChatProvider'
import { Box, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { IconButton } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa";
import { getSender , getSenderFullInfo} from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdatedGroupChatModal from '../miscellaneous/UpdateGroupChatModal'
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"
import axios from 'axios';
import { toaster } from '../ui/toaster';
import '../styles.css';
import ScrollableChat from './ScrollableChat';
import {io} from 'socket.io-client';


const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {

    const[messages,setMessages] = useState([]);
    const[newMessage,setNewMessage] = useState([]);
    const[loading,setLoading] = useState(false);
    const[socketConnected,setSocketConnected] = useState(false);

    const {user,selectedChat, setSelectedChat} = ChatState();

    const fetchMessages = async() => {
      if(!selectedChat || !selectedChat._id) return;

      try {
         const config = {
          headers : {
            Authorization: `Bearer ${user.token}`
          },
         };

         setLoading(true);

         const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);
         console.log(messages,"fetching chat data")
         setMessages(data);
         setLoading(false);

         socket.emit('join chat', selectedChat._id)

      } catch (error) {
        console.error("Fetch messages error:", error);
        toaster.create({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      }
    }

    
    useEffect(()=> {
     socket= io(ENDPOINT);
     socket.emit("setup", user);
     socket.on('connection', ()=> setSocketConnected(true));
    },[]);

    useEffect(()=> {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
      socket.on("message received", (newMessageReceived) => {

        if( !selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
          //give notification
        }

        else{
          setMessages([...messages,newMessageReceived]);
        }
 
      });
    });

    const sendMessage = async(event) => {
      if(event.key === "Enter" && newMessage ){
        try {
         const config = {
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${user.token}`
          },
         };
         
         setNewMessage("");
         const {data} = await axios.post("/api/message",
            {
            content:newMessage,
            chatId:selectedChat._id
            }, 
            config);

            console.log(data,"data typed")

            socket.emit('new message',data);
            setMessages([...messages,data]);

            

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
      }
    };



    const typingHandler = (e) => {
      setNewMessage(e.target.value);

      //typing indicator logic
    };
  
    return (
    <>
    {selectedChat ? (
    <>
    <Box
    fontSize={{base:"28px", md:"30px"}}
    pb={3}
    px={2}
    w="100%"
    fontFamily="Poppins"
    display="flex"
    justifyContent={{base: "space-between"}}
    alignItems="center"
    >
      <IconButton 
      display={{base:"flex", md:"none"}}
      onClick={()=>setSelectedChat("")}
      color= "red.400"
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
            <UpdatedGroupChatModal 
            fetchAgain={fetchAgain} 
            setFetchAgain={setFetchAgain}
            fetchMessages={fetchMessages}
            />
            </>
        )} 
    </Box>
    <Box
    display='flex'
    flexDirection="column"
    justifyContent='flex-end'
    p={3}
    bg="#ffffffff"
    w="100%"
    h="100%"
    borderRadius="lg"
    overflowY="hidden"
   
    >
    
    {loading ? (<Spinner m="auto" size="xl" w={20} h={20} alignSelf="center"/>)
    :
    (<Box
    flex="1"
    overflowY="auto"
    mb={2}
    px={2}
    py={1}
    borderRadius="md"
    bg="gray.50"
    boxShadow="sm"
    >
        {/* messages */}
        <Box className='messages'>
            <ScrollableChat messages={messages} />
        </Box>
    </Box>
    )}

  <Box 
  mt="auto"
  borderRadius="md"
  p={2}
  boxShadow="sm"
  display="flex"
  alignItems="center"
  gap={2}
  >
    <Fieldset.Root onKeyDown={sendMessage} _required mt={3}>
      <Fieldset.Content>
        <Field.Root>
          <Input 
          bg="gray.100"
          borderColor="white"
          placeholder='Enter a message..'
          onChange={typingHandler}
          borderRadius="md"
          _focus={{bg:"white", borderColor:"blue.400"}}
          value={newMessage}
        />
        </Field.Root>
  </Fieldset.Content>
 </Fieldset.Root>
 </Box>
    </Box>
    </>
    ) : (
        <Box 
        display={'flex'}
        alignItems="center"
        justifyContent="center"
        h="100%"
        >
        <Text fontSize="3xl" pb={3} fontFamily="Poppins"
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