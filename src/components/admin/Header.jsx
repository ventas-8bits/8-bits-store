import React, { useState, useLayoutEffect, useRef, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Box, Icon, Text } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import FormSearch from '../FormSearch';
import { SidebarElements } from '../SidebarElements';
import { globalColors } from '../../helpers/styles';

const Header = ({ title, sidebarWidth }) => {
  const [size, setSize] = useState(true);
  const refSideBar = useRef(null);
  const { logoutUser } = useContext(UserContext);
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
      <HeaderContainer sidebarWidth={sidebarWidth} heigthSize={size}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={{ base: '0.5rem', md: '0' }}
          w={{ base: '100%', md: 'auto' }}
        >
          {size && (
            <Icon
              as={MdMenu}
              onClick={handleSideClick}
              w={8}
              h={8}
              mr="3"
              cursor={'pointer'}
            />
          )}
          <Link to="/auth/admin">
            <Text fontSize={{ base: 'xl', md: '2xl' }}>{title}</Text>
          </Link>
        </Box>
        <Box display={'flex'} alignItems="centers">
          <FormSearch />
        </Box>
      </HeaderContainer>

      <SideBarContainer ref={refSideBar} sidebarWidth={sidebarWidth}>
        <SideBar>
          <SidebarElements
            size={size}
            handleSideClick={handleSideClick}
            handleLogout={handleLogout}
          />
        </SideBar>
      </SideBarContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  box-shadow: 2px 2px 5px #ddd;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: ${(props) => (props.heigthSize ? 'auto' : '60px')};
  display: flex;
  flex-direction: column;
  background-color: ${() => globalColors.mainColor};
  justify-content: space-between;
  align-items: center;
  color: #eee;

  @media screen and (min-width: 700px) {
    /* position: relative; */
    /* height: 60px; */
    width: calc(100% - ${(props) => props.sidebarWidth});
    flex-direction: row;
    left: ${(props) => props.sidebarWidth};
  }
`;

const SideBarContainer = styled.div`
  background-color: #00000050;
  position: fixed;
  top: 0px;
  left: -1000px;
  opacity: 0;
  min-height: 100vh;
  width: 100%;
  min-height: 100vh;
  z-index: 100;
  transition: opacity 0.2s ease-in-out;

  &.show {
    left: 0;
    opacity: 1;
  }
  &.show > nav {
    left: 0;
  }
  @media screen and (min-width: 700px) {
    background-color: #ffffff50;
    border-right: 1px solid #ccc;
    width: ${(props) => props.sidebarWidth};
    left: 0;
    opacity: 1;
  }
`;

const SideBar = styled.nav`
  position: relative;
  backdrop-filter: blur(5px);
  background: #fefefeee;
  height: 100vh;
  width: 80%;
  left: -1000px;
  transition: left 0.5s linear;

  @media screen and (min-width: 700px) {
    transition: none;
    backdrop-filter: blur(0px);
    background: #fefefe;
    width: ${(props) => props.sidebarWidth};
    left: 0;
    width: 100%;
  }
`;

export default Header;
