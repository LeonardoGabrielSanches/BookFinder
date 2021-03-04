import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import api from '../../services/api';

import {Text} from 'react-native';

interface RouteParams {
  searchValue: string;
}

interface IBooks {
  title: string;
  subtitle: string;
  isbn13: string;
  image: string;
}

const BookList: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams;

  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<IBooks>([] as IBooks);

  useEffect(() => {
    const searchParamValue = params.searchValue;

    api.get(`search/${searchParamValue}&page=${page}`).then((response) => {
      console.log(response.data.books);
      setPage((state) => state + 1);
    });
  }, [params.searchValue, page]);

  return <Text>Book List</Text>;
};

export default BookList;
