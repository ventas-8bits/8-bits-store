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
} from '@chakra-ui/react';
import ModalComponent from '../components/ModalComponent';
import FormCreate from '../components/admin/FormCreate';
import ListProducts from '../components/admin/ListProducts';
import LoadingCards from '../components/LoadingCards';

const AdminHomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, getProducts, ChangePage, deleteProduct, createNewProduct } =
    useFireStore();
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(values);
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
      <div>AdminHomePage</div>
      <Button onClick={onOpen}>Create Product</Button>
      <ModalComponent isOpen={isOpen} onClose={onClose} title={'Create Product'} buttons={false}>
        <FormCreate
          modalClose={onClose}
          loading={loading.createProduct}
          onCreate={handleCreate}
        ></FormCreate>
      </ModalComponent>
      {loading.createProduct ? (
        <LoadingCards />
      ) : (
        <ListProducts data={data} onDelete={handleDelete} />
      )}


      <Button onClick={ChangePage}>More</Button>
    </>
  );
};

export default AdminHomePage;
