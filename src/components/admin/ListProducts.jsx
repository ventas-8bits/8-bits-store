import React, { useEffect } from 'react';
import { useFireStore } from '../../hooks/useFireStore';

import { Box } from '@chakra-ui/react';
import CardProduct from './CardProduct';
import Loading from '../Loading';

const ListProducts = ({ data = [], onDelete }) => {
  return (
    <Box>
      {data.map((item) => (
        <CardProduct key={item.id} item={item} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default ListProducts;
