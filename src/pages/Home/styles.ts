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

export const ButtonContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
`;
