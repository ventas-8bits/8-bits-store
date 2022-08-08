import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import ListProducts from '../components/ListProducts';
import SearchList from '../components/searchProduct/SearchList';
import { SearchProduct } from '../components/searchProduct/SearchProduct';
import { useFireStore } from '../hooks/useFireStore';

const SearchPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const { searchData, searchProducts, loading, deleteProduct } = useFireStore();

  useEffect(() => {
    setSearch(searchParams.get('search'));
    const searchFunc = async () => {
      await searchProducts(searchParams.get('search'));
    };
    searchFunc();
    console.log(searchData);
  }, [searchParams]);

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  if (loading.search) {
    return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   setSearch(searchParams.get('search'));
  //   searchProducts(search);
  // }, [search]);

  if (searchData.length <= 0) {
    return <p>There are no results for the search</p>;
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Resultado para: {search}</div>
      {/*https://pro.chakra-ui.com/components/e-commerce/product-grids*/}
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <ListProducts>
          {searchData.map((item) => (
            <CardProduct
              key={item.product_id}
              item={item}
              onDelete={handleDelete}
              loading={loading.delete}
            />
          ))}
        </ListProducts>
      </Box>
    </>
  );
};

export default SearchPage;
