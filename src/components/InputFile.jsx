import React, { forwardRef } from 'react';
import { FormLabel, InputGroup } from '@chakra-ui/react';

const InputFile = forwardRef(
  ({ accept, multiple, onChange, onBlur, name, label, children }, ref) => {
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
            onChange={onChange}
            ref={ref}
          />
        </InputGroup>
      </>
    );
  }
);

export default InputFile;
