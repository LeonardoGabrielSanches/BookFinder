import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';

import {Container, ContainerTitle} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [findValue, setFindValue] = useState('');

  const handleFindBooks = useCallback(() => {
    navigation.navigate('BookList', {
      searchValue: findValue,
    });
    setFindValue('');
  }, [findValue, navigation]);

  return (
    <Container>
      <ContainerTitle>Find IT Books</ContainerTitle>
      <Input
        onChangeText={setFindValue}
        value={findValue}
        autoCapitalize={'words'}
        autoFocus
        placeholder="Type a tecnology to find books"
        returnKeyType={'search'}
        onSubmitEditing={handleFindBooks}
      />
      {/* MissingButton */}
    </Container>
  );
};

export default Home;
