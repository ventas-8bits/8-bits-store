import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { LogoImg } from '../assets/img/images';
import styled from 'styled-components/macro';

import { Box, Button, Container, Image } from '@chakra-ui/react';

const ContainerAdminate = styled(Box)`
  width: 100%;
  font-size: 1rem;
  display: block;
  font-family: monospace;
  white-space: nowrap;
  padding-right: 4px;
  border-right: 4px solid;
  //width: 13ch; /*numero de caracteres*/
  width: ${(props) => props.lenght + 1}ch;
  animation: typing 3s steps(${(props) => props.lenght + 1}), blink 0.5s infinite step-end alternate,
    move 10s infinite;
  overflow: hidden;

  @media screen and (min-width: 700px) {
    & {
      font-size: 1.75rem;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }

  @keyframes move {
    0% {
      transform: translate(0, 0);
    }
    16% {
      transform: translate(0%, 25%);
    }
    32% {
      transform: translate(0, 0);
    }
    48% {
      transform: translate(5%, 0%);
    }
    64% {
      transform: translate(5%, 25%);
    }
    82% {
      transform: translate(5%, 0%);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const ButtonShadow = styled.button`
  background-color: transparent;
  font-weight: 600;
  color: #444;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border: 2px solid #eee;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 1s ease;
  box-shadow: 0.5rem 0.5rem 1rem #ccc, -0.5rem -0.5rem 1rem #fff;

  &:hover {
    box-shadow: 0.5rem 0.5rem 1rem #fff, -0.5rem -0.5rem 1rem #ccc;
  }
  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem #fff, inset -0.2rem -0.2rem 1rem #ccc;
  }
`;

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const welcomeMessage = user ? `Welcome ${user.email}` : 'Hello world!!!';
  console.log(user);
  console.log(welcomeMessage.length);

  const handleGoLogin = () => {
    navigate('/auth/admin/login');
  };
  const handleGoAdmin = () => {
    navigate('/auth/admin');
  };

  return (
    <>
      <Box backgroundColor={'blue.50'} minH="100vh">
        <Container>
          <Image src={LogoImg.img} alt={LogoImg.alt} pt="2rem" />
          <Box my={'5rem'} w={'full'} display="flex" justifyContent={'center'}>
            {user ? (
              <>
                <ButtonShadow onClick={handleGoAdmin}>Go to Admin</ButtonShadow>
              </>
            ) : (
              <>
                <ButtonShadow onClick={handleGoLogin}>Go to Login</ButtonShadow>
              </>
            )}
          </Box>
          <Box my="2rem" display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <ContainerAdminate lenght={welcomeMessage.length}>{welcomeMessage}</ContainerAdminate>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
