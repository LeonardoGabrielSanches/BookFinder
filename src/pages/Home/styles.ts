import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #374782;
  align-items: center;
  justify-content: center;
`;

export const ContainerTitle = styled.Text`
  font-size: 55px;
  color: #fff;
`;

export const ButtonContainer = styled(Button)`
  margin-top: 10px;
`;
