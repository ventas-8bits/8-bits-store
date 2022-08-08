import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FormSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = (values) => {
    // console.log(values);
    // setSearchParams(values);
    // console.log(searchParams.get('search'));
    navigate(`/auth/admin/search?search=${values.search}`);
  };

  return (
    <Box w={{ base: '150px', sm: '100%' }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <FormControl isInvalid={errors.search}>
          <InputGroup>
            <Input
              {...register('search', {
                required: 'Required',
              })}
              background={'white'}
              outline={errors.search && '3px red'}
              color="green.700"
            />
            <InputRightElement children={<MdOutlineSearch color="grey" />} />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};

export default FormSearch;
