import React from 'react';
import {Icon} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/homeScreen';
import {JokesScreen} from '../screens/jokesScreen';
import {KitsuScreen} from '../screens/kitsuScreen';
import {LoginScreen} from '../screens/loginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// clearing async/local storage
const clearAsyncAndLogout = async () => {
  try {
    await AsyncStorage.removeItem('currentUser');
    await AsyncStorage.clear();
  } catch (e) {
    // remove error
  }
  // console.log('Done.');
};

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
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={20}
            style={{width: 20, height: 20, marginBottom: '-10%'}}
            fill="#333"
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
            fill="red"
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
            fill="blue"
            name="film-outline"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={LoginScreen}
      listeners={({navigation, route}) => ({
        tabPress: (e) => {
          // Prevent default action
          e.preventDefault();
          clearAsyncAndLogout();
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        },
      })}
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
        tabBarVisible: false,
      }}
    />
  </Tab.Navigator>
);

export const BottomNavigations = () => <BottomTab />;
