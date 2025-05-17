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

import axios from "axios";


import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[visible,setVisible] = useState(false);
  const[loading,setLoading] = useState(false);

  const navigate = useNavigate();

   const submitHandler = async() => {
    setLoading(true);
    if(!email || !password ){
       toaster.create({
        title: "Please fill all the Fields!",
        type: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try{
      const config = {
        headers:{
          "Content-type" : "application/json",
        },
      };

      const {data} = await axios.post("/api/user/login" , {email,password},
        config
      );

       toaster.create({
        title: "Login successful!",
        type: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);

      navigate('/chats')

    }catch(error){
       toaster.create({
        title: error.response.data.message,
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

  };

  

  return (
    <VStack spacing="5px">
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
        loading={loading}
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
