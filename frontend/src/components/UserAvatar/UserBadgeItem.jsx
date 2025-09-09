import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    background="green.300"
    cursor="pointer"
    onClick={handleFunction}
    color="black"
    >
    <Box 
     display="flex"
    justifyContent="center"
    alignItems="center"
   
    >
     {user.name}
    <IoMdClose />
    </Box>

   
    </Box>
  )
}

export default UserBadgeItem