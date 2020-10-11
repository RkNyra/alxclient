import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Image,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Layout} from '@ui-kitten/components';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const AnimatedLinGrad = Animated.createAnimatedComponent(LinearGradient);

  const animatedBg = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(animatedBg, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear.inOut,
      useNativeDriver: true,
    }).start();
  });

  const {width} = useWindowDimensions();

  const translateHorizontal = animatedBg.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{position: 'absolute'}}>
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,
          zIndex: 1,
          backgroundColor: 'transparent',
        }}>
        {props.children}
      </Animated.View>

      <AnimatedLinGrad
        colors={['#fff', '#C4C4C4', '#C4C4C4', '#fff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          ...StyleSheet.absoluteFill,
          zIndex: 0,
          height: useWindowDimensions().height * 2,
          width: width * 2,
          marginTop: useWindowDimensions().height * -1,
          transform: [{translateX: translateHorizontal}],
        }}
      />
    </Animated.View>
  );
};

export const SplashScreen = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('App', {screen: 'Login'}); //this.props.navigation.navigate('Login')
    }, 4000);
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Layout style={styles.customLayout}>
        <FadeInView style={styles.customFadeinview}>
          <Text
            style={{
              fontSize: 36,
              color: '#FFF',
              marginBottom: windowHeight * 0.15,
              marginTop: windowHeight * -0.1,
              zIndex: 1,
            }}>
            Welcome
          </Text>
          <View>
            <Image
              style={{
                width: windowWidth * 0.7,
                height: windowHeight * 0.2,
                resizeMode: 'contain',
                marginBottom: windowHeight * -0.5,
              }}
              source={require('../assets/images/alxlogo.png')}
            />
          </View>
        </FadeInView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  customFadeinview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
