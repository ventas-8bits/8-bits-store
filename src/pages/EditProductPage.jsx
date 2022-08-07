import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFireStore } from '../hooks/useFireStore';

import EditImage from '../components/editProduct/EditImage';
import FormEditInformation from '../components/editProduct/forms/FormEditInformation';

const EditProductPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { product, getOneProduct, loading, editImage } = useFireStore();
  let q = searchParams.get('q');

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
      console.log(values);
      await editImage(values.image, product.id);
    } catch (error) {
      console.log(error);
    }
  };

  const editProductInformation = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>EditProductPage</div>
      <EditImage
        src={product?.url_image}
        alt={product.name}
        id={product.id}
        onEdit={editProductImage}
        loading={loading.editImage}
      />
      <FormEditInformation
        onEdit={editProductInformation}
        loading={loading.getOne}
        product={product}
      />
    </>
  );
};

export default EditProductPage;
