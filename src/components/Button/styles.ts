import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

export const ButtonContainer = styled(RectButton)`
  background-color: #d46a08;
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
