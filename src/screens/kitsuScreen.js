import React from 'react';
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

          <View style={styles.kitsuListView}>
            <TouchableOpacity style={styles.kitsuListInnerView}>
              <Icon style={styles.customIcon} fill="blue" name="film-outline" />
              <View style={styles.kitsuTextView}>
                <Text style={styles.kitsuTextTitle}>Title </Text>
                <Text style={styles.kitsuText}>Popularity rank: 10</Text>
                <Text style={styles.kitsuText}>
                  Check for other info to select
                </Text>
                <Text style={styles.kitsuText}>
                  NOTE: insert anime poster-IMAGE [tiny-poster-IMAGE in place of
                  icon-above if poster exists. if poster doesn't exist, icon
                  remains.
                </Text>
              </View>
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
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  kitsuListInnerView: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    marginTop: 30,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
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
});
