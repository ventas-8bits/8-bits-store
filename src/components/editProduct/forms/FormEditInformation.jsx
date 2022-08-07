import React from 'react';
import { useForm } from 'react-hook-form';
import { categories, initRef, topics } from '../../../helpers/dataSelect.js';

import { Box, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import FormInputEdit from '../../FormInputEdit';

import FormSelectEditSingle from '../../FormSelectEditSingle.jsx';
import FormSelectEditMultiple from '../../FormSelectEditMultiple.jsx';

const FormEditInformation = ({ onEdit, loading, product }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onEdit)}>
        <FormControl isInvalid={errors.name} mb={2}>
          <FormInputEdit
            size="sm"
            type={'text'}
            label={'Product Name: '}
            name={'name'}
            defaultValue={product.name}
            {...register('name', {
              required: 'Product name is required',
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.reference} mb={2}>
          <FormSelectEditSingle
            multiple={false}
            options={initRef}
            name={'reference'}
            label={'Reference:'}
            defaultValue={product.reference?.slice(0, 3)}
            {...register('reference', {
              required: 'Reference are required',
            })}
          />
          <FormErrorMessage>{errors.reference && errors.reference.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.price} mb={2}>
          <FormInputEdit
            size="sm"
            type={'number'}
            label={'Product Price: '}
            name={'price'}
            defaultValue={product.price}
            {...register('price', {
              required: 'Product price is required',
            })}
          />
          <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.categories} mb={2}>
          <FormSelectEditMultiple
            multiple={true}
            options={categories}
            name={'categories'}
            label={'Categories:'}
            defaultValue={product.categories}
            {...register('categories', {
              required: 'Categories are required',
            })}
          />
          <FormErrorMessage>{errors.categories && errors.categories.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description} mb={2}>
          <FormInputEdit
            size="sm"
            type={'text'}
            label={'Product Description: '}
            defaultValue={product.description}
            name={'description'}
            {...register('description', {
              required: 'Product description is required',
            })}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.topics} mb={2}>
          <FormSelectEditMultiple
            multiple={true}
            options={topics}
            name={'topics'}
            label={'Topics:'}
            defaultValue={product.topics}
            {...register('topics', {
              required: 'Topics are required',
            })}
          />
          <FormErrorMessage>{errors.topics && errors.topics.message}</FormErrorMessage>
        </FormControl>

        <Box mt={4} w={'100%'} display="flex" justifyContent="flex-end" alignItems="center">
          <Button mr={3} type={'submit'} isLoading={loading} colorScheme="blue">
            Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormEditInformation;
