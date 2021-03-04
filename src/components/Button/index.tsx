import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TextInputProps} from 'react-native';

import {ButtonContainer} from './styles';

interface ButtonProps extends TextInputProps {}

const Button: React.FC<ButtonProps> = ({...rest}: ButtonProps) => {
  return <ButtonContainer {...rest} />;
};

export default Button;
