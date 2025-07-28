import { ChatState } from '@/Context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react'

const UserListItem = ({user,handleFunction}) => {

    return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="#E8E8E8"
    _hover={{
        background: "#38B2AC",
        color:"white",
    }}
    w="100%"
    display="flex"
    alignItems="center"
    color="black"
    px={3}
    py={3}
    mb={4}
    borderRadius="xl"
    >

     <Avatar.Root
       mr={2}
       size="sm" 
       cursor="pointer"
       >
      <Avatar.Fallback name={user.name} />
      <Avatar.Image src={user.img} />
    </Avatar.Root>

    
    <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
            <b>Email:</b>
            {user.email}
        </Text>
    </Box> 

    </Box>
    
  )
}

export default UserListItem