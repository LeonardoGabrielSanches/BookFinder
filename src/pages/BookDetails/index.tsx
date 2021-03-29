import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import StarRating from '../../components/StarRating';
import api from '../../services/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {IBook} from '../BookList';

import {
  Container,
  ContentContainer,
  ImageContainer,
  TitleContainer,
  SubtitleContainer,
  DescriptionContainer,
  PageAndYearContainer,
  PagesContainer,
  YearContainer,
  RatingContainer,
  RatingText,
  ButtonContainer,
  LoadingContainer,
} from './styles';

interface IRouteParams {
  isbn13: string;
}

interface IBookDetails extends IBook {
  pages: string;
  year: string;
  rating: string;
  desc: string;
  url: string;
}

const BookDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [bookDetails, setBookDetails] = useState<IBookDetails>(
    {} as IBookDetails,
  );

  const {isbn13} = route.params as IRouteParams;

  useEffect(() => {
    api
      .get(`books/${isbn13}`)
      .then((response) => setBookDetails(response.data));
  }, [isbn13]);

  const handlePressKnowMore = useCallback(async () => {
    const url = bookDetails.url;

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    }
  }, [bookDetails.url]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      {!bookDetails ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      ) : (
        <Container>
          <Icon name="left" size={19} color={'#fff'} onPress={handleGoBack} />
          <ContentContainer>
            <ImageContainer
              source={{
                uri: bookDetails.image,
              }}
            />
            <TitleContainer>{bookDetails.title}</TitleContainer>
            <SubtitleContainer>{bookDetails.subtitle}</SubtitleContainer>
            <DescriptionContainer>{bookDetails.desc}</DescriptionContainer>
          </ContentContainer>
          <PageAndYearContainer>
            <PagesContainer>{`Pages: ${bookDetails.pages}`}</PagesContainer>
            <YearContainer>{`Year: ${bookDetails.year}`}</YearContainer>
            <RatingContainer>
              <RatingText>Rating:</RatingText>
              <StarRating stars={+bookDetails.rating} totalStars={5} />
            </RatingContainer>
          </PageAndYearContainer>
          <ButtonContainer>
            <Button title="Know more and buy" onPress={handlePressKnowMore} />
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};

export default BookDetails;
