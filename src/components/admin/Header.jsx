import React, { useState, useLayoutEffect, useRef, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { MdMenu, MdLogout } from 'react-icons/md';
import FormSearch from '../FormSearch';

const Header = ({ title, sidebarWidth }) => {
  const [size, setSize] = useState(true);
  const { logoutUser } = useContext(UserContext);
  const refSideBar = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 700) {
        setSize(true);
      }
      if (window.innerWidth > 700) {
        setSize(false);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/auth/admin/login', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSideClick = () => {
    refSideBar.current.classList.toggle('show');
  };

  return (
    <>
      <HeaderContainer sidebarWidth={sidebarWidth}>
        <Box display={'flex'} alignItems="center">
          {size && (
            <Icon as={MdMenu} onClick={handleSideClick} w={8} h={8} mr="3" cursor={'pointer'} />
          )}
          <Link to="/auth/admin">
            <Text fontSize={{ base: 'lg', md: '2xl' }}>{title}</Text>
          </Link>
        </Box>
        <Box display={'flex'} alignItems="centers">
          <FormSearch />
          <Icon
            as={MdLogout}
            onClick={handleLogout}
            w={8}
            h={8}
            mx="3"
            cursor={'pointer'}
            _hover={{
              color: 'blue.200',
            }}
          />
        </Box>
      </HeaderContainer>

      <SideBar ref={refSideBar} sidebarWidth={sidebarWidth}>
        sidebar {size && <Button onClick={handleSideClick}>cerrar</Button>}
      </SideBar>
    </>
  );
};

const HeaderContainer = styled.header`
  box-shadow: 2px 2px 5px #ddd;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #2b6cb0;
  justify-content: space-between;
  align-items: center;
  color: #eee;

  @media screen and (min-width: 700px) {
    position: relative;
    width: calc(100% - ${(props) => props.sidebarWidth});
    left: ${(props) => props.sidebarWidth};
  }
`;

const SideBar = styled.nav`
  position: fixed;
  top: 0px;
  left: -1000px;
  min-height: 100vh;
  width: 100%;
  min-height: 100vh;
  background: #eee;
  z-index: 100;
  transition: left 0.5s linear;

  &.show {
    left: 0;
  }

  @media screen and (min-width: 700px) {
    border-right: 1px solid #ccc;
    width: ${(props) => props.sidebarWidth};
    left: 0;
  }
`;

export default Header;
