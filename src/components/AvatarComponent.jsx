import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/react';

const AvatarComponent = ({ handleClick, windowSize }) => {
  const { user } = useContext(UserContext);
  const { displayName, photoURL, email } = user;

  return (
    <>
      <Box
        as={'section'}
        display={'flex'}
        alignItems="center"
        justifyContent={'space-between'}
        marginBottom={['0.5rem', '0.2rem']}
        padding={'0 0.2rem'}
        height="60px"
        boxSizing="border-box"
      >
        <Box display={'flex'} alignItems="center" w="100%">
          <Avatar
            src={photoURL}
            name={displayName || email}
            size={['md', 'sm']}
          />
          <Text
            fontSize={['1.2rem', '0.8rem']}
            noOfLines={1}
            margin={['0 0.5rem', '0 0.2rem']}
          >
            {displayName || email}
          </Text>
        </Box>
        {windowSize && (
          <Box onClick={handleClick} cursor="pointer">
            <Button backgroundColor={'transparent'}>✖</Button>
          </Box>
        )}
      </Box>
      <Divider borderColor={'#999'} />
    </>
  );
};

export default AvatarComponent;
