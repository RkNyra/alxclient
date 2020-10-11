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

export const KitsuScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Home', {screen: 'Home'});
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
        <Button onPress={navigateDetails}> KitsuScreen Here </Button>
      </Layout>
    </SafeAreaView>
  );
};
