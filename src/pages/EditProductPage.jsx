import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFireStore } from '../hooks/useFireStore';

import EditImage from '../components/editProduct/EditImage';
import FormEditInformation from '../components/editProduct/forms/FormEditInformation';
import { Heading, useToast } from '@chakra-ui/react';

const EditProductPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { product, getOneProduct, loading, editImage, editInformation } = useFireStore();
  let q = searchParams.get('q');
  const toast = useToast();

  useEffect(() => {
    const getProd = async (id) => {
      await getOneProduct(id);
    };
    getProd(q);
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (loading.getOne) {
    return <p>Loading...</p>;
  }

  const editProductImage = async (values) => {
    try {
      // console.log(values);
      await editImage(values.image, product.id);
      toast({
        title: 'Updated photo',
        description: '🥳 Photo updated successfully 🥳',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      // console.log(error.message);
      toast({
        title: 'ERROR',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const editProductInformation = async (values) => {
    try {
      await editInformation(product.id, values);
      toast({
        title: 'Updated information',
        description: '🥳 The information was updated successfully 🥳',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'ERROR',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Heading as={'h4'} size={'xl'} textAlign="center" mb="2rem">
        Edit "{product.name}"
      </Heading>
      <EditImage
        src={product?.url_image}
        alt={product.name}
        id={product.id}
        onEdit={editProductImage}
        loading={loading.editImage}
      />
      <FormEditInformation
        onEdit={editProductInformation}
        loading={loading.editInfo}
        product={product}
      />
    </>
  );
};

export default EditProductPage;
