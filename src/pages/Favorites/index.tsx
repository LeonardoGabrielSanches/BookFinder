import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import BookListItem from '../../components/BookListItem';

import {Container, LoadingContainer, IconContainer} from './styles';

export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  image: string;
}

interface BookList {
  books: IBook[];
}

const Favorites: React.FC = () => {
  const navigation = useNavigation();

  const [bookList, setBookList] = useState<BookList>({
    books: [],
  } as BookList);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getUserFromDB = useCallback(async () => {
    const usersCollection = firestore().collection('users');

    const email = auth().currentUser?.email;

    const user = await usersCollection.where('email', '==', email).get();

    return user.docs[0].id;
  }, []);

  const getFavorites = useCallback(async () => {
    const id = await getUserFromDB();

    const favoritesCollection = firestore().collection(
      'users/' + id + '/favorites',
    );

    favoritesCollection.get().then((subCollectionSnapshot) => {
      if (subCollectionSnapshot.empty) {
        Alert.alert('Sorry', 'You dont have favorites yet.', [
          {text: 'Go back', onPress: handleGoBack},
        ]);
        return;
      }

      let favorites = [] as IBook[];

      subCollectionSnapshot.forEach((subDoc) => {
        favorites.push(subDoc.data() as IBook);
      });

      setBookList({books: favorites});
    });
  }, [getUserFromDB, handleGoBack]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [getFavorites]),
  );

  return (
    <>
      {bookList.books?.length <= 0 ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      ) : (
        <Container>
          <IconContainer
            name="left"
            size={20}
            color="#fff"
            onPress={handleGoBack}
          />
          <FlatList
            data={bookList.books}
            keyExtractor={(book) => book.isbn13}
            renderItem={({item}) => <BookListItem book={item} />}
          />
        </Container>
      )}
    </>
  );
};

export default Favorites;
