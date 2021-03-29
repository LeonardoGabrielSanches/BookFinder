import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #374782;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  background-color: #374782;
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled(Icon)`
  margin-bottom: 10px;
`;
