import ChatBox from "@/components/miscellaneous/ChatBox";
import MyChats from "@/components/miscellaneous/MyChats";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import { ChatState } from "@/Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
   const {user} = ChatState();
   const navigate = useNavigate();

     useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);



    return (
    <div style={{width:"100%"}}>
    {
        user && <SideDrawer />
    }
    <Box
    display="flex"
    justifyContent='space-between'
    w='100%'
    h="91.5vh"
    p="10px"
    > 
        {user && <MyChats />}
        {user && <ChatBox />}
    </Box>
    </div>
  )
}

export default ChatPage


