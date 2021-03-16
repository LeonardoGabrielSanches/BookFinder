import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RectButtonProperties} from 'react-native-gesture-handler';

import {ButtonContainer, TitleContainer} from './styles';

interface ButtonProps extends RectButtonProperties {
  title: string;
}

const Button: React.FC<ButtonProps> = ({title, ...rest}: ButtonProps) => (
  <ButtonContainer {...rest}>
    <TitleContainer>{title}</TitleContainer>
  </ButtonContainer>
);

export default Button;
