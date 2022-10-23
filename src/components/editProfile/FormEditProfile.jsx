import React from 'react';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FormInputEdit from '../FormInputEdit';

const FormEditProfile = ({ onEdit, loading, item }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <Container>
      <form onSubmit={handleSubmit(onEdit)}>
        <FormControl isInvalid={errors.displayName} mb={2}>
          <FormInputEdit
            size="sm"
            type={'text'}
            label={'Name: '}
            name={'displayName'}
            defaultValue={item?.displayName || ''}
            {...register('displayName', {
              required: 'Name is required',
            })}
          />
          <FormErrorMessage>
            {errors.displayName && errors.displayName.message}
          </FormErrorMessage>
        </FormControl>
        <Box
          mt={4}
          w={'100%'}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button mr={3} type={'submit'} isLoading={loading} colorScheme="blue">
            Edit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormEditProfile;
