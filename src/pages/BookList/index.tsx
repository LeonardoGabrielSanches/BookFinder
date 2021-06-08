import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import BookListItem from '../../components/BookListItem';

import api from '../../services/api';

import {Container, LoadingContainer, IconContainer} from './styles';

interface RouteParams {
  searchValue: string;
}

export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  image: string;
}

interface BookListState {
  books: IBook[];
  totalElements: number;
}

const BookList: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [page, setPage] = useState(1);

  const [bookList, setBookList] = useState<BookListState>({
    books: [],
    totalElements: 0,
  } as BookListState);

  const [loading, setLoading] = useState(false);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const searchParamValue = params.searchValue;

    api.get(`search/${searchParamValue}`).then((response) => {
      if (response.data.books.length <= 0) {
        Alert.alert(
          'Sorry',
          'This technology this does not exists on our database.',
          [{text: 'Go back', onPress: handleGoBack}],
        );
        return;
      }

      setBookList({
        books: response.data.books,
        totalElements: response.data.total,
      });
    });
  }, [handleGoBack, params.searchValue]);

  const handleLoadBooks = useCallback(async () => {
    if (bookList.totalElements === bookList.books.length && page !== 0) {
      return;
    }

    const searchParamValue = params.searchValue;
    const newPage = page + 1;
    setPage((state) => state + 1);

    setLoading(true);

    const response = await api.get(
      `search/${searchParamValue}&page=${newPage}`,
    );

    if (response.data.books.length > 0) {
      setBookList({
        ...bookList,
        books: [...bookList.books, ...response.data.books],
      });
    }

    setLoading(false);
  }, [params.searchValue, page, bookList]);

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
            onEndReached={handleLoadBooks}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" color="#fff" /> : <></>
            }
          />
        </Container>
      )}
    </>
  );
};

export default BookList;
