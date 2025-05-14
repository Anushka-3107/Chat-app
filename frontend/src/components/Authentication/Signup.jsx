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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [img, setImg] = useState();
  const[visible,setVisible] = useState(false);


  const postDetails = (pics) => { };
  const submitHandler = () => {};

  return (
    <VStack spaceX="5px" spaceY="5px">
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root required id="first-name">
            <Field.Label>
              Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(e.target.value);
              }}
            />
          </Field.Root>

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

           <Field.Root required id="password">
            <Field.Label>Confirm Password</Field.Label>
              <PasswordInput
                placeholder='Confirm Your Password'
                visible={visible}
                onVisibleChange={setVisible}
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
              />
          </Field.Root>
        </Fieldset.Content>

        <Field.Root id="img">
            <Field.Label>Upload Your Picture</Field.Label>
              <Input
               type="file"
               p={1.5}
               accept="image/*"
               onChange={
                (e) => postDetails(e.target.files[0])
                }
              />
          </Field.Root>

        <Button 
        colorPalette={'pink'}
        rounded={"full"}
        width='100%'
        style={{marginTop:15}}
        type="submit"
        onClick={submitHandler}
         >
          Sign Up
        </Button>

      </Fieldset.Root>

      
    </VStack>
  );
};

export default Signup;
