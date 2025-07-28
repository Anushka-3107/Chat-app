import React from 'react'
import {
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  useDialog,
  Text
} from "@chakra-ui/react"


const ProfileModal = ({user}) => {

    const dialog = useDialog()

    return (
        <>
          <Dialog.RootProvider
            value={dialog}
            placement="center"
          >
            <Dialog.Trigger
             asChild 
            textAlign="center"
            >
              <Button size="sm" variant="ghost">
              Account
             </Button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content bg="gray.300" borderRadius="lg" p={6} >
                  <Dialog.Header>
                    <Dialog.Title
                     fontSize="40px"
                     fontFamily="Work sans"
                     textAlign="center"
                     w="100%"
                     color="black"
                     >
                     {user.name}
                     </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body >
                    <Image
                    borderRadius="full"
                    boxSize="110px"
                    src={user.img}
                    alt={user.name}
                    mx="auto"
                    mt={4}
                    mb={2}
                    border="2px solid"
                     borderColor="gray.200"
                     shadow="md"
                     textAlign="center"
                     />
                     <Text
                     fontSize={{base:"20px", md:"2px" }}
                     mt={4}
                     fontFamily="Work sans"

                     textAlign="center"
                     color="black"
                     >
                      Email: {user.email}
                     </Text>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" color="black">Cancel</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" variant="solid" color="black" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.RootProvider>
       



        </>
  )
}

export default ProfileModal


