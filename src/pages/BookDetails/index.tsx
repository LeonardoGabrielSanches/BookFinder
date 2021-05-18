import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  HeaderContainer,
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

  const [isFavorite, setIsFavorite] = useState(false);

  const {isbn13} = route.params as IRouteParams;

  const getUserFromDB = useCallback(async () => {
    const usersCollection = firestore().collection('users');

    const email = auth().currentUser?.email;

    const user = await usersCollection.where('email', '==', email).get();

    return user.docs[0].id;
  }, []);

  const favoriteBookIfNeed = useCallback(async () => {
    const id = await getUserFromDB();

    const favoritesCollection = firestore().collection(
      'users/' + id + '/favorites',
    );

    const isFavoriteBook = !(
      await favoritesCollection.where('isbn13', '==', isbn13).get()
    ).empty;

    setIsFavorite(isFavoriteBook);
  }, [getUserFromDB, isbn13]);

  useEffect(() => {
    api
      .get(`books/${isbn13}`)
      .then((response) => setBookDetails(response.data));
    favoriteBookIfNeed();
  }, [isbn13, favoriteBookIfNeed]);

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

  const handleFavoriteBook = useCallback(async () => {
    const id = await getUserFromDB();

    const favoritesCollection = firestore().collection(
      'users/' + id + '/favorites',
    );

    favoritesCollection.get().then((subCollectionSnapshot) => {
      let docId = '';

      subCollectionSnapshot.forEach((subDoc) => {
        if (subDoc.data().isbn13 === bookDetails.isbn13) {
          docId = subDoc.id;
        }
      });

      if (!docId) {
        favoritesCollection.add({
          title: bookDetails.title,
          subtitle: bookDetails.subtitle,
          isbn13: bookDetails.isbn13,
          image: bookDetails.image,
        });

        setIsFavorite(true);
      } else {
        favoritesCollection.doc(docId).delete();

        setIsFavorite(false);
      }
    });
  }, [bookDetails, getUserFromDB]);

  return (
    <>
      {!bookDetails ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      ) : (
        <Container>
          <HeaderContainer>
            <Icon name="left" size={19} color={'#fff'} onPress={handleGoBack} />
            <Icon
              name={isFavorite ? 'star' : 'staro'}
              size={25}
              color={'#d46a08'}
              onPress={handleFavoriteBook}
            />
          </HeaderContainer>
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
