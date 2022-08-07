import { Box, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputFile from '../../InputFile';

const FormEditImage = ({ loading, modalClose, onEdit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onEdit)}>
      <FormControl isInvalid={errors.image}>
        <InputFile
          name="image"
          accept={'image/png,image/jpeg,image/svg+xml'}
          multiple={false}
          label="Edit Image"
          {...register('image', {
            required: 'Image is required',
            validate: {
              size: (v) => (v[0]?.size > 1024 * 1024 ? 'Less 1mb' : true),
              type: (v) =>
                v[0].type === 'image/png' ||
                v[0].type === 'image/jpeg' ||
                v[0].type === 'image/svg+xml'
                  ? true
                  : 'Image .png, .jpeg, .jpg',
            },
          })}
        />
        <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
      </FormControl>
      <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
      <Box mt={4} w={'100%'} display="flex" justifyContent="flex-end" alignItems="center">
        <Button mr={3} onClick={modalClose} colorScheme="red">
          Cancel
        </Button>
        <Button mr={3} type={'submit'} isLoading={loading} colorScheme="blue">
          Edit
        </Button>
      </Box>
    </form>
  );
};

export default FormEditImage;
