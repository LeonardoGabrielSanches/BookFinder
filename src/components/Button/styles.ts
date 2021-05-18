import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

interface ButtonContainerProps {
  disable: boolean;
}

export const ButtonContainer = styled(RectButton)<ButtonContainerProps>`
  background-color: ${(props) => (!props.disable ? '#d46a08' : '#9e510b')};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 20px;
`;

export const TitleContainer = styled.Text`
  line-height: 22px;
  font-size: 20px;
  color: #fff;
`;
