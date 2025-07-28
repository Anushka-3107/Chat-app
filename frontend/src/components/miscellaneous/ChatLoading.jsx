import {Box,Skeleton,Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack spacing={4}>
    {
        Array.from({length:6}).map((i) => (
            <Box key={i} padding="6" boxShadow="lg" bg="white" borderRadius="md">
            <Skeleton height="20px" mb="4"/>
            <Skeleton height="10px" width="80%"/>
            </Box>
        ))
    }
    </Stack>
  )
}

export default ChatLoading


