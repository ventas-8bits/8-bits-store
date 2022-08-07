import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Avatar, Text, Badge, Box, useDisclosure, Image } from '@chakra-ui/react';
import ModalComponent from '../ModalComponent';

const CardProduct = ({ item = {}, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('edit:', item.id);
    navigate(`/auth/admin/edit?q=${item.id}`);
  };

  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={`Do you want delete "${item.name}" ?`}
        actionButton={(e) => onDelete(item.id)}
        actionButtonLabel={'Delete'}
        actionButtonColor={'red'}
      >
        <Image borderRadius="full" boxSize="150px" src={item.url_image} alt={item.name} />
      </ModalComponent>

      <Box
        key={item.reference}
        display="flex"
        my={5}
        p={'1rem'}
        border="1px"
        borderColor="gray.200"
      >
        <Avatar src={item.url_image} />
        <Box ml="3">
          <Text fontWeight="bold">
            {item.name}
            <Badge ml="1" colorScheme="green">
              $ {item.price}Col
            </Badge>
          </Text>
          <Text fontSize="sm">{item.reference}</Text>
        </Box>
        <Box
          display={'flex'}
          flexDirection={['column', 'row']}
          justifyContent={['space-around', 'flex-end']}
          alignItems={['flex-end', 'center']}
          className="botones"
          width={'80%'}
        >
          <Button colorScheme={'blue'} w={'5rem'} onClick={handleEdit}>
            Edit
          </Button>
          <Button colorScheme={'red'} w={'5rem'} m={['0.2rem 0', '0 0.5rem']} onClick={onOpen}>
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CardProduct;
