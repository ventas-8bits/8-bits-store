import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';

const BtnLogout = ({ handleClick }) => {
  return (
    <Box
      as={'section'}
      display={'flex'}
      alignItems="center"
      cursor={'pointer'}
      onClick={handleClick}
      position={'absolute'}
      bottom={0}
      _hover={{
        color: 'blue.200',
      }}
    >
      <Icon as={MdLogout} w={5} h={5} mx="1" />
      <Text as={'span'}>Logout</Text>
    </Box>
  );
};

export default BtnLogout;
