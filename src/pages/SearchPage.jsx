import { Box, Text } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import ListProducts from '../components/ListProducts';
import LoadingCards from '../components/LoadingCards';
import { useFireStore } from '../hooks/useFireStore';

const SearchPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const { deleteProduct } = useFireStore();

  const ALGOLIA_APP_ID = '6CT9204G5H';
  const ALGOLIA_SEARCH_ID = '2548e30b69b4c1182a844385a677a9d6';
  const ALGOLIA_INDEX = '8-bits-store-search';

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ID);
  const index = client.initIndex(ALGOLIA_INDEX);

  useEffect(() => {
    const search = searchParams.get('search');
    const searchFunc = async () => {
      try {
        setSearchResults([]);
        setLoading(true);
        const { hits, query } = await index.search(search);
        setSearchResults(hits);
        setQuery(query);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    searchFunc();
  }, [searchParams, query]);

  if (loading && searchResults.length <= 0) {
    return <LoadingCards />;
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
      {searchResults.length <= 0 ? (
        <>
          <Text
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign={'center'}
            mt="1rem"
          >
            😥😥😥😥
          </Text>
          <Text fontSize={{ base: '2xl', md: '4xl' }}>
            There are no results for the search: "{query}"
          </Text>
        </>
      ) : (
        <>
          <Text fontSize={'xl'}>
            {searchResults.length} search result(s) related to: "{query}"
          </Text>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <ListProducts>
              {searchResults.map((item) => (
                <CardProduct
                  key={item.objectID}
                  item={item}
                  onDelete={handleDelete}
                  loading={loading.delete}
                />
              ))}
            </ListProducts>
          </Box>
        </>
      )}
    </>
  );
};

export default SearchPage;
