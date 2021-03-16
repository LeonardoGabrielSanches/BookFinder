import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #565d79;
  margin-bottom: 10px;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 30px;
  flex-direction: row;
`;

export const ImageContainer = styled.Image`
  width: 90px;
  height: 110px;
`;

export const TextContainer = styled.View`
  width: 210px;
  align-content: space-between;
`;

export const TitleContainer = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const SubTitleContainer = styled.Text`
  font-size: 12px;
  color: #fff;
`;
