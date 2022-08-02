import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
} from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { LogoImg, grassPixel } from '../assets/img/images.js';

const LoginPage = () => {
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleClick = () => setShow(!show);

  return (
    <>
      <Box bg="blue.200" minHeight={'100vh'}>
        <Container>
          <Box display="flex" flexDir={'column'} justifyContent="center">
            <Image
              src={LogoImg.img}
              alt={LogoImg.alt}
              boxSize={'150px'}
              objectFit="scale-down"
              borderRadius="full"
              border="2px"
              borderColor="yellow.400"
              bg="yellow.200"
              m={'1rem auto'}
            />
            <Heading as="h2" mb={10}>
              LOGIN
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Your Email: </FormLabel>
                <Input
                  bg="white"
                  id="email"
                  placeholder="Ex: your.mail@mail.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email format 🙁',
                    },
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password} size="md">
                <FormLabel htmlFor="password">Your Password: </FormLabel>
                <InputGroup>
                  <Input
                    bg="white"
                    id="password"
                    type={show ? 'text' : 'password'}
                    pr="4.5rem"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum length should be 6' },
                    })}
                  />
                  <InputRightElement mr="0.5rem">
                    <Button
                      leftIcon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                    ></Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <Button
                // leftIcon={<AiFillEye />}
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Container>
        <Image
          src={grassPixel.img}
          alt={grassPixel.alt}
          position="fixed"
          bottom={'0px'}
          height={'10rem'}
          width={'100%'}
          objectFit="fill"
        />
      </Box>
    </>
  );
};

export default LoginPage;
