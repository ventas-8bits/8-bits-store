import React, { forwardRef } from 'react';
import styled from 'styled-components/macro';
import { FormLabel } from '@chakra-ui/react';

const SelectStyled = styled.select`
  width: 100%;
  padding: 0.3rem;
  border-radius: 5px;
  border: 1px solid #ccc;

  &:focus {
    outline: 2px solid #3182ce;
    border: none;
  }

  &::-webkit-scrollbar {
    --webkit-appearance: none;
  }
  &::-webkit-scrollbar:vertical {
    width: 10px;
  }
  &::-webkit-scrollbar-button:increment,
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;

const OptionStyled = styled.option`
  padding: 0.3rem;
  border-radius: 3px;

  &:target {
    background: red;
  }
`;

const FormSelect = forwardRef(
  ({ multiple = false, options, label, name, onBlur, onChange, children }, ref) => {
    return (
      <>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <SelectStyled
          multiple={multiple}
          options={options}
          id={name}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
        >
          {options.map((item) => (
            <OptionStyled key={item.value} value={item.value}>
              {item.label}
            </OptionStyled>
          ))}
        </SelectStyled>
      </>
    );
  }
);

export default FormSelect;

/**
     <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        isMulti
        options={options}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        defaultValue={[]}
        ref={ref}
      />
    </>
*/
