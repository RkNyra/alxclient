import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} fill="#FFF" name="arrow-back" />;

export const HomeScreen = ({navigation}) => {
  useEffect(() => {
    getCurrentUserUsername();
  }, []);

  const getCurrentUserUsername = async () => {
    try {
      const currentUsername = await AsyncStorage.getItem('currentUser');
      // console.warn('1st LOGGED IN AS: ====', currentUsername);
      if (currentUsername !== null) {
        // value previously stored
        // console.warn(' 2nd LOGGED IN AS: ====', currentUsername);
        setUserName(currentUsername);
      }
    } catch (e) {
      // error reading value
    }
  };

  const [userName, setUserName] = React.useState('');

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const ProfPicImg = (props) => (
    <Image
      style={styles.customProfPic}
      source={require('../assets/images/alxDefaultProfPic.jpeg')}
    />
  );

  const navigateToJokesScreen = () => {
    navigation.navigate('Jokes');
  };

  const navigateToKitsuScreen = () => {
    navigation.navigate('Kitsu');
  };

  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'transparent'}}>
      <SafeAreaView style={{flex: 1}}>
        <Layout style={styles.customLayout}>
          <ImageBackground
            source={require('../assets/images/bluebg1.png')}
            resizeMode="cover"
            style={[
              styles.customBgImg,
              {width: windowWidth, height: windowHeight * 0.35},
            ]}>
            <TopNavigation
              accessoryLeft={BackAction}
              accessoryRight={ProfPicImg}
              style={{
                position: 'absolute',
                top: 0,
                backgroundColor: 'transparent',
              }}
            />
            <Text style={styles.customGreeting}> Welcome {userName} </Text>
          </ImageBackground>

          <View style={styles.homeListView}>
            <TouchableOpacity
              style={[styles.homeListInnerView, {height: windowHeight * 0.12}]}
              onPress={navigateToJokesScreen}>
              <Icon
                style={{width: 40, height: 40}}
                fill="red"
                name="smiling-face-outline"
              />
              <Text style={styles.homeText}> Random Jokes </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.homeListInnerView,
                {marginTop: 20, height: windowHeight * 0.12},
              ]}
              onPress={navigateToKitsuScreen}>
              <Icon
                style={{width: 40, height: 40}}
                fill="blue"
                name="film-outline"
              />
              <Text style={styles.homeText}> Kitsu - Anime </Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  customLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  customBgImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  customProfPic: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  customGreeting: {
    color: 'white',
    fontSize: 24,
  },
  homeListView: {
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  homeListInnerView: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,

    elevation: 24,
  },
  homeText: {
    marginLeft: 10,
    fontSize: 24,
  },
});
