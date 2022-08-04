import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { categories, topics } from '../../helpers/dataSelect.js';

import FormInput from '../FormInput';
import FormSelect from '../FormSelect.jsx';
import InputFile from '../InputFile';

const FormCreate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button mt={4} type={'submit'} isLoading={isSubmitting} colorScheme="blue">
          Add
        </Button>
      </form>
    </>
  );
};

export default FormCreate;
