import React, { useState } from "react";
import {
  VStack,
  Button,
  Field,
  Fieldset,
  Input,
  Text
} from "@chakra-ui/react";

import {
  PasswordInput,
} from "@/components/ui/password-input"

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const[visible,setVisible] = useState(false);



  const submitHandler = () => {};

  return (
    <VStack spaceX="5px" spaceY="5px">
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root required id="email">
            <Field.Label>
              Email address
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required id="password">
            <Field.Label>Password</Field.Label>
              <PasswordInput
                placeholder='Enter Your Password'
                visible={visible}
                onVisibleChange={setVisible}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
          </Field.Root>

        </Fieldset.Content>


        <Button 
        colorPalette={'pink'}
        rounded={"full"}
        width='100%'
        style={{marginTop:15}}
        type="submit"
        onClick={submitHandler}
         >
        Login
        </Button>

         <Button 
        colorPalette={'red'}
        variant={'outline'}
        rounded={"full"}
        width='100%'
        style={{marginTop:15}}
        type="submit"
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456");
        }}
         >
        Guest User Credential
        </Button>



      </Fieldset.Root>

      
    </VStack>
  );
};

export default Login;
