import styled from 'styled-components/native';

export const LoadingContainer = styled.View`
  flex: 1;
  background-color: #374782;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #374782;
  padding-top: 15px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 20px;
`;

export const ContentContainer = styled.View`
  margin-top: 5px;
  align-items: center;
`;

export const ImageContainer = styled.Image`
  height: 375px;
  width: 500px;
`;

export const TitleContainer = styled.Text`
  margin-top: 10px;
  font-size: 25px;
  color: #fff;
`;

export const SubtitleContainer = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
`;

export const DescriptionContainer = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  color: #fff;
`;

export const PageAndYearContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
`;

export const PagesContainer = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const YearContainer = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-right: 5px;
`;

export const ButtonContainer = styled.View`
  margin-top: 5px;
`;
