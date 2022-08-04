import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogoImg, grassPixel } from '../assets/img/images.js';
import { UserContext } from '../context/userContext.jsx';
// Components
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
} from '@chakra-ui/react';
import FormInput from '../components/FormInput.jsx';

const LoginPage = () => {
  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await loginUser(values.email, values.password);
      navigate('/auth/admin/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

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
                <FormInput
                  type={'text'}
                  label={'Your Email: '}
                  name={'email'}
                  placeholder={'ex: your.mail@mail.com'}
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
                <FormInput
                  type={'password'}
                  label={'Your Password: '}
                  name={'password'}
                  placeholder={''}
                  eyeButton={true}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum length should be 6' },
                  })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
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
