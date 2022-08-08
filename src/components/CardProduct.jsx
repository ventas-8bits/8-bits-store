import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Avatar, Text, Badge, Box, useDisclosure, Image } from '@chakra-ui/react';
import ModalComponent from './ModalComponent';

const CardProduct = ({ item = {}, onDelete, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleEdit = () => {
    // console.log('edit:', item.product_id);
    navigate(`/auth/admin/edit?q=${item.product_id}`);
  };

  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={`Do you want delete "${item.product_name}" ?`}
        actionButton={(e) => onDelete(item.product_id)}
        actionButtonLabel={'Delete'}
        actionButtonColor={'red'}
      >
        <Image
          borderRadius="full"
          boxSize="150px"
          src={item.product_url_image}
          alt={item.product_name}
        />
      </ModalComponent>

      <Box
        key={item.product_reference}
        display="flex"
        my={5}
        p={'1rem'}
        border="1px"
        borderColor="gray.200"
      >
        <Avatar src={item.product_url_image} />
        <Box ml="3">
          <Text fontWeight="bold">
            {item.product_name}
            <Badge ml="1" colorScheme="green">
              $ {item.product_price}Col
            </Badge>
            {item.product_isNew && (
              <Badge ml="1" colorScheme="purple">
                NEW✨✨
              </Badge>
            )}

            {item.product_isOnSale && (
              <Badge ml="1" colorScheme="pink">
                On Sale💥💥
              </Badge>
            )}
          </Text>
          <Text fontSize="sm">{item.product_reference}</Text>
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
          <Button
            colorScheme={'red'}
            w={'5rem'}
            m={['0.2rem 0', '0 0.5rem']}
            onClick={onOpen}
            loading={loading}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CardProduct;
