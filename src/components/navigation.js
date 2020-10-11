import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens/splashScreen';
import {LoginScreen} from '../screens/loginScreen';
import {BottomNavigations} from './tabNavs';
import {RegisterScreen} from '../screens/registerScreen';


const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={BottomNavigations} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const SplashScreenNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator,
});

export const InitialNavigator = () => (
  <NavigationContainer>
    <SplashScreenNavigator />
  </NavigationContainer>
);
