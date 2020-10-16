import React, {useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {jokesEndpoint} from '../api';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const BackIcon = (props) => <Icon {...props} fill="#333" name="arrow-back" />;

export const JokesScreen = ({navigation}) => {
  // const [userJwt, setUserJwt] = React.useState('');
  const [jokesData, setJokesData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getJokesData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  useEffect(() => {
    getCurrentUserUserJwt();
    console.warn('at jokes screen===');
  }, []);

  const getCurrentUserUserJwt = async () => {
    console.warn('my first token: ====');
    try {
      const currentUserJwt = await AsyncStorage.getItem('currentUserJwtoken');
      console.warn('my first token: ====', currentUserJwt);

      if (currentUserJwt !== null) {
        console.warn('my first token if not null: ====', currentUserJwt);
        getJokesData(currentUserJwt);
        // setUserJwt(currentUserJwt);
      }
    } catch (e) {
      // error reading value
      console.warn('error at getting jwtoken: ====', e);
    }
  };

  const getJokesData = (currentUserJwt) => {
    axios
      .get(jokesEndpoint, {
        headers: {
          Authorization: 'Token ' + currentUserJwt,
        },
      })
      .then(function (response) {
        setJokesData(response.data);
      })
      .catch(function (error) {
        // console.warn('warning================', error);
      });
  };

  return (
    // <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Layout style={styles.customLayout}>
          <TopNavigation
            accessoryLeft={BackAction}
            accessoryRight={ProfPicImg}
            style={{
              position: 'absolute',
              top: 0,
              backgroundColor: 'transparent',
            }}
          />

          <View style={{height: 70}}></View>
          <Divider style={styles.customDivider} />

          {jokesData.length != undefined && jokesData.length > 0 ? (
            jokesData.map((joke) => {
              return (
                <View style={styles.jokesListView} key={joke.id}>
                  <TouchableOpacity style={styles.jokesListInnerView}>
                    <Icon
                      style={styles.customIcon}
                      fill="red"
                      name="smiling-face-outline"
                    />
                    <View style={styles.jokesTextView}>
                      <Text style={styles.jokesTextTitle}>
                        Type: {joke.type}
                        {'\n'}
                      </Text>
                      <Text style={styles.jokesText}>
                        {joke.setup}
                        {'\n'}
                      </Text>
                      <Text style={styles.jokesText}>{joke.punchline}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="#FF0000" />
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                {'  '}Loading...
              </Text>
            </View>
          )}
          <View style={{height: 15}}></View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customLayout: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  customProfPic: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  customDivider: {
    backgroundColor: '#000',
    height: 1,
    width: '100%',
    marginVertical: 4,
  },
  jokesListView: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  loadingView: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '55%',
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'transparent',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 16,

    // elevation: 24,
  },

  jokesListInnerView: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#efefef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,

    elevation: 24,
  },
  customIcon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  jokesTextView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginRight: 5,
    borderRadius: 15,
    backgroundColor: '#efefef',
  },
  jokesTextTitle: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  jokesText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 17,
  },
});
