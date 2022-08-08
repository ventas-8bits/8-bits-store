import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories, initRef, topics } from '../../helpers/dataSelect.js';

import { Box, Button, FormControl, FormErrorMessage, FormLabel, Switch } from '@chakra-ui/react';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect.jsx';
import InputFile from '../InputFile';

const FormCreate = ({ onCreate, modalClose, loading }) => {
  const [sale, setSale] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {}, []);

  return (
    <>
      {sale && 'sale'}
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
              validate: {
                type: (v) => (isNaN(v) ? 'Price should be a number' : true),
              },
            })}
          />
          <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.isNew} display="flex" alignItems="center" my="1rem">
          <FormLabel htmlFor="isNew" mb="0">
            Is a new Product?
          </FormLabel>
          <Switch id="isNew" {...register('isNew', { required: false })} />
        </FormControl>

        <Box border={'1px'} borderColor="gray.200" p="0.5rem" my="1rem">
          <FormControl isInvalid={errors.isNew} display="flex" alignItems="center" mb="1rem">
            <FormLabel htmlFor="isOnSale" mb="0">
              Is on Sale?
            </FormLabel>
            <Switch id="isOnSale" {...register('isOnSale', { required: false })} />
          </FormControl>

          <FormControl isInvalid={errors.priceOnSale} mb={2}>
            <FormInput
              size="sm"
              type={'number'}
              label={'Product Price on sale: '}
              name={'priceOnSale'}
              {...register('priceOnSale', {
                required: false,
                validate: {
                  type: (v) => (isNaN(v) ? 'Price should be a number' : true),
                },
              })}
            />
            <FormErrorMessage>{errors.priceOnSale && errors.priceOnSale.message}</FormErrorMessage>
          </FormControl>
        </Box>

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
