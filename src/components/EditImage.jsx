import React, { useRef } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';

import FormEditImage from './FormEditImage';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

const EditImage = ({ src, alt, loading, onEdit, isAvatar = false }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <>
      <Container mb="2rem" display="flex" justifyContent={'center'}>
        <Box position="relative" width={isAvatar ? 'auto' : '220px'}>
          {isAvatar ? (
            <Avatar src={src} size="2xl" name={alt} />
          ) : (
            <Image
              src={src}
              boxSize="200px"
              height={'auto'}
              alt={alt}
              borderRadius={'lg'}
            />
          )}
          <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="auto"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                color="blue.50"
                background={'blackAlpha.600'}
                position={'absolute'}
                bottom="-10px"
                right="0"
                size="md"
                icon={<MdOutlinePhotoCamera />}
                _hover={{
                  background: 'blackAlpha.900',
                }}
              />
            </PopoverTrigger>
            <PopoverContent p={5}>
              <PopoverArrow />
              <PopoverCloseButton />
              <FormEditImage
                firstFieldRef={firstFieldRef}
                modalClose={onClose}
                onEdit={onEdit}
                loading={loading}
              />
            </PopoverContent>
          </Popover>
        </Box>
      </Container>
    </>
  );
};

export default EditImage;
