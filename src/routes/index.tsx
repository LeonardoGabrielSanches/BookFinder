import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import BookList from '../pages/BookList';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="BookList" component={BookList} />
  </Stack.Navigator>
);

export default Routes;
