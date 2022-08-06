import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';
const LoadingCards = () => {
  return (
    <>
      <Stack my="5" p={'1rem'} border="1px" borderColor="gray.200">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      <Stack my="5" p={'1rem'} border="1px" borderColor="gray.200">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      <Stack my="5" p={'1rem'} border="1px" borderColor="gray.200">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </>
  );
};

export default LoadingCards;
