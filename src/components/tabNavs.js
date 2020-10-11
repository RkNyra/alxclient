import React from 'react';
import {Icon} from '@ui-kitten/components';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/homeScreen';
import {JokesScreen} from '../screens/jokesScreen';
import {KitsuScreen} from '../screens/kitsuScreen';
import {LoginScreen} from '../screens/loginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#0070BA',
      style: {
        backgroundColor: '#fff',
        paddingBottom: '1.5%',
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={20}
            style={{width: 20, height: 20}}
            fill="#8F9BB3"
            name="home"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Jokes"
      component={JokesScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <Icon
            size={20}
            style={{width: 20, height: 20, marginBottom: '-10%'}}
            fill="#8F9BB3"
            name="smiling-face-outline"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Kitsu"
      component={KitsuScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <Icon
            size={20}
            style={{width: 20, height: 20, marginBottom: '-10%'}}
            fill="#8F9BB3"
            name="film-outline"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={LoginScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <Icon
            size={20}
            style={{width: 20, height: 20, marginBottom: '-10%'}}
            fill="#8F9BB3"
            name="log-out-outline"
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export const BottomNavigations = () => <BottomTab />;
