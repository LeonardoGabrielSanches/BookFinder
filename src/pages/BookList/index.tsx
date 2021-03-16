import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import BookListItem from '../../components/BookListItem';

import api from '../../services/api';

import {Container, IconContainer} from './styles';

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

  const [bookList, setBookList] = useState<BookListState>({} as BookListState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParamValue = params.searchValue;

    api.get(`search/${searchParamValue}`).then((response) => {
      setBookList({
        books: response.data.books,
        totalElements: response.data.total,
      });
    });
  }, [params.searchValue]);

  const handleLoadBooks = useCallback(async () => {
    if (bookList.totalElements === bookList.books.length) {
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

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
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
        renderItem={({item: book}) => <BookListItem book={book} />}
        onEndReached={handleLoadBooks}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#fff" /> : <></>
        }
      />
    </Container>
  );
};

export default BookList;
