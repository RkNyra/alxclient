import React, {useEffect} from 'react';
import axios from 'axios';
import {kitsuEndpoint} from '../api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
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
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} fill="#333" name="arrow-back" />;

export const KitsuScreen = ({navigation}) => {
  const [kitsuData, setKitsuData] = React.useState('');
  const [kitsuPages, setKitsuPages] = React.useState('');

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
    getKitsuData();
  }, []);

  const getKitsuData = () => {
    axios
      .get(kitsuEndpoint)
      .then(function (response) {
        // console.warn('Kitsu Response=========', response.data.data[0]);
        // console.warn('Kitsu Response=========', typeof response.data.data);
        setKitsuData(response.data.data);
        setKitsuPages(response.data.links);
        // console.warn('Kitsu Pages=========', response.data.links);
        // console.warn('Kitsu Pages=========', typeof response.data.links);
      })
      .catch(function (error) {
        // console.warn('warning================', error);
      });
  };

  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'transparent'}}>
      <SafeAreaView style={{flex: 1}}>
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

          {kitsuData.length != undefined && kitsuData.length > 0 ? (
            kitsuData.map((kitsu) => {
              const posterImgSource = {
                uri: `${kitsu.attributes.posterImage.tiny}`,
              };

              return (
                <View style={styles.kitsuListView} key={kitsu.id}>
                  <TouchableOpacity style={styles.kitsuListInnerView}>
                    <Image
                      style={styles.customPosterImg}
                      source={posterImgSource}
                    />
                    {/* 
                    <Icon
                      style={styles.customIcon}
                      fill="blue"
                      name="film-outline"
                    /> */}
                    <View style={styles.kitsuTextView}>
                      <Text style={styles.kitsuTextTitle}>
                        Type: {kitsu.attributes.titles.en}
                        {'\n'}
                      </Text>
                      <Text style={styles.kitsuText}>
                        Popularity rank: {kitsu.attributes.popularityRank}
                      </Text>
                      <Text style={styles.kitsuText}>
                        Ave. Rating: {kitsu.attributes.averageRating}
                      </Text>
                      <Text style={styles.kitsuText}>
                        Age Rating: {kitsu.attributes.ageRating}
                      </Text>
                      <Text style={styles.kitsuText}>
                        Age Rating Guide:
                        {kitsu.attributes.ageRatingGuide}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="#FF0000" />
              <Text style={{color: '#fff'}}> Loading...</Text>
            </View>
          )}
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
  customProfPic: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  kitsuListView: {
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
    paddingVertical: 10,
    marginTop: '50%',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,

    elevation: 24,
  },
  kitsuListInnerView: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 15,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#c4c4c4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,

    elevation: 24,
  },
  customPosterImg: {
    width: '35%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    alignSelf: 'center',
  },
  customIcon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  kitsuTextView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginRight: 5,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  kitsuTextTitle: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  kitsuText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 17,
  },
  kitstuPageNavs: {
    height: 25,
    backgroundColor: 'black',
  },
});
