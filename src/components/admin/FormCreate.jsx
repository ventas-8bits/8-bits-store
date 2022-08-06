import React from 'react';
import { useForm } from 'react-hook-form';
import { categories, initRef, topics } from '../../helpers/dataSelect.js';
import { useFireStore } from '../../hooks/useFireStore.js';

import { Box, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect.jsx';
import InputFile from '../InputFile';

const FormCreate = ({ onCreate, modalClose, loading }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { createNewProduct } = useFireStore();

  const onSubmit = async (values) => {
    try {
      await createNewProduct(values);
      modalClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onCreate)}>
        <FormControl isInvalid={errors.image} mb={2}>
          <InputFile
            name="image"
            accept={'image/png,image/jpeg,image/svg+xml'}
            multiple={false}
            label={'Product Image'}
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

        <FormControl isInvalid={errors.name} mb={2}>
          <FormInput
            size="sm"
            type={'text'}
            label={'Product Name: '}
            name={'name'}
            {...register('name', {
              required: 'Product name is required',
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.reference} mb={2}>
          <FormSelect
            multiple={false}
            options={initRef}
            name={'reference'}
            label={'Reference:'}
            {...register('reference', {
              required: 'Reference are required',
            })}
          />
          <FormErrorMessage>{errors.reference && errors.reference.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.price} mb={2}>
          <FormInput
            size="sm"
            type={'number'}
            label={'Product Price: '}
            name={'price'}
            {...register('price', {
              required: 'Product price is required',
            })}
          />
          <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.categories} mb={2}>
          <FormSelect
            multiple={true}
            options={categories}
            name={'categories'}
            label={'Categories:'}
            {...register('categories', {
              required: 'Categories are required',
            })}
          />
          <FormErrorMessage>{errors.categories && errors.categories.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description} mb={2}>
          <FormInput
            size="sm"
            type={'text'}
            label={'Product Description: '}
            name={'description'}
            {...register('description', {
              required: 'Product description is required',
            })}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.topics} mb={2}>
          <FormSelect
            multiple={true}
            options={topics}
            name={'topics'}
            label={'Topics:'}
            {...register('topics', {
              required: 'Topics are required',
            })}
          />
          <FormErrorMessage>{errors.topics && errors.topics.message}</FormErrorMessage>
        </FormControl>

        <Box mt={4} w={'100%'} display="flex" justifyContent="flex-end" alignItems="center">
          <Button mr={3} onClick={modalClose} colorScheme="red">
            Close
          </Button>
          <Button mr={3} type={'submit'} isLoading={loading} colorScheme="blue">
            Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormCreate;
