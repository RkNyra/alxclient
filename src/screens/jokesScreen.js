import React from 'react';
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

export const JokesScreen = ({navigation}) => {
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

          <View style={styles.jokesListView}>
            <TouchableOpacity style={styles.jokesListInnerView}>
              <Icon
                style={styles.customIcon}
                fill="red"
                name="smiling-face-outline"
              />
              <View style={styles.jokesTextView}>
                <Text style={styles.jokesTextTitle}>Type: General </Text>
                <Text style={styles.jokesText}>
                  I'm reading a book about anti-gravity...I'm reading a book
                  about anti-gravity...I'm reading a book about
                  anti-gravity...I'm reading a book about anti-gravity...
                </Text>
                <Text style={styles.jokesText}>
                  It's impossible to put down
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
  jokesListView: {
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  jokesListInnerView: {
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
  jokesTextView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
	alignSelf: 'flex-start',
	marginRight: 5,
    borderRadius: 15,
    backgroundColor: 'white',
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
