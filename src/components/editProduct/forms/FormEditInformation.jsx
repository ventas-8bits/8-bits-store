import React from 'react';
import { useForm } from 'react-hook-form';
import { categories, initRef, topics } from '../../../helpers/dataSelect.js';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
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
      <Container>
        <form onSubmit={handleSubmit(onEdit)}>
          <FormControl isInvalid={errors.name} mb={2}>
            <FormInputEdit
              size="sm"
              type={'text'}
              label={'Product Name: '}
              name={'name'}
              defaultValue={product.product_name}
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
              defaultValue={product.product_reference?.slice(0, 3)}
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
              defaultValue={product.product_price}
              {...register('price', {
                required: 'Product price is required',
              })}
            />
            <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.isNew} display="flex" alignItems="center" my="1rem">
            <FormLabel htmlFor="isNew" mb="0">
              Is a new Product?
            </FormLabel>
            <Switch
              id="isNew"
              defaultChecked={product.product_isNew}
              {...register('isNew', { required: false })}
            />
          </FormControl>

          <Box border={'1px'} borderColor="gray.200" p="0.5rem" my="1rem">
            <FormControl isInvalid={errors.isNew} display="flex" alignItems="center" mb="1rem">
              <FormLabel htmlFor="isOnSale" mb="0">
                Is on Sale?
              </FormLabel>
              <Switch
                defaultChecked={product.product_isOnSale}
                id="isOnSale"
                {...register('isOnSale', { required: false })}
              />
            </FormControl>

            <FormControl isInvalid={errors.priceOnSale} mb={2}>
              <FormInputEdit
                size="sm"
                type={'number'}
                label={'Product Price on sale: '}
                name={'priceOnSale'}
                defaultValue={product.product_priceOnSale}
                {...register('priceOnSale', {
                  required: false,
                  validate: {
                    type: (v) => (isNaN(v) ? 'Price should be a number' : true),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.priceOnSale && errors.priceOnSale.message}
              </FormErrorMessage>
            </FormControl>
          </Box>

          <FormControl isInvalid={errors.categories} mb={2}>
            <FormSelectEditMultiple
              multiple={true}
              options={categories}
              name={'categories'}
              label={'Categories:'}
              defaultValue={product.product_categories}
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
              defaultValue={product.product_description}
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
              defaultValue={product.product_topics}
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
      </Container>
    </>
  );
};

export default FormEditInformation;
