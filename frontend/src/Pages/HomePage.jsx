import Login from '@/components/Authentication/Login'
import Signup from '@/components/Authentication/Signup'
import { Box, Container,Tabs,Link,Text, TabsList } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();
  
      useEffect(()=> {
          const user = JSON.parse(localStorage.getItem("userInfo"));
          if(user){
              navigate("/chats");
          }
      }, [navigate]);

  return (
    <Container maxW='xl' centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 20px 0"
      borderRadius="xl"
      borderWidth='1px'
      borderColor={"white"}
      >
        <Text
        fontSize='4xl'
        fontFamily='poppins'
        color='black'
        textAlign='center'
        >Chat-tea-ing</Text>
      </Box>

      <Box 
      bg='white'
      w="100%"
      p={4}
      borderRadius="lg"
      borderWidth='1px'
      color='black'
      >

      <Tabs.Root defaultValue="members">
      <Tabs.List bg="bg.muted" rounded="l3" p="1" mb="1em">
        <Tabs.Trigger value="login" width="50%">
          Login
        </Tabs.Trigger>
        <Tabs.Trigger value="signup" width="50%">
          Signup
        </Tabs.Trigger>
        
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <Tabs.Content value="login">
         <Login />
      </Tabs.Content>
      <Tabs.Content value="signup">
         <Signup />
      </Tabs.Content>
      
    </Tabs.Root>
      
      </Box>
    </Container>
  )
}

export default HomePage