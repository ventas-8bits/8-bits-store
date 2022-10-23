import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';

const Loading = () => {
  return (
    <>
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
          my="1rem"
        />
        <Text fontSize="lg" textAlign="center">
          Loading...
        </Text>
      </Box>
    </>
  );
};

export default Loading;
