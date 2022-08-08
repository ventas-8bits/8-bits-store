import React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

export const SearchProduct = (props) => {
  const { product, rootProps } = props;
  const { product_name, product_url_image, product_price, product_priceOnSale } = product;
  return (
    <Stack
      spacing={useBreakpointValue({
        base: '4',
        md: '5',
      })}
      {...rootProps}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={product_url_image}
            alt={product_name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({
              base: 'md',
              md: 'xl',
            })}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {product_name}
          </Text>
          {/* <PriceTag price={product_price} salePrice={product_priceOnSale} currency="USD" /> */}
        </Stack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue">Add to cart</Button>
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Quick shop
        </Link>
      </Stack>
    </Stack>
  );
};
