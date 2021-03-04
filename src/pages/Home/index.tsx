import React, {useCallback, useState} from 'react';
import Button from '../../components/Button';

import {Container, ContainerTitle} from './styles';

import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [findValue, setFindValue] = useState('');

  const handleFindBooks = useCallback(() => {
    navigation.navigate('BookList', {
      searchValue: findValue,
    });
  }, [findValue, navigation]);

  return (
    <Container>
      <ContainerTitle>Find IT Books</ContainerTitle>
      <Button
        onChangeText={setFindValue}
        value={findValue}
        autoCapitalize={'words'}
        autoFocus
        placeholder="Type IT Books names to search"
        returnKeyType={'search'}
        onSubmitEditing={handleFindBooks}
      />
      {/* MissingButton */}
    </Container>
  );
};

export default Home;
