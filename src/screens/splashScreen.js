import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const SplashScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Home');
  };
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="ALX-Launchpad"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails}> SplashScreen Here </Button>
      </Layout>
    </SafeAreaView>
  );
};
