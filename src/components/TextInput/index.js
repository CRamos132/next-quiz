import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextInput = styled.input`
    width: 100%;
    font-family: 'Lato',sans-serif;
    padding: 12px;
    border-radius: 16px;
    border: none;
    font-size: 14px;
    margin-bottom: 25px;
    outline: none;
`;

const Input = ({ onChange, placeholder, ...props }) => (
  <div>
    <TextInput
      placeholder={placeholder}
      onChange={onChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </div>
);

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Input;
