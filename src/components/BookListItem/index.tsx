import React, {useCallback, useMemo} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {IBook} from '../../pages/BookList';

import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  ImageContainer,
  TitleContainer,
  TextContainer,
  SubTitleContainer,
} from './styles';
import {useNavigation} from '@react-navigation/core';

interface IBookListItemProps {
  book: IBook;
}

const BookListItem: React.FC<IBookListItemProps> = ({
  book,
}: IBookListItemProps) => {
  const navigation = useNavigation();

  const formattedSubTitle = useMemo(() => {
    let croppedSubTitle = book.subtitle;

    if (book.subtitle.length > 100) {
      croppedSubTitle = book.subtitle.substring(0, 80);

      croppedSubTitle += '...';
    }

    return croppedSubTitle;
  }, [book]);

  const handleNavigate = useCallback(() => {
    navigation.navigate('BookDetails', {isbn13: book.isbn13});
  }, [book.isbn13, navigation]);

  return (
    <Container onPress={handleNavigate}>
      <ImageContainer
        source={{
          uri: book.image,
        }}
      />
      <TextContainer>
        <TitleContainer>{book.title}</TitleContainer>
        <SubTitleContainer>{formattedSubTitle}</SubTitleContainer>
      </TextContainer>
      <Icon name="right" size={19} color={'#fff'} onPress={handleNavigate} />
    </Container>
  );
};

export default BookListItem;
