import React, { useEffect, useState } from 'react';
import { useFireStore } from '../hooks/useFireStore';

import {
  Button,
  useDisclosure,
  Stack,
  Skeleton,
  Flex,
  Avatar,
  Text,
  Badge,
  Box,
  Heading,
} from '@chakra-ui/react';
import ModalComponent from '../components/ModalComponent';
import FormCreate from '../components/admin/FormCreate';
import ListProducts from '../components/ListProducts';
import LoadingCards from '../components/LoadingCards';
import CardProduct from '../components/CardProduct';

const AdminHomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, getProducts, ChangePage, deleteProduct, createNewProduct } =
    useFireStore();

  useEffect(() => {
    const getAll = async () => {
      await getProducts();
    };
    getAll();
  }, []);

  if (loading.getData) {
    return <p>Loading...</p>;
  }

  const changeUserPage = () => {
    ChangePage();
    console.log(loading.createProd);
  };

  const handleCreate = async (values) => {
    try {
      // console.log(values);
      await createNewProduct(values);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading as={'h2'} size={'xl'} mb="1.5rem">
        Welcome !!!
      </Heading>
      <Button onClick={onOpen}>Create Product</Button>
      <ModalComponent isOpen={isOpen} onClose={onClose} title={'Create Product'} buttons={false}>
        <FormCreate
          modalClose={onClose}
          loading={loading.createProduct}
          onCreate={handleCreate}
        ></FormCreate>
      </ModalComponent>

      {data.length <= 0 ? (
        <p>No hay productos</p>
      ) : loading.createProduct ? (
        <LoadingCards />
      ) : (
        <ListProducts>
          {data.map((item) => (
            <CardProduct
              key={item.product_id}
              item={item}
              onDelete={handleDelete}
              loading={loading.delete}
            />
          ))}
        </ListProducts>
      )}

      <Button onClick={ChangePage} isLoading={loading.getChange}>
        More
      </Button>
    </>
  );
};

export default AdminHomePage;
