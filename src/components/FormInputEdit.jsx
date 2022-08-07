import React, { forwardRef } from 'react';

import { FormLabel, Input } from '@chakra-ui/react';

const FormInputEdit = forwardRef(
  (
    { size, type, placeholder, onChange, onBlur, name, label, autocomplete = 'off', defaultValue },
    ref
  ) => {
    return (
      <>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input
          defaultValue={defaultValue}
          size={size || 'md'}
          type={type}
          bg="white"
          id={name}
          name={name}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autocomplete}
        />
      </>
    );
  }
);

export default FormInputEdit;
