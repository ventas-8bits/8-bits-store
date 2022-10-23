import React, { forwardRef, useState, useRef } from 'react';
import { Box, Button, FormLabel, Image, InputGroup } from '@chakra-ui/react';
import styled from 'styled-components/macro';

const InputFile = forwardRef(
  ({ accept, multiple, onChange, onBlur, name, label, children }, ref) => {
    const [img, setImg] = useState('');
    const refInput = useRef(null);

    const handleChange = async (e) => {
      await onChange(e);
      const file = e.target.files[0];
      const src = URL.createObjectURL(file);
      setImg(src);
    };

    const handleDelete = (e) => {
      const $input = document.querySelector(`[name=${name}]`);
      $input.value = '';
      setImg('');
    };

    return (
      <>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <InputGroup>
          <input
            type="file"
            multiple={multiple || false}
            accept={accept}
            id={name}
            name={name}
            onBlur={onBlur}
            onChange={handleChange}
            ref={ref}
          />
        </InputGroup>
        {img && (
          <Box position="relative" width="fit-content">
            <Image
              src={img}
              alt={'New Image'}
              boxSize="60px"
              marginTop={'0.5rem'}
              borderRadius={'5px'}
            />
            <BtnDeleteImg onClick={handleDelete}>⨯</BtnDeleteImg>
          </Box>
        )}
      </>
    );
  }
);

export default InputFile;

const BtnDeleteImg = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff90;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ffffff;
  }
`;
