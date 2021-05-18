import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RectButtonProperties} from 'react-native-gesture-handler';

import {ButtonContainer, TitleContainer} from './styles';

interface ButtonProps extends RectButtonProperties {
  title: string;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  disable = false,
  ...rest
}: ButtonProps) => (
  <ButtonContainer disable={disable} enabled={!disable} {...rest}>
    <TitleContainer>{title}</TitleContainer>
  </ButtonContainer>
);

export default Button;
