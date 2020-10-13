import React from 'react';
import axios from 'axios';
import {registerUserEndpoint} from '../api';
import {showMessage} from 'react-native-flash-message';
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

export const RegisterScreen = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const navigateToLoginScreen = () => {
    navigation.navigate('Login');
  };

  const [inputWarningMessage, setInputWarningMessage] = React.useState('');
  const [emailWarnMessage, setEmailWarnMessage] = React.useState('');
  const [errorWarnMessage, setErrorWarnMessage] = React.useState('');

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const useUsernameState = (initialValue = '') => {
    const [username, setUsername] = React.useState(initialValue);
    return {username, onChangeText: setUsername};
  };
  const useEmailState = (initialValue = '') => {
    const [email, setEmail] = React.useState(initialValue);
    return {email, onChangeText: setEmail};
  };
  const usePasswordState = (initialValue = '') => {
    const [password, setPassword] = React.useState(initialValue);
    return {password, onChangeText: setPassword};
  };

  const usernameInputState = useUsernameState();
  const emailInputState = useEmailState();
  const passwordInputState = usePasswordState();

  const registerUser = () => {
    // console.warn(
    //   'Reg Screen Username: ==============',
    //   usernameInputState.username,
    // );

    const renderInputWarnMessage = () => (
      <Text>* All fields are required </Text>
    );
    const renderEmailWarnMessage = () => (
      <Text>* Required Email Format: example@example.com </Text>
    );
    const renderEmptyValue = () => '';

    if (
      usernameInputState.username == '' ||
      emailInputState.email == '' ||
      passwordInputState.password == ''
    ) {
      setInputWarningMessage(renderInputWarnMessage);
    } else {
      let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      let valid = tester.test(emailInputState.email);

      if (!valid) {
        setEmailWarnMessage(renderEmailWarnMessage);
      } else {
        setInputWarningMessage(renderEmptyValue);
        setEmailWarnMessage(renderEmptyValue);
        let userRegData = {
          username: usernameInputState.username,
          email: emailInputState.email,
          password: passwordInputState.password,
        };
        // console.warn('UserRegData========', userRegData);
        axios
          .post(registerUserEndpoint, userRegData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(function (response) {
            // console.warn('Creating User Response: ==========', response);
            if (response.data.code == 400) {
              // Error: email exists or field is required
              setErrorWarnMessage(<Text>{response.data.failed}</Text>);
            } else if (response.data.code == 200) {
              // register successful proceed to log-in axewwn
              showMessage({
                icon: 'success',
                message: 'Account Created! :) ',
                description: 'Loading...',
                type: 'success',
              });
              setTimeout(() => {
                navigateToLoginScreen();
              }, 2000);
            }
          })
          .catch(function (error) {
            console.warn(error);
          });
      }
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <Layout style={styles.customLayout}>
          <View>
            <Image
              style={{
                width: windowWidth * 0.7,
                height: windowHeight * 0.15,
                resizeMode: 'contain',
                marginTop: windowHeight * 0.12,
                marginBottom: windowHeight * 0.01,
              }}
              source={require('../assets/images/alxlogo.png')}
            />
          </View>

          <Text style={styles.customWarningLabel}>{inputWarningMessage}</Text>
          <Text style={styles.customWarningLabel}> {errorWarnMessage}</Text>
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
            {...usernameInputState}
          />

          <Text style={styles.customWarningLabel}>{emailWarnMessage}</Text>
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
            {...emailInputState}
          />

          <Input
            style={[
              styles.customInput,
              {
                marginHorizontal: windowWidth * 0.1,
                marginTop: windowHeight * 0.02,
                marginBottom: windowHeight * 0.05,
              },
            ]}
            size="large"
            placeholder="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            {...passwordInputState}
          />

          <LinearGradient
            colors={['#0070BA', '#1546A0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.customLinearGradient}>
            <Button
              style={styles.customButton}
              size="large"
              onPress={registerUser}>
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
            style={styles.customRaisedEl}
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
  customWarningLabel: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '75%',
    color: 'red',
  },
  customInput: {
    borderRadius: 20,
  },
  customLinearGradient: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
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
  customRaisedEl: {
    width: '20%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 24,
  },
});
