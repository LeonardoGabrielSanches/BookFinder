import React, {useCallback} from 'react';
import {Container, IntroductionText} from './styles';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';

const Login: React.FC = () => {
  const navigation = useNavigation();

  const signInGoogle = useCallback(async () => {
    GoogleSignin.configure({
      webClientId:
        '165717685791-carii9b8fuedshickjk1n6ak0n0lfib8.apps.googleusercontent.com',
    });

    const usersCollection = firestore().collection('users');

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const {user} = await auth().signInWithCredential(googleCredential);

    usersCollection
      .where('email', '==', user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          usersCollection.add({
            email: user.email,
          });
        }

        navigation.navigate('Home');
      });
  }, [navigation]);

  return (
    <Container>
      <IntroductionText>Sign in to start using the app</IntroductionText>
      <GoogleSigninButton onPress={signInGoogle} />
    </Container>
  );
};

export default Login;
