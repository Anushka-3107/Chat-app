import React, { useState } from "react";
import { VStack, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";

import { PasswordInput } from "@/components/ui/password-input";

import { toaster } from "@/components/ui/toaster";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [img, setImg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const postDetails = (imgs) => {
    setLoading(true);
    if (imgs === undefined) {
      toaster.create({
        title: "Please Select an Image!",
        description: "File saved successfully",
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (imgs.type === "image/jpeg" || imgs.type === "image/png" || imgs.type === "image/jpg") {
      const data = new FormData();
      data.append("file", imgs);
      data.append("upload_preset", "chat-tea-ing");
      data.append("cloud_name", "dtyosspzw");
      fetch("https://api.cloudinary.com/v1_1/dtyosspzw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.url){
            setImg(data.url.toString());
          console.log(data.url.toString());
          }else{
             console.error("Image upload failed:", data);
             toaster.create({
      title: "Image upload failed",
      description: data.error?.message || "Something went wrong during upload.",
      type: "error",
    });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toaster.create({
        title: "Please select an image!",
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async() => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
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

    if(password !== confirmPassword){
       toaster.create({
        title: "Password does not match!",
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try{
      const config = {
        headers:{
          "Content-type" : "application/json",
        },
      };

      const {data} = await axios.post("/api/user" , {name,email,password,img},
        config
      );

       toaster.create({
        title: "Registration successful!",
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
              placeholder="Enter Your Password"
              visible={visible}
              onVisibleChange={setVisible}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root required id="password">
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput
              placeholder="Confirm Your Password"
              visible={visible}
              onVisibleChange={setVisible}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field.Root>
        </Fieldset.Content>

        <Field.Root id="img">
          <Field.Label>Upload Your Picture</Field.Label>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Field.Root>

        <Button
          colorPalette={"pink"}
          rounded={"full"}
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
          onClick={submitHandler}
          loading={loading}
          loadingText="Loading"
        >
          Sign Up
        </Button>
      </Fieldset.Root>
    </VStack>
  );
};

export default Signup;
