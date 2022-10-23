import React from 'react';
import { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Box, Button, Link } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';
import { RiUser3Fill } from 'react-icons/ri';
import { globalColors } from '../helpers/styles';
import { UserContext } from '../context/userContext';

import AvatarComponent from './AvatarComponent';
import BtnLogout from './BtnLogout';

export const SidebarElements = ({ size, handleSideClick, handleLogout }) => {
  const { user } = useContext(UserContext);

  const linksElements = [
    { id: 'link-home', to: '/auth/admin', element: <MdHome />, label: 'Home' },
    {
      id: 'link-profile',
      to: `/auth/admin/profile/${user.uid}`,
      element: <RiUser3Fill />,
      label: 'Profile',
    },
  ];

  return (
    <Box position={'relative'} height={'90vh'} margin={'auto auto'}>
      <AvatarComponent windowSize={size} handleClick={handleSideClick} />
      {linksElements.map((link) => (
        <ElementContainer key={link.id}>
          <Link as={RouterLink} to={link.to}>
            <Button
              leftIcon={link.element || null}
              w="100%"
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
            >
              {link.label}
            </Button>
          </Link>
        </ElementContainer>
      ))}
      <BtnLogout handleClick={handleLogout} />
    </Box>
  );
};

const ElementContainer = styled.div`
  color: ${() => globalColors.mainTextColor};
  padding: 0.2rem 0.5rem;
  position: relative;
  cursor: pointer;
  max-height: 46px;
  transition: background-color 0.1s linear, border-radius 0.2s ease-in-out;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 46px;
    right: 0;
    position: absolute;
    background-color: transparent;
    pointer-events: none;
    margin: 0;
  }
  &::after {
    bottom: -100%;
  }
  &::before {
    top: -100%;
  }
  &:hover {
    background-color: ${() => globalColors.mainColor};
    border-radius: 20px 0 0 20px;
  }
  &:hover * {
    color: ${() => globalColors.mainTextColorHover};
    text-decoration: none;
  }
  &:hover::before,
  &:hover::after {
    background-color: transparent;
    transition: background-color 0.3s linear;
  }
  &:hover::before {
    border-radius: 0 0 15px 0;
    box-shadow: 0.5px 10px 0 ${() => globalColors.mainColor};
    transition: box-shadow 0.2s linear, border-radius 0.4s linear;
  }
  &:hover::after {
    border-radius: 0 15px 0 0;
    box-shadow: 0.5px -10px 0 ${() => globalColors.mainColor};
    transition: box-shadow 0.2s linear, border-radius 0.4s linear;
  }
`;
