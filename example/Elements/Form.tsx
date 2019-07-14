import React, { ComponentType, HTMLProps, useCallback } from 'react';

type FormProps = HTMLProps<HTMLFormElement>;
const Form: ComponentType<FormProps> = ({ onSubmit, ...rest }) => {
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit!(e);
    },
    [onSubmit]
  );
  return <form {...rest} onSubmit={handleSubmit} />;
};

Form.defaultProps = {
  onSubmit() {},
};

export default Form;
