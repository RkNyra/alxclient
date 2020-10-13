import React from 'react';
import * as eva from '@eva-design/eva';
import FlashMessage from 'react-native-flash-message';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {InitialNavigator} from './src/components/navigation';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <InitialNavigator />
    </ApplicationProvider>
    <FlashMessage position="center" />
  </>
);
