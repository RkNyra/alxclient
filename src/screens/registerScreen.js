import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Layout, Icon, Input, Button, Divider} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

export const RegisterScreen = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const smallInputState = useInputState();
  const mediumInputState = useInputState();
  const largeInputState = useInputState();

  const navigateToLoginScreen = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <Layout style={styles.customLayout}>
          <View>
            <Image
              style={{
                width: windowWidth * 0.7,
                height: windowHeight * 0.2,
                resizeMode: 'contain',
                marginTop: windowHeight * 0.12,
                marginBottom: windowHeight * 0.015,
              }}
              source={require('../assets/images/alxlogo.png')}
            />
          </View>

          <Input
            style={[
              styles.customInput,
              {
                marginHorizontal: windowWidth * 0.1,
                marginBottom: windowHeight * 0.015,
              },
            ]}
            size="large"
            placeholder="Username"
            {...largeInputState}
          />
          <Input
            style={[
              styles.customInput,
              {
                marginHorizontal: windowWidth * 0.1,
                marginBottom: windowHeight * 0.015,
              },
            ]}
            size="large"
            placeholder="Email"
            {...largeInputState}
          />

          <Input
            style={[
              styles.customInput,
              {
                marginHorizontal: windowWidth * 0.1,
                marginBottom: windowHeight * 0.05,
              },
            ]}
            size="large"
            value={value}
            placeholder="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setValue(nextValue)}
          />

          <LinearGradient
            colors={['#0070BA', '#1546A0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.customLinearGradient}>
            <Button
              style={styles.customButton}
              size="large"
              onPress={navigateToLoginScreen}>
              Sign up
            </Button>
          </LinearGradient>

          <Text
            style={{
              marginTop: windowHeight * 0.03,
              marginBottom: windowHeight * 0.03,
            }}>
            Already Registered?
          </Text>
          <Divider style={styles.customDivider} />

          <TouchableOpacity
            style={{marginTop: windowHeight * 0.03}}
            onPress={navigateToLoginScreen}>
            <Text>Log in</Text>
          </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },
  customInput: {
    borderRadius: 20,
  },
  customLinearGradient: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
  },
  customButton: {
    width: '75%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  customDivider: {
    backgroundColor: '#000',
    height: 0.5,
    width: '20%',
    marginVertical: 4,
  },
});
