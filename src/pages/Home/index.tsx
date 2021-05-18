import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Input from '../../components/Input';

import {
  Container,
  ContainerTitle,
  ButtonContentContainer,
  LogoutButton,
} from './styles';
import Button from '../../components/Button';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [findValue, setFindValue] = useState('');

  const handleFindBooks = useCallback(() => {
    navigation.navigate('BookList', {
      searchValue: findValue,
    });
    setFindValue('');
  }, [findValue, navigation]);

  const handleLogout = useCallback(async () => {
    await auth().signOut();

    navigation.navigate('Login');
  }, [navigation]);

  const handleNavigateFavorites = useCallback(async () => {
    navigation.navigate('Favorites');
  }, [navigation]);

  return (
    <Container>
      <ContainerTitle>Find IT Books</ContainerTitle>
      <Input
        onChangeText={setFindValue}
        value={findValue}
        autoCapitalize="words"
        autoFocus
        placeholder="Type a tecnology to find books"
        returnKeyType="search"
        onSubmitEditing={handleFindBooks}
      />
      <ButtonContentContainer>
        <Button title="Favorites" onPress={handleNavigateFavorites} />

        <Button
          title="Find book"
          onPress={handleFindBooks}
          disable={!findValue}
        />
      </ButtonContentContainer>
      <LogoutButton title="Logout" onPress={handleLogout} />
    </Container>
  );
};

export default Home;
