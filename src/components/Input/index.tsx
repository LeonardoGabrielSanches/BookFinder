import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TextInputProps} from 'react-native';

import {InputContainer} from './styles';

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = ({...rest}: InputProps) => {
  return <InputContainer {...rest} />;
};

export default Input;
