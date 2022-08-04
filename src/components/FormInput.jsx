import React, { forwardRef, useState } from 'react';
import { Button, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormInput = forwardRef(
  (
    {
      size,
      type,
      placeholder,
      onChange,
      onBlur,
      name,
      label,
      autocomplete = 'off',
      eyeButton = false,
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
      <>
        {eyeButton ? (
          <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup>
              <Input
                size={size || 'md'}
                type={show ? 'text' : 'password'}
                id={name}
                name={name}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autocomplete}
                pr="4.5rem"
                bg="white"
              />
              <InputRightElement mr="0.5rem">
                <Button
                  leftIcon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                ></Button>
              </InputRightElement>
            </InputGroup>
          </>
        ) : (
          <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
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
        )}
      </>
    );
  }
);

export default FormInput;
